"use client";
import React, { useState } from "react";

export default function UpdateRequestPage() {
  const [requestId, setRequestId] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleComment(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`http://localhost:4000/requests/${requestId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });
      if (!res.ok) throw new Error("Failed to add comment");
      setComment("");
      setSuccess("Comment added successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Update/Comment on Request</h1>
      <form onSubmit={handleComment} className="bg-card rounded-xl shadow-lg p-8 border border-border w-full max-w-md">
        {error && <div className="mb-4 px-4 py-2 rounded bg-red-100 text-red-700 font-medium">{error}</div>}
        {success && <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-700 font-medium">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-text">Request ID</label>
          <input
            type="text"
            className="w-full border border-border rounded px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
            value={requestId}
            onChange={e => setRequestId(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium text-text">Comment</label>
          <textarea
            className="w-full border border-border rounded px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
            value={comment}
            onChange={e => setComment(e.target.value)}
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
          {loading ? "Adding..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
}
