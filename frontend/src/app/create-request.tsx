"use client";
import React, { useState } from "react";

export default function CreateRequestPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:4000/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to create request");
      setTitle("");
      setDescription("");
      setSuccess("Request created successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Request</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-xl shadow-lg p-8 border border-border w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-6 text-text">New Request</h2>
        {error && <div className="mb-4 px-4 py-2 rounded bg-red-100 text-red-700 font-medium">{error}</div>}
        {success && <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-700 font-medium">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-text">Title</label>
          <input
            type="text"
            className="w-full border border-border rounded px-3 py-2 text-text bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-text">Description</label>
          <textarea
            className="w-full border border-border rounded px-3 py-2 text-text bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            disabled={loading}
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white px-4 py-2 rounded font-semibold disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Request"}
        </button>
      </form>
    </div>
  );
}
