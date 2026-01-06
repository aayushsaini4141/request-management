
"use client";
import React, { useEffect, useState } from "react";

interface Comment {
  _id?: string;
  text: string;
  createdAt: string;
}

interface Request {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  comments?: Comment[];
}

export default function HomePage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Request | null>(null);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

            useEffect(() => {
              fetchRequests();
            }, []);


  async function fetchRequests() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:4000/requests");
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setRequests(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRequestDetail(id: string) {
    setSelected(null);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:4000/requests/${id}`);
      if (!res.ok) throw new Error("Failed to fetch request detail");
      const data = await res.json();
      setSelected(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitComment() {
    if (!selected) return;
    setCommentLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch(`http://localhost:4000/requests/${selected._id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: comment }),
      });
      if (!res.ok) throw new Error("Failed to add comment");
      setComment("");
      setSuccessMsg("Comment added!");
      fetchRequestDetail(selected._id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCommentLoading(false);
    }
  }

  async function updateStatus(status: string) {
    if (!selected) return;
    setStatusLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch(`http://localhost:4000/requests/${selected._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setSuccessMsg("Status updated!");
      fetchRequestDetail(selected._id);
      fetchRequests();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setStatusLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-primary text-white py-4 shadow-md">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Request Management System</h1>
          <span className="text-sm opacity-80">Internal Dashboard</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Feedback banners */}
          {loading && <div className="mb-4 px-4 py-2 rounded bg-primary/10 text-primary font-medium">Loading...</div>}
          {error && <div className="mb-4 px-4 py-2 rounded bg-red-100 text-red-700 font-medium">{error}</div>}
          {successMsg && <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-700 font-medium">{successMsg}</div>}

          {/* Requests Table or Detail */}
          {!selected ? (
            <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
              <h2 className="text-xl font-semibold mb-4 text-text">Requests</h2>
              <table className="w-full border border-border rounded overflow-hidden">
                <thead className="">
                  <tr>
                    <th className="p-2 text-left">Title</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Created</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr
                      key={req._id}
                      className="border-t border-border hover:bg-primary/5 transition-colors cursor-pointer"
                    >
                      <td className="p-2 font-medium text-text">{req.title}</td>
                      <td className="p-2 capitalize">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          req.status === "open"
                            ? "bg-blue-100 text-blue-700"
                            : req.status === "in_progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-200 text-gray-700"
                        }`}>
                          {req.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-2 text-sm text-gray-500">{new Date(req.createdAt).toLocaleString()}</td>
                      <td className="p-2">
                        <button
                          className="text-primary underline hover:text-primary-dark font-medium"
                          onClick={() => fetchRequestDetail(req._id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {requests.length === 0 && !loading && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">No requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
              <button
                className="mb-4 text-primary underline hover:text-primary-dark font-medium"
                onClick={() => setSelected(null)}
              >
                ← Back to list
              </button>
              <h2 className="text-2xl font-bold mb-2 text-text">{selected.title}</h2>
              <div className="mb-2 text-text">{selected.description}</div>
              <div className="mb-2 text-sm text-gray-500">
                Status: <span className="capitalize font-semibold">{selected.status.replace('_', ' ')}</span>
              </div>
              <div className="mb-4 text-sm text-gray-500">
                Created: {new Date(selected.createdAt).toLocaleString()}
              </div>
              <div className="mb-4">
                <span className="font-semibold text-text">Update Status:</span>
                <div className="flex gap-2 mt-2">
                  {["open", "in_progress", "closed"].map((status) => (
                    <button
                      key={status}
                      className={`px-3 py-1 rounded border border-border text-sm font-medium transition-colors ${
                        selected.status === status
                          ? "bg-primary text-white"
                          : "bg-background text-primary hover:bg-primary/10"
                      }`}
                      disabled={statusLoading}
                      onClick={() => updateStatus(status)}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-text">Comments:</span>
                <ul className="mt-2 space-y-2">
                  {selected.comments && selected.comments.length > 0 ? (
                    selected.comments.map((c, idx) => (
                      <li key={c._id || idx} className="bg-background rounded p-2 border border-border">
                        <div className="text-text">{c.text}</div>
                        <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()}</div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No comments yet.</li>
                  )}
                </ul>
              </div>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  submitComment();
                }}
                className="flex gap-2 mt-2"
              >
                <input
                  type="text"
                  className="flex-1 border border-border rounded px-3 py-2 text-text bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  disabled={commentLoading}
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded font-semibold disabled:opacity-60"
                  disabled={commentLoading || !comment}
                >
                  {commentLoading ? "Adding..." : "Add"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-4 mt-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Internal Request Management System
        </div>
      </footer>
    </div>
  );
}

