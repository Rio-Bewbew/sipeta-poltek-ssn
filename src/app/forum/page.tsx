"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  "Semua",
  "Metode Pembinaan",
  "Larangan Kekerasan",
  "Tradisi Taruna",
  "Prosedur & Izin",
  "Umum",
];

const categoryColors: Record<string, string> = {
  "Metode Pembinaan": "bg-navy/10 text-navy",
  "Larangan Kekerasan": "bg-bahaya/10 text-bahaya",
  "Tradisi Taruna": "bg-emas/10 text-emas",
  "Prosedur & Izin": "bg-marun/10 text-marun",
  Umum: "bg-teks/10 text-teks",
};

interface ThreadSummary {
  id: string;
  title: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  category: string;
  createdAt: string;
  replyCount: number;
  hasPengasuhReply: boolean;
}

export default function ForumPage() {
  const [threads, setThreads] = useState<ThreadSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("Umum");
  const [newAnonymous, setNewAnonymous] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchThreads = async (category = "Semua") => {
    setLoading(true);
    try {
      const params = category !== "Semua" ? `?category=${encodeURIComponent(category)}` : "";
      const res = await fetch(`/api/forum${params}`);
      const data = await res.json();
      setThreads(data);
    } catch {
      console.error("Failed to fetch threads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads(activeCategory);
  }, [activeCategory]);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent || !newAuthor) return;

    setCreating(true);
    try {
      const res = await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          author: newAuthor,
          category: newCategory,
          isAnonymous: newAnonymous,
        }),
      });

      if (res.ok) {
        setShowCreateModal(false);
        setNewTitle("");
        setNewContent("");
        setNewAuthor("");
        setNewCategory("Umum");
        setNewAnonymous(false);
        fetchThreads(activeCategory);
      }
    } catch {
      console.error("Failed to create thread");
    } finally {
      setCreating(false);
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
    <div className="relative min-h-screen">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emas/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-gold"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-marun/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-marun-dark mb-2">
            Forum Tanya-Jawab
          </h1>
          <p className="text-teks/60">
            Diskusi tentang pembinaan taruna dengan pengasuh dan sesama
            taruna
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-marun text-white font-bold rounded-xl hover:bg-marun-dark transition-all shadow-lg shadow-marun/20 hover:shadow-xl hover:-translate-y-0.5"
        >
          ✏️ Buat Pertanyaan Baru
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-marun text-white"
                : "bg-white text-teks/60 border border-black/10 hover:border-marun/30 hover:text-marun"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Thread list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-panel rounded-2xl p-6 animate-pulse"
            >
              <div className="h-5 bg-black/5 rounded w-3/4 mb-3" />
              <div className="h-3 bg-black/5 rounded w-1/4 mb-2" />
              <div className="h-3 bg-black/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : threads.length === 0 ? (
        <div className="text-center py-12 text-teks/40">
          <p className="text-5xl mb-4">💬</p>
          <p>Belum ada thread di kategori ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {threads.map((thread, i) => (
            <Link
              key={thread.id}
              href={`/forum/${thread.id}`}
              className="block glass-panel rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-emas/50 hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up opacity-0 relative overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-gradient-to-tl from-emas/10 to-transparent rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        categoryColors[thread.category] || "bg-teks/10 text-teks"
                      }`}
                    >
                      {thread.category}
                    </span>
                    {thread.hasPengasuhReply && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sukses/10 text-sukses uppercase tracking-wider">
                        ✔ Dijawab Pengasuh
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-lg text-marun-dark group-hover:text-marun transition-colors truncate">
                    {thread.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-teks/50">
                    <span>{thread.isAnonymous ? "🕶️" : "👤"} {thread.author}</span>
                    <span>💬 {thread.replyCount} balasan</span>
                    <span>🕐 {formatDate(thread.createdAt)}</span>
                  </div>
                </div>

                <svg
                  className="w-5 h-5 text-teks/20 group-hover:text-emas group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      </div>

      {/* Create thread modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-navy/80 backdrop-blur-md"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="relative bg-krem rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-black/10">
            <div className="p-6 md:p-8">
              <h2 className="font-serif text-2xl font-bold text-marun-dark mb-6">
                ✏️ Buat Pertanyaan Baru
              </h2>

              <form onSubmit={handleCreateThread} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-teks/80 mb-1">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Taruna ..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emas focus:ring-1 focus:ring-emas outline-none transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-teks/80 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emas focus:ring-1 focus:ring-emas outline-none transition-all text-sm bg-white"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-teks/80 mb-1">
                    Judul Pertanyaan
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Tuliskan judul pertanyaan Anda..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emas focus:ring-1 focus:ring-emas outline-none transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-teks/80 mb-1">
                    Isi Pertanyaan
                  </label>
                  <textarea
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Jelaskan pertanyaan Anda secara detail..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emas focus:ring-1 focus:ring-emas outline-none transition-all text-sm resize-none"
                    required
                  />
                </div>

                <label
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    newAnonymous
                      ? "border-emas bg-emas/10"
                      : "border-black/10 hover:border-emas/40"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={newAnonymous}
                    onChange={(e) => setNewAnonymous(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-marun"
                  />
                  <span className="text-sm text-teks/80">
                    <span className="font-semibold">Kirim sebagai Anonim</span>
                    <span className="block text-xs text-teks/50 mt-0.5">
                      Nama Anda disembunyikan dari taruna lain (tampil sebagai
                      &quot;Anonim&quot;). Pengasuh tetap dapat melihat identitas
                      asli Anda.
                    </span>
                  </span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 bg-black/5 text-teks/60 font-bold rounded-xl hover:bg-black/10 transition-all"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 py-3 bg-marun text-white font-bold rounded-xl hover:bg-marun-dark transition-all disabled:opacity-50"
                  >
                    {creating ? "Mengirim..." : "Kirim Pertanyaan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
