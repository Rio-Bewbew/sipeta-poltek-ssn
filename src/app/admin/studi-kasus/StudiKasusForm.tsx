"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudiKasusForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nomor: initialData?.nomor || 1,
    judul: initialData?.judul || "",
    situasi: initialData?.situasi || "",
    umpanBalikBenar: initialData?.umpanBalikBenar || "",
    pelajaranUtama: initialData?.pelajaranUtama || "",
    rujukanPasal: initialData?.rujukanPasal || "",
    pilihan: initialData?.pilihan || [
      { id: "a", teks: "", benar: true },
      { id: "b", teks: "", benar: false },
      { id: "c", teks: "", benar: false },
    ],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePilihanChange = (index: number, field: "teks" | "benar", value: any) => {
    const newPilihan = [...formData.pilihan];
    if (field === "benar") {
      // Hanya satu yang boleh benar
      newPilihan.forEach((p, i) => {
        p.benar = i === index ? true : false;
      });
    } else {
      newPilihan[index].teks = value;
    }
    setFormData((prev) => ({ ...prev, pilihan: newPilihan }));
  };

  const addPilihan = () => {
    const nextId = String.fromCharCode(97 + formData.pilihan.length); // a, b, c, d...
    setFormData((prev) => ({
      ...prev,
      pilihan: [...prev.pilihan, { id: nextId, teks: "", benar: false }],
    }));
  };

  const removePilihan = (index: number) => {
    const newPilihan = [...formData.pilihan];
    newPilihan.splice(index, 1);
    // Re-assign IDs
    newPilihan.forEach((p, i) => {
      p.id = String.fromCharCode(97 + i);
    });
    // Ensure at least one is correct
    if (newPilihan.length > 0 && !newPilihan.some((p) => p.benar)) {
      newPilihan[0].benar = true;
    }
    setFormData((prev) => ({ ...prev, pilihan: newPilihan }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = initialData ? `/api/admin/studi-kasus/${initialData.id}` : "/api/admin/studi-kasus";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/admin/studi-kasus");
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
        <h3 className="font-serif text-xl font-bold text-emas border-b border-white/10 pb-2 mb-4">Informasi Kasus</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Nomor Kasus</label>
            <input 
              type="number"
              name="nomor"
              value={formData.nomor}
              onChange={handleChange}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Judul Kasus</label>
            <input 
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleChange}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Situasi</label>
          <textarea 
            name="situasi"
            value={formData.situasi}
            onChange={handleChange}
            rows={3}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
            required
          />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="font-serif text-xl font-bold text-emas border-b border-white/10 pb-2 mb-4">Pilihan Tindakan</h3>

        <div className="space-y-3">
          {formData.pilihan.map((pilihan: any, index: number) => (
            <div key={index} className="flex gap-3 items-start bg-black/10 p-3 rounded-lg border border-white/5">
              <span className="font-bold text-emas w-6 mt-2">{pilihan.id.toUpperCase()}</span>
              <div className="flex-1 space-y-2">
                <input 
                  type="text"
                  value={pilihan.teks}
                  onChange={(e) => handlePilihanChange(index, "teks", e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
                  placeholder={`Tindakan ${pilihan.id.toUpperCase()}`}
                  required
                />
                <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                  <input 
                    type="radio" 
                    name="jawabanBenarStudiKasus"
                    checked={pilihan.benar}
                    onChange={() => handlePilihanChange(index, "benar", true)}
                    className="accent-emas"
                  />
                  <span>Tandai sebagai tindakan yang benar</span>
                </label>
              </div>
              <button 
                type="button" 
                onClick={() => removePilihan(index)} 
                className="px-3 py-2 bg-bahaya/20 text-bahaya rounded-lg hover:bg-bahaya/40"
              >
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={addPilihan} className="text-emas text-sm hover:underline">+ Tambah Pilihan</button>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="font-serif text-xl font-bold text-emas border-b border-white/10 pb-2 mb-4">Umpan Balik</h3>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Umpan Balik (Jika menjawab benar)</label>
          <textarea 
            name="umpanBalikBenar"
            value={formData.umpanBalikBenar}
            onChange={handleChange}
            rows={2}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Pelajaran Utama</label>
          <textarea 
            name="pelajaranUtama"
            value={formData.pelajaranUtama}
            onChange={handleChange}
            rows={2}
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
          {loading ? "Menyimpan..." : (initialData ? "Simpan Perubahan" : "Buat Studi Kasus")}
        </button>
        <Link 
          href="/admin/studi-kasus" 
          className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
