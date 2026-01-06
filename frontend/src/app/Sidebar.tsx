import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-white text-black flex flex-col p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Request Manager</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/list-requests" className="hover:bg-gray-100 rounded px-3 py-2">Request List</Link>
        <Link href="/update-request" className="hover:bg-gray-100 rounded px-3 py-2">Update/Comment</Link>
        <Link href="/create-request" className="hover:bg-gray-100 rounded px-3 py-2">Create Request</Link>
      </nav>
    </aside>
  );
}
