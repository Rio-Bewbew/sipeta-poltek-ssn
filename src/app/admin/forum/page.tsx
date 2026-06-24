"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminThread {
  id: string;
  title: string;
  content: string;
  author: string;
  authorReal: string | null;
  isAnonymous: boolean;
  category: string;
  isRead: boolean;
  isAnswered: boolean;
  replyCount: number;
  createdAt: string;
}

interface AdminReply {
  id: string;
  content: string;
  author: string;
  authorReal: string | null;
  isAnonymous: boolean;
  isPengasuh: boolean;
  upvotes: number;
  createdAt: string;
}

interface AdminThreadDetail extends AdminThread {
  replies: AdminReply[];
}

export default function AdminForum() {
  const [threads, setThreads] = useState<AdminThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [onlyUnanswered, setOnlyUnanswered] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Detail / answer panel
  const [selected, setSelected] = useState<AdminThreadDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [pengasuhName, setPengasuhName] = useState("Pengasuh");
  const [replyAnonymous, setReplyAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchThreads = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/forum");
      const data = await res.json();
      setThreads(data);
    } catch {
      console.error("Failed to fetch threads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const openThread = async (id: string) => {
    setDetailLoading(true);
    setAnswer("");
    try {
      // Tandai sudah dibaca + ambil detail
      await fetch(`/api/admin/forum/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      const res = await fetch(`/api/admin/forum/${id}`);
      const data = await res.json();
      setSelected(data);
      // Update status read di daftar (pindah ke "Sudah Dibaca")
      setThreads((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isRead: true } : t))
      );
    } catch {
      console.error("Failed to open thread");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !answer.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/forum/${selected.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: answer, author: pengasuhName, isAnonymous: replyAnonymous }),
      });
      if (res.ok) {
        setAnswer("");
        setReplyAnonymous(false);
        // Ambil ulang detail + daftar; thread TIDAK hilang, hanya pindah ke "Sudah Dijawab"
        const detail = await fetch(`/api/admin/forum/${selected.id}`).then((r) =>
          r.json()
        );
        setSelected(detail);
        fetchThreads();
      }
    } catch {
      console.error("Failed to answer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Hapus pertanyaan ini beserta seluruh balasannya? Tindakan ini tidak bisa dibatalkan."
      )
    )
      return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/forum/${id}`, { method: "DELETE" });
      if (res.ok) {
        setThreads((prev) => prev.filter((t) => t.id !== id));
        if (selected?.id === id) setSelected(null);
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

  const unread = threads.filter((t) => !t.isRead);
  const readUnanswered = threads.filter((t) => t.isRead && !t.isAnswered);
  const answered = threads.filter((t) => t.isAnswered);
  
  const unreadTotal = unread.length;
  const unansweredTotal = unreadTotal + readUnanswered.length;

  const displayName = (t: { author: string; authorReal: string | null; isAnonymous: boolean }) =>
    t.isAnonymous
      ? `${t.authorReal ?? "?"} (anonim)`
      : t.authorReal ?? t.author;

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-white mb-2">
            Manajemen Forum
          </h2>
          <p className="text-white/60">
            Pesan baru dipisah dari yang sudah dibaca. Menjawab tidak menghapus
            pertanyaan — hanya menandainya sebagai &quot;Sudah Dijawab&quot;.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-emas/10 border border-emas/30 text-center">
            <p className="text-2xl font-bold text-emas leading-none">
              {unreadTotal}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-emas/70 mt-1">
              Belum Dibaca
            </p>
          </div>
          <div className="px-4 py-2 rounded-xl bg-bahaya/10 border border-bahaya/30 text-center">
            <p className="text-2xl font-bold text-bahaya leading-none">
              {unansweredTotal}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-bahaya/70 mt-1">
              Belum Dijawab
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-white/40">
          <div className="w-6 h-6 border-2 border-emas border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          Memuat data forum...
        </div>
      ) : (
        <>
          {/* SECTION: PESAN BARU / BELUM DIBACA */}
          <section className="rounded-2xl border border-emas/30 bg-emas/[0.04] overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-emas/20 bg-emas/10">
              <span className="text-lg">🔔</span>
              <h3 className="font-serif font-bold text-white">
                Pesan Baru / Belum Dibaca
              </h3>
              <span className="ml-auto px-2.5 py-0.5 rounded-full bg-emas text-marun-dark text-xs font-bold">
                {unread.length}
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {unread.length === 0 ? (
                <p className="px-6 py-8 text-center text-white/40 text-sm">
                  Tidak ada pesan baru. 🎉
                </p>
              ) : (
                unread.map((t) => (
                  <ThreadRow
                    key={t.id}
                    t={t}
                    highlight
                    onOpen={() => openThread(t.id)}
                    onDelete={() => handleDelete(t.id)}
                    deleting={deletingId === t.id}
                    formatDate={formatDate}
                    displayName={displayName(t)}
                  />
                ))
              )}
            </div>
          </section>

          {/* SECTION: BELUM DIJAWAB (SUDAH DIBACA) */}
          <section className="rounded-2xl border border-bahaya/30 bg-bahaya/[0.04] overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-bahaya/20 bg-bahaya/10">
              <span className="text-lg">⏳</span>
              <h3 className="font-serif font-bold text-white">
                Belum Dijawab (Sudah Dibaca)
              </h3>
              <span className="ml-auto px-2.5 py-0.5 rounded-full bg-bahaya text-white text-xs font-bold">
                {readUnanswered.length}
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {readUnanswered.length === 0 ? (
                <p className="px-6 py-8 text-center text-white/40 text-sm">
                  Tidak ada pesan yang menunggu jawaban.
                </p>
              ) : (
                readUnanswered.map((t) => (
                  <ThreadRow
                    key={t.id}
                    t={t}
                    onOpen={() => openThread(t.id)}
                    onDelete={() => handleDelete(t.id)}
                    deleting={deletingId === t.id}
                    formatDate={formatDate}
                    displayName={displayName(t)}
                  />
                ))
              )}
            </div>
          </section>

          {/* SECTION: SUDAH DIJAWAB */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/5">
              <span className="text-lg">📭</span>
              <h3 className="font-serif font-bold text-white">Sudah Dijawab</h3>
              <span className="ml-auto px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-xs font-bold">
                {answered.length}
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {answered.length === 0 ? (
                <p className="px-6 py-8 text-center text-white/40 text-sm">
                  Belum ada yang dijawab.
                </p>
              ) : (
                answered.map((t) => (
                  <ThreadRow
                    key={t.id}
                    t={t}
                    onOpen={() => openThread(t.id)}
                    onDelete={() => handleDelete(t.id)}
                    deleting={deletingId === t.id}
                    formatDate={formatDate}
                    displayName={displayName(t)}
                  />
                ))
              )}
            </div>
          </section>
        </>
      )}

      {/* DETAIL / ANSWER MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative bg-[#0F172A] border border-white/10 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {detailLoading || !selected ? (
                <div className="p-12 text-center text-white/40">
                  <div className="w-6 h-6 border-2 border-emas border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs border border-white/10 text-white/80">
                        {selected.category}
                      </span>
                      {selected.isAnswered ? (
                        <span className="px-2 py-0.5 rounded-full bg-sukses/20 text-sukses text-[10px] font-bold uppercase tracking-wider">
                          ✔ Sudah Dijawab
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-bahaya/20 text-bahaya text-[10px] font-bold uppercase tracking-wider">
                          Belum Dijawab
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="text-white/40 hover:text-white text-xl leading-none"
                    >
                      ×
                    </button>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    {selected.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed whitespace-pre-wrap mb-3">
                    {selected.content}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-white/50 pb-4 mb-4 border-b border-white/10">
                    <span>
                      {selected.isAnonymous ? "🕶️" : "👤"} {displayName(selected)}
                    </span>
                    <span>🕐 {formatDate(selected.createdAt)}</span>
                  </div>
                  {selected.isAnonymous && (
                    <p className="text-[11px] text-emas/80 -mt-2 mb-4">
                      Pengirim memilih anonim. Identitas asli hanya terlihat oleh
                      Pengasuh.
                    </p>
                  )}

                  {/* Replies */}
                  <h4 className="font-semibold text-white/80 text-sm mb-3">
                    Balasan ({selected.replies.length})
                  </h4>
                  <div className="space-y-3 mb-6">
                    {selected.replies.length === 0 ? (
                      <p className="text-white/40 text-sm">Belum ada balasan.</p>
                    ) : (
                      selected.replies.map((r) => (
                        <div
                          key={r.id}
                          className={`rounded-xl p-4 border ${
                            r.isPengasuh
                              ? "border-sukses/30 bg-sukses/5"
                              : "border-white/10 bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white">
                              {r.isAnonymous
                                ? `${r.authorReal ?? "?"} (anonim)`
                                : r.authorReal ?? r.author}
                            </span>
                            {r.isPengasuh && (
                              <span className="px-2 py-0.5 rounded-full bg-sukses text-white text-[10px] font-bold uppercase tracking-wider">
                                ✔ Pengasuh
                              </span>
                            )}
                            <span className="text-xs text-white/40 ml-auto">
                              {formatDate(r.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-white/80 whitespace-pre-wrap">
                            {r.content}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Answer form */}
                  <form
                    onSubmit={handleAnswer}
                    className="border-t border-white/10 pt-5 space-y-3"
                  >
                    <h4 className="font-semibold text-white text-sm">
                      ✍️ Jawab sebagai Pengasuh
                    </h4>
                    <input
                      type="text"
                      value={pengasuhName}
                      onChange={(e) => setPengasuhName(e.target.value)}
                      placeholder="Nama / pangkat Pengasuh"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-emas focus:outline-none"
                    />
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Tulis jawaban resmi Pengasuh..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:border-emas focus:outline-none resize-none"
                      required
                    />
                    <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={replyAnonymous}
                        onChange={(e) => setReplyAnonymous(e.target.checked)}
                        className="w-4 h-4 accent-emas"
                      />
                      Balas sebagai Anonim
                    </label>
                    <button
                      type="submit"
                      disabled={submitting || !answer.trim()}
                      className="px-6 py-2.5 bg-gradient-to-r from-emas to-emas-light text-marun-dark font-bold rounded-xl hover:shadow-lg hover:shadow-emas/30 transition-all disabled:opacity-50"
                    >
                      {submitting ? "Mengirim..." : "Kirim Jawaban Pengasuh"}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ThreadRow({
  t,
  highlight,
  onOpen,
  onDelete,
  deleting,
  formatDate,
  displayName,
}: {
  t: AdminThread;
  highlight?: boolean;
  onOpen: () => void;
  onDelete: () => void;
  deleting: boolean;
  formatDate: (s: string) => string;
  displayName: string;
}) {
  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors">
      {highlight && (
        <span className="w-2 h-2 rounded-full bg-emas shrink-0 animate-pulse" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <p className="font-medium text-white truncate">{t.title}</p>
          {t.isAnonymous && (
            <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/60 text-[10px]">
              🕶️ Anonim
            </span>
          )}
          {t.isAnswered ? (
            <span className="px-2 py-0.5 rounded-full bg-sukses/20 text-sukses text-[10px] font-bold uppercase tracking-wider">
              ✔ Sudah Dijawab
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-bahaya/20 text-bahaya text-[10px] font-bold uppercase tracking-wider">
              Belum Dijawab
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-white/40">
          <span>{displayName}</span>
          <span>· {t.category}</span>
          <span>· 💬 {t.replyCount}</span>
          <span>· {formatDate(t.createdAt)}</span>
        </div>
      </div>
      <button
        onClick={onOpen}
        className="px-3 py-1.5 rounded-lg bg-emas/10 text-emas text-sm font-medium hover:bg-emas/20 transition-colors whitespace-nowrap"
      >
        Buka &amp; Jawab
      </button>
      <button
        onClick={onDelete}
        disabled={deleting}
        className="w-8 h-8 rounded-lg bg-bahaya/10 text-bahaya hover:bg-bahaya/20 transition-colors disabled:opacity-50"
        title="Hapus"
      >
        {deleting ? "⏳" : "🗑️"}
      </button>
    </div>
  );
}
