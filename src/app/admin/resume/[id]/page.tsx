"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Plan = { id: string; name: string };
type Resume = { id: string; name: string; type: "ATS" | "REGULAR"; target: string[]; image: string; features: string[]; description: string; css: string; planId: string };

export default function EditResumePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [form, setForm] = useState<Resume | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const load = async () => {
      const [pRes, rRes] = await Promise.all([fetch("/api/admin/plans"), fetch(`/api/admin/autoresume/${params.id}`)]);
      setPlans(await pRes.json());
      setForm(await rRes.json());
    };
    load();
  }, [params.id]);

  if (!form) return <main className="p-8">Loading...</main>;

  const save = async () => {
    setStatus("Updating...");
    const res = await fetch(`/api/admin/autoresume/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setStatus(`Error: ${data.error ?? "Failed"}`);
    setStatus("Updated successfully");
  };

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Edit Resume</h1>
      <input className="w-full border rounded p-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <select className="w-full border rounded p-3" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "ATS" | "REGULAR" })}><option value="REGULAR">REGULAR</option><option value="ATS">ATS</option></select>
      <input className="w-full border rounded p-3" value={form.target.join(", ")} onChange={(e) => setForm({ ...form, target: e.target.value.split(",").map(v => v.trim()).filter(Boolean) })} />
      <input className="w-full border rounded p-3" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <input className="w-full border rounded p-3" value={form.features.join(", ")} onChange={(e) => setForm({ ...form, features: e.target.value.split(",").map(v => v.trim()).filter(Boolean) })} />
      <textarea className="w-full border rounded p-3 min-h-[120px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <textarea className="w-full border rounded p-3 min-h-[240px] font-mono bg-slate-950 text-slate-100" value={form.css} onChange={(e) => setForm({ ...form, css: e.target.value })} />
      <select className="w-full border rounded p-3" value={form.planId} onChange={(e) => setForm({ ...form, planId: e.target.value })}>{plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select>

      <div className="flex gap-3">
        <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        <button onClick={() => router.push('/admin')} className="px-4 py-2 border rounded">Back</button>
      </div>
      {status && <p>{status}</p>}
    </main>
  );
}
