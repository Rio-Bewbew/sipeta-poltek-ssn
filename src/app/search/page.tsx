"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState({
    materi: [] as any[],
    studiKasus: [] as any[],
    forum: [] as any[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  const totalResults = results.materi.length + results.studiKasus.length + results.forum.length;

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-emas border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Hasil Pencarian
          </h1>
          <p className="text-white/60">
            {totalResults === 0 
              ? `Tidak ditemukan hasil untuk "${query}"` 
              : `Ditemukan ${totalResults} hasil untuk "${query}"`}
          </p>
        </div>

        {results.materi.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-emas border-b border-white/10 pb-2 mb-6">📚 Materi</h2>
            <div className="space-y-4">
              {results.materi.map((item) => (
                <Link key={item.id} href={`/materi/${item.id}`} className="block">
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emas/50 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{item.judul}</h3>
                    <p className="text-sm text-white/60 line-clamp-2">{item.ringkasan}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.studiKasus.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-emas border-b border-white/10 pb-2 mb-6">🕵️ Studi Kasus</h2>
            <div className="space-y-4">
              {results.studiKasus.map((item) => (
                <Link key={item.id} href="/studi-kasus" className="block">
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emas/50 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{item.judul}</h3>
                    <p className="text-sm text-white/60 line-clamp-2">{item.situasi}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {results.forum.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-emas border-b border-white/10 pb-2 mb-6">💬 Forum Diskusi</h2>
            <div className="space-y-4">
              {results.forum.map((item) => (
                <Link key={item.id} href={`/forum/${item.id}`} className="block">
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-emas/50 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 line-clamp-2">{item.content}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {query && totalResults === 0 && (
          <div className="text-center p-12 bg-white/5 border border-white/10 rounded-3xl">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">Pencarian Tidak Ditemukan</h3>
            <p className="text-white/60">Coba gunakan kata kunci lain yang lebih umum.</p>
            <Link href="/" className="inline-block mt-6 px-6 py-2 bg-emas text-marun-dark font-bold rounded-xl hover:bg-emas-light transition-colors">
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-12 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-emas border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
