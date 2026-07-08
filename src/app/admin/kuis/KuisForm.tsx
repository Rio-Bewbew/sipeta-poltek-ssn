"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function KuisForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    pertanyaan: initialData?.pertanyaan || "",
    jawabanBenar: initialData?.jawabanBenar || "a",
    penjelasan: initialData?.penjelasan || "",
    rujukanPasal: initialData?.rujukanPasal || "",
    pilihan: initialData?.pilihan || [
      { id: "a", teks: "" },
      { id: "b", teks: "" },
      { id: "c", teks: "" },
      { id: "d", teks: "" },
    ],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePilihanChange = (index: number, value: string) => {
    const newPilihan = [...formData.pilihan];
    newPilihan[index].teks = value;
    setFormData((prev) => ({ ...prev, pilihan: newPilihan }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = initialData ? `/api/admin/kuis/${initialData.id}` : "/api/admin/kuis";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/kuis");
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="font-serif text-xl font-bold text-emas border-b border-white/10 pb-2 mb-4">Detail Soal</h3>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Pertanyaan</label>
          <textarea 
            name="pertanyaan"
            value={formData.pertanyaan}
            onChange={handleChange}
            rows={3}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-white mb-2 mt-4">Pilihan Jawaban</label>
          <div className="space-y-3">
            {formData.pilihan.map((pilihan: any, index: number) => (
              <div key={pilihan.id} className="flex gap-3 items-center">
                <span className="font-bold text-emas w-6">{pilihan.id.toUpperCase()}</span>
                <input 
                  type="text"
                  value={pilihan.teks}
                  onChange={(e) => handlePilihanChange(index, e.target.value)}
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
                  placeholder={`Pilihan ${pilihan.id.toUpperCase()}`}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1 mt-4">Jawaban Benar</label>
          <select 
            name="jawabanBenar"
            value={formData.jawabanBenar}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
          >
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="font-serif text-xl font-bold text-emas border-b border-white/10 pb-2 mb-4">Umpan Balik</h3>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Penjelasan (Tampil saat selesai dijawab)</label>
          <textarea 
            name="penjelasan"
            value={formData.penjelasan}
            onChange={handleChange}
            rows={3}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Rujukan Pasal</label>
          <input 
            type="text"
            name="rujukanPasal"
            value={formData.rujukanPasal}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
            placeholder="Misal: Pasal 10 Perdirtek SSN No. 2 Tahun 2024"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-3 bg-emas text-marun-dark font-bold rounded-xl hover:bg-emas-light transition-colors disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : (initialData ? "Simpan Perubahan" : "Buat Soal Kuis")}
        </button>
        <Link 
          href="/admin/kuis" 
          className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
