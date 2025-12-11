"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="flex flex-col gap-4">
        <Link className="btn" href="/admin/upload">📤 Upload Image</Link>
        <Link className="btn" href="/admin/images">🖼 View All Images</Link>
      </div>
    </div>
  );
}
