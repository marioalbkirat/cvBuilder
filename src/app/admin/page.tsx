"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type Plan = { id: string; name: string };
type Resume = { id: string; name: string; type: "ATS" | "REGULAR"; target: string[]; image: string; features: string[]; description: string; css: string; planId: string };

const defaultForm: Omit<Resume, "id"> = {
  name: "",
  type: "REGULAR",
  target: ["general"],
  image: "/resumes/127.0.0.1_5500_resumes_template3_html.html.png",
  features: ["autoresume"],
  description: "",
  css: "",
  planId: "",
};

export default function AdminPage() {
  const [form, setForm] = useState(defaultForm);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const [pRes, rRes] = await Promise.all([fetch("/api/admin/plans"), fetch("/api/admin/autoresume")]);
      const pData: Plan[] = await pRes.json();
      const rData: Resume[] = await rRes.json();
      setPlans(pData);
      setResumes(rData);
      if (pData[0]?.id) setForm((prev) => ({ ...prev, planId: prev.planId || pData[0].id }));
    })();
  }, []);

  const save = async () => {
    setStatus("Saving...");
    const res = await fetch("/api/admin/autoresume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setStatus(`Error: ${data.error ?? "Failed"}`);
    setStatus(`Created: ${data.name}`);
    window.location.reload();
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) return setStatus(`Upload error: ${data.error}`);
    setForm((prev) => ({ ...prev, image: data.image }));
    setStatus("Image uploaded successfully");
  };

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 bg-white rounded-2xl shadow-md border border-slate-200 p-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">Admin Resume Builder</h1>
          <p className="text-slate-500 mb-6">Fill every field from the Resume model.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1"><span className="text-sm font-medium">Name</span><input className="w-full border rounded-lg p-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label className="space-y-1"><span className="text-sm font-medium">Type</span><select className="w-full border rounded-lg p-3" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "ATS" | "REGULAR" })}><option value="REGULAR">REGULAR</option><option value="ATS">ATS</option></select></label>
            <label className="space-y-1 md:col-span-2"><span className="text-sm font-medium">Target (comma separated)</span><input className="w-full border rounded-lg p-3" value={form.target.join(", ")} onChange={(e) => setForm({ ...form, target: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })} /></label>
            <label className="space-y-1 md:col-span-2"><span className="text-sm font-medium">Features (comma separated)</span><input className="w-full border rounded-lg p-3" value={form.features.join(", ")} onChange={(e) => setForm({ ...form, features: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })} /></label>
            <label className="space-y-1"><span className="text-sm font-medium">Plan</span><select className="w-full border rounded-lg p-3" value={form.planId} onChange={(e) => setForm({ ...form, planId: e.target.value })}>{plans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
            <label className="space-y-1"><span className="text-sm font-medium">Image path</span><input className="w-full border rounded-lg p-3" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></label>
            <label className="space-y-1 md:col-span-2"><span className="text-sm font-medium">Upload Image</span><input type="file" accept="image/*" className="w-full border rounded-lg p-2" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} /></label>
          </div>

          {form.image && <Image src={form.image} alt="preview" width={480} height={180} className="mt-4 h-36 w-auto rounded-lg border object-cover" />}

          <label className="space-y-1 block mt-4"><span className="text-sm font-medium">Description</span><textarea className="w-full border rounded-lg p-3 min-h-[90px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <label className="space-y-1 block mt-4"><span className="text-sm font-medium">CSS</span><textarea className="w-full border rounded-lg p-3 min-h-[260px] font-mono text-sm bg-slate-950 text-slate-100" value={form.css} onChange={(e) => setForm({ ...form, css: e.target.value })} /></label>

          <button onClick={save} disabled={uploading} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 font-semibold disabled:opacity-50">{uploading ? "Uploading image..." : "Create Resume"}</button>
          {status && <p className="text-sm mt-3 text-slate-700">{status}</p>}
        </section>

        <section className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
          <h2 className="text-xl font-bold mb-4">Existing Resumes</h2>
          <div className="space-y-3 max-h-[75vh] overflow-auto pr-1">
            {resumes.map((r) => (
              <div key={r.id} className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.type} • {r.target.join(", ")}</p>
                </div>
                <Link href={`/admin/resume/${r.id}`} className="text-blue-600 font-medium">Edit</Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
