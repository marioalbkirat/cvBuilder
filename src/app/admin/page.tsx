"use client";

import { useState } from "react";

export default function AdminPage() {
  const [name, setName] = useState("autoresume-template");
  const [description, setDescription] = useState("Auto generated resume template");
  const [css, setCss] = useState("/* Paste resume template CSS here */\n#resume {\n  font-family: Arial, sans-serif;\n}");
  const [status, setStatus] = useState<string>("");

  const handleCreate = async () => {
    setStatus("Creating...");
    const res = await fetch("/api/admin/autoresume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, css }),
    });

    const data = await res.json();
    if (!res.ok) {
      setStatus(`Error: ${data.error ?? "Unknown error"}`);
      return;
    }
    setStatus(`Created resume: ${data.name}`);
  };

  return (
    <main className="mx-auto max-w-4xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin: Create Auto Resume</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded p-3"
        placeholder="Resume name"
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded p-3"
        placeholder="Description"
      />

      <textarea
        value={css}
        onChange={(e) => setCss(e.target.value)}
        className="w-full border rounded p-3 font-mono min-h-[320px]"
        placeholder="Paste CSS here"
      />

      <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
        Create Auto Resume
      </button>

      {status && <p className="text-sm text-gray-700">{status}</p>}
    </main>
  );
}
