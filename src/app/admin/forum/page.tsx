"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThreadSummary {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  replyCount: number;
  hasPengasuhReply: boolean;
}

export default function AdminForum() {
  const [threads, setThreads] = useState<ThreadSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchThreads = async () => {
    try {
      const res = await fetch("/api/forum");
      const data = await res.json();
      setThreads(data);
    } catch {
      console.error("Failed to fetch threads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pertanyaan ini beserta seluruh balasannya?")) {
      return;
    }
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/forum/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setThreads(threads.filter(t => t.id !== id));
      } else {
        alert("Gagal menghapus thread");
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Manajemen Forum</h2>
        <p className="text-white/60">Kelola pertanyaan dari taruna. Hapus konten yang tidak pantas.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="text-xs uppercase bg-black/20 text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Pertanyaan</th>
                <th className="px-6 py-4 font-semibold">Pengirim</th>
                <th className="px-6 py-4 font-semibold">Kategori</th>
                <th className="px-6 py-4 font-semibold text-center">Balasan</th>
                <th className="px-6 py-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                    <div className="w-6 h-6 border-2 border-emas border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    Memuat data forum...
                  </td>
                </tr>
              ) : threads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                    Belum ada pertanyaan di forum saat ini.
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {threads.map((thread) => (
                    <motion.tr 
                      key={thread.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-white mb-1 line-clamp-1">{thread.title}</p>
                        <p className="text-xs text-white/40">{formatDate(thread.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-emas/20 flex items-center justify-center text-xs font-bold text-emas">
                            {thread.author.charAt(0).toUpperCase()}
                          </div>
                          <span>{thread.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-md bg-white/10 text-xs border border-white/5">
                          {thread.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${thread.hasPengasuhReply ? "bg-sukses/20 text-sukses" : "bg-white/10 text-white/60"}`}>
                          {thread.replyCount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a 
                          href={`/forum/${thread.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emas/10 text-emas hover:bg-emas/20 transition-colors mr-2"
                          title="Lihat & Balas"
                        >
                          👁️
                        </a>
                        <button
                          onClick={() => handleDelete(thread.id)}
                          disabled={deletingId === thread.id}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-bahaya/10 text-bahaya hover:bg-bahaya/20 transition-colors disabled:opacity-50"
                          title="Hapus"
                        >
                          {deletingId === thread.id ? "⏳" : "🗑️"}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
