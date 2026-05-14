"use client";

import Link from "next/link";
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

  const load = async () => {
    const [pRes, rRes] = await Promise.all([fetch("/api/admin/plans"), fetch("/api/admin/autoresume")]);
    const pData = await pRes.json();
    const rData = await rRes.json();
    setPlans(pData);
    setResumes(rData);
    if (!form.planId && pData[0]?.id) setForm((prev) => ({ ...prev, planId: pData[0].id }));
  };

  useEffect(() => {
    load();
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
    setForm({ ...defaultForm, planId: form.planId });
    load();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
          <h1 className="text-2xl font-bold">Create Resume Template</h1>
          <p className="text-sm text-gray-600">Fill all fields from the Resume model.</p>

          <input className="w-full border rounded-lg p-3" placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className="w-full border rounded-lg p-3" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "ATS" | "REGULAR" })}>
            <option value="REGULAR">REGULAR</option><option value="ATS">ATS</option>
          </select>
          <input className="w-full border rounded-lg p-3" placeholder="target (comma separated)" value={form.target.join(", ")} onChange={(e) => setForm({ ...form, target: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })} />
          <input className="w-full border rounded-lg p-3" placeholder="image path" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <input className="w-full border rounded-lg p-3" placeholder="features (comma separated)" value={form.features.join(", ")} onChange={(e) => setForm({ ...form, features: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })} />
          <textarea className="w-full border rounded-lg p-3 min-h-[100px]" placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <textarea className="w-full border rounded-lg p-3 min-h-[220px] font-mono text-sm bg-slate-950 text-slate-100" placeholder="css" value={form.css} onChange={(e) => setForm({ ...form, css: e.target.value })} />
          <select className="w-full border rounded-lg p-3" value={form.planId} onChange={(e) => setForm({ ...form, planId: e.target.value })}>
            {plans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <button onClick={save} className="w-full bg-blue-600 text-white rounded-lg p-3 font-semibold">Create</button>
          {status && <p className="text-sm text-gray-700">{status}</p>}
        </section>

        <section className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-bold mb-4">Existing Resumes</h2>
          <div className="space-y-3 max-h-[70vh] overflow-auto">
            {resumes.map((r) => (
              <div key={r.id} className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.type} • {r.target.join(", ")}</p>
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
