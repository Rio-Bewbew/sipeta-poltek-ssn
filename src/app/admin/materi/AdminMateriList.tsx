"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminMateriList({ initialMateri }: { initialMateri: any[] }) {
  const [materi, setMateri] = useState(initialMateri);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus materi ini secara permanen?")) return;
    try {
      const res = await fetch(`/api/admin/materi/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMateri(materi.filter((m) => m.id !== id));
      } else {
        alert("Gagal menghapus materi");
      }
    } catch (e) {
      console.error(e);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
        <h3 className="font-serif text-xl font-bold text-white">Daftar Materi</h3>
        <Link 
          href="/admin/materi/tambah"
          className="px-4 py-2 bg-emas text-marun-dark hover:bg-emas-light rounded-lg text-sm font-bold transition-colors shadow-lg shadow-emas/20"
        >
          + Tambah Materi
        </Link>
      </div>
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-left text-sm text-white/80 min-w-[600px]">
          <thead className="bg-black/40 text-white/50 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-semibold w-16 text-center">No</th>
              <th className="px-6 py-4 font-semibold">Judul Modul</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {materi.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-white/40">
                  Belum ada materi.
                </td>
              </tr>
            ) : (
              materi.map((m) => (
                <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-center font-bold text-emas">{m.nomor}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-white mb-1">{m.judul}</p>
                    <p className="text-xs text-white/40 line-clamp-1">{m.ringkasan}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/materi/edit/${m.id}`}
                      className="inline-block px-3 py-1 bg-white/10 text-white hover:bg-white/20 rounded mr-2 transition-colors"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(m.id)}
                      className="inline-block px-3 py-1 bg-bahaya/10 text-bahaya hover:bg-bahaya/20 border border-bahaya/20 hover:border-bahaya/40 rounded transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
