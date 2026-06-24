"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Reply {
  id: string;
  content: string;
  author: string;
  isPengasuh: boolean;
  upvotes: number;
  createdAt: string;
}

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  replies: Reply[];
}

const categoryColors: Record<string, string> = {
  "Metode Pembinaan": "bg-navy/10 text-navy",
  "Larangan Kekerasan": "bg-bahaya/10 text-bahaya",
  "Tradisi Taruna": "bg-emas/10 text-emas",
  "Prosedur & Izin": "bg-marun/10 text-marun",
  Umum: "bg-teks/10 text-teks",
};

export default function ThreadDetailPage() {
  const params = useParams();
  const [thread, setThread] = useState<Thread | null>(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyAnonymous, setReplyAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchThread = async () => {
    try {
      const res = await fetch(`/api/forum/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setThread(data);
      }
    } catch {
      console.error("Failed to fetch thread");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) fetchThread();
  }, [params.id]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent || !replyAuthor) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/forum/${params.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: replyContent,
          author: replyAuthor,
          isAnonymous: replyAnonymous,
        }),
      });

      if (res.ok) {
        setReplyContent("");
        setReplyAnonymous(false);
        fetchThread();
      }
    } catch {
      console.error("Failed to submit reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = async (replyId: string) => {
    try {
      const res = await fetch(`/api/forum/reply/${replyId}/upvote`, {
        method: "POST",
      });
      if (res.ok) {
        fetchThread();
      }
    } catch {
      console.error("Failed to upvote");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-black/5 rounded w-3/4" />
          <div className="h-4 bg-black/5 rounded w-1/4" />
          <div className="h-24 bg-black/5 rounded" />
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-bold text-marun-dark mb-4">
          Thread tidak ditemukan
        </h1>
        <Link
          href="/forum"
          className="text-marun hover:text-emas transition-colors"
        >
          ← Kembali ke Forum
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-teks/50 mb-8">
        <Link
          href="/forum"
          className="hover:text-marun transition-colors"
        >
          Forum
        </Link>
        <span>/</span>
        <span className="text-teks/80 truncate">{thread.title}</span>
      </div>

      {/* Thread content */}
      <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                categoryColors[thread.category] || "bg-teks/10 text-teks"
              }`}
            >
              {thread.category}
            </span>
          </div>

          <h1 className="font-serif text-2xl md:text-3xl font-bold text-marun-dark mb-4">
            {thread.title}
          </h1>

          <p className="text-teks/80 leading-relaxed whitespace-pre-wrap mb-4">
            {thread.content}
          </p>

          <div className="flex items-center gap-3 text-xs text-teks/50 pt-4 border-t border-black/5">
            <span>👤 {thread.author}</span>
            <span>🕐 {formatDate(thread.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="mb-8">
        <h2 className="font-serif font-bold text-xl text-marun-dark mb-4">
          💬 Balasan ({thread.replies.length})
        </h2>

        {thread.replies.length === 0 ? (
          <div className="text-center py-8 text-teks/40 bg-white rounded-xl border border-black/5">
            <p>Belum ada balasan. Jadilah yang pertama!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {thread.replies.map((reply) => (
              <div
                key={reply.id}
                className={`bg-white rounded-xl p-5 border ${
                  reply.isPengasuh
                    ? "border-sukses/30 ring-1 ring-sukses/10"
                    : "border-black/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      reply.isPengasuh
                        ? "bg-sukses/10 text-sukses"
                        : "bg-marun/10 text-marun"
                    }`}
                  >
                    {reply.author.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-teks">
                        {reply.author}
                      </span>
                      {reply.isPengasuh && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sukses text-white uppercase tracking-wider">
                          ✔ Pengasuh
                        </span>
                      )}
                      <span className="text-xs text-teks/40">
                        {formatDate(reply.createdAt)}
                      </span>
                    </div>

                    <p className="text-sm text-teks/80 leading-relaxed whitespace-pre-wrap">
                      {reply.content}
                    </p>

                    <button
                      onClick={() => handleUpvote(reply.id)}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs text-teks/40 hover:text-emas transition-colors group"
                    >
                      <svg
                        className="w-4 h-4 group-hover:scale-110 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      <span className="font-medium">{reply.upvotes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-black/5">
        <h3 className="font-serif font-bold text-lg text-marun-dark mb-4">
          ✍️ Tulis Balasan
        </h3>

        <form onSubmit={handleReply} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-teks/80 mb-1">
              Nama Anda
            </label>
            <input
              type="text"
              value={replyAuthor}
              onChange={(e) => setReplyAuthor(e.target.value)}
              placeholder="Taruna ..."
              className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emas focus:ring-1 focus:ring-emas outline-none transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-teks/80 mb-1">
              Isi Balasan
            </label>
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Tulis balasan Anda..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-emas focus:ring-1 focus:ring-emas outline-none transition-all text-sm resize-none"
              required
            />
          </div>

          <label
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              replyAnonymous
                ? "border-emas bg-emas/10"
                : "border-black/10 hover:border-emas/40"
            }`}
          >
            <input
              type="checkbox"
              checked={replyAnonymous}
              onChange={(e) => setReplyAnonymous(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-marun"
            />
            <span className="text-sm text-teks/80">
              <span className="font-semibold">Balas sebagai Anonim</span>
              <span className="block text-xs text-teks/50 mt-0.5">
                Nama Anda tampil sebagai &quot;Anonim&quot;. Pengasuh tetap dapat
                melihat identitas asli.
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={submitting || !replyContent || !replyAuthor}
            className="px-8 py-3 bg-marun text-white font-bold rounded-xl hover:bg-marun-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Mengirim..." : "Kirim Balasan"}
          </button>
        </form>
      </div>
    </div>
  );
}
