"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={loading}
      className="px-6 py-3 bg-bahaya/20 hover:bg-bahaya/40 text-bahaya font-bold rounded-xl transition-all border border-bahaya/30 h-fit self-center"
    >
      {loading ? "Keluar..." : "Keluar Akun"}
    </button>
  );
}
