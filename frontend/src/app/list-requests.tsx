"use client";
import React, { useEffect, useState } from "react";

export default function ListRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/requests")
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch requests");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Request List</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-4">
        {requests.map((req: any) => (
          <li key={req._id} className="bg-card p-4 rounded shadow border border-border">
            <h2 className="font-semibold text-lg">{req.title}</h2>
            <p className="text-text mb-2">{req.description}</p>
            <span className="text-xs text-gray-500">ID: {req._id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
