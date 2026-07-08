"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (pathname !== "/admin/login") {
      const auth = localStorage.getItem("sipeta-admin-auth");
      if (!auth) {
        router.push("/admin/login");
      } else {
        setIsAuth(true);
      }
    }
  }, [pathname, router]);

  // Hitung pesan baru (belum dibaca) untuk badge notifikasi
  useEffect(() => {
    if (!isAuth) return;
    const loadUnread = () => {
      fetch("/api/admin/forum")
        .then((r) => r.json())
        .then((data: { isRead: boolean }[]) =>
          setUnreadCount(data.filter((t) => !t.isRead).length)
        )
        .catch(() => {});
    };
    loadUnread();
    const interval = setInterval(loadUnread, 15000);
    return () => clearInterval(interval);
  }, [isAuth, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("sipeta-admin-auth");
    router.push("/");
  };

  // If we're on the login page, don't show the sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-navy text-white">{children}</div>;
  }

  if (!isAuth) {
    return <div className="min-h-screen bg-navy flex items-center justify-center"><div className="w-8 h-8 border-4 border-emas border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const menu = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/forum", label: "Kelola Forum", icon: "💬" },
    { href: "/admin/materi", label: "Kelola Materi", icon: "📖" },
    { href: "/admin/pelaporan", label: "Laporan Anonim", icon: "🕵️" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B1120] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-navy border-r border-white/10 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emas/20 flex items-center justify-center border border-emas/30 shadow-inner">
            <span className="text-emas font-bold text-lg">S</span>
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg tracking-wide leading-tight">Admin</h1>
            <p className="text-[10px] text-emas/80 tracking-widest uppercase font-medium">SIPETA</p>
          </div>
        </div>

        <div className="flex-1 px-4 py-6 space-y-2">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-2">Menu Utama</p>
          {menu.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="block relative">
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors z-10 relative ${
                    isActive ? "text-emas" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                  {item.href === "/admin/forum" && unreadCount > 0 && (
                    <span className="ml-auto min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full bg-emas text-marun-dark text-[11px] font-bold">
                      {unreadCount}
                    </span>
                  )}
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="admin-active-bg"
                    className="absolute inset-0 bg-emas/10 border border-emas/20 rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 text-white/60 text-sm font-medium rounded-xl hover:bg-bahaya/20 hover:text-bahaya transition-all"
          >
            <span>Keluar Mode Admin</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-marun/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-emas/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
        
        <div className="flex-1 p-8 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
