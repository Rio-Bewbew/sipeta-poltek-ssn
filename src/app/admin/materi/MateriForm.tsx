"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MateriForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nomor: initialData?.nomor || 1,
    judul: initialData?.judul || "",
    ringkasan: initialData?.ringkasan || "",
    icon: initialData?.icon || "BookOpen",
    poinKunci: initialData?.poinKunci || [""],
    praktikBaik: initialData?.praktikBaik || [""],
    pelanggaran: initialData?.pelanggaran || [""],
    kutipanPasal: initialData?.kutipanPasal || [{ label: "", teks: "" }],
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: "poinKunci" | "praktikBaik" | "pelanggaran", index: number, value: string) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (field: "poinKunci" | "praktikBaik" | "pelanggaran") => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field: "poinKunci" | "praktikBaik" | "pelanggaran", index: number) => {
    const newArr = [...formData[field]];
    newArr.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: newArr }));
  };

  const handleKutipanChange = (index: number, field: "label" | "teks", value: string) => {
    const newKutipan = [...formData.kutipanPasal];
    newKutipan[index] = { ...newKutipan[index], [field]: value };
    setFormData((prev) => ({ ...prev, kutipanPasal: newKutipan }));
  };

  const addKutipan = () => {
    setFormData((prev) => ({
      ...prev,
      kutipanPasal: [...prev.kutipanPasal, { label: "", teks: "" }],
    }));
  };

  const removeKutipan = (index: number) => {
    const newKutipan = [...formData.kutipanPasal];
    newKutipan.splice(index, 1);
    setFormData((prev) => ({ ...prev, kutipanPasal: newKutipan }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Clean up empty items
    const cleanData = {
      ...formData,
      poinKunci: formData.poinKunci.filter((item: string) => item.trim() !== ""),
      praktikBaik: formData.praktikBaik.filter((item: string) => item.trim() !== ""),
      pelanggaran: formData.pelanggaran.filter((item: string) => item.trim() !== ""),
      kutipanPasal: formData.kutipanPasal.filter((item: any) => item.label.trim() !== "" || item.teks.trim() !== ""),
    };

    try {
      const url = initialData ? `/api/admin/materi/${initialData.id}` : "/api/admin/materi";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });

      if (res.ok) {
        router.push("/admin/materi");
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
        <h3 className="font-serif text-xl font-bold text-emas border-b border-white/10 pb-2 mb-4">Informasi Utama</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">Nomor Modul</label>
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
            <label className="block text-sm font-medium text-white/80 mb-1">Icon (e.g. Shield, BookOpen, Users)</label>
            <input 
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Judul Modul</label>
          <input 
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Ringkasan</label>
          <textarea 
            name="ringkasan"
            value={formData.ringkasan}
            onChange={handleChange}
            rows={3}
            className="w-full bg-black/20 border border-white/10 rounded-lg p-2.5 text-white focus:border-emas focus:ring-1 focus:ring-emas outline-none"
            required
          />
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
        <h3 className="font-serif text-xl font-bold text-emas border-b border-white/10 pb-2 mb-4">Detail Konten</h3>

        {/* Poin Kunci */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">Poin Kunci</label>
          <div className="space-y-2">
            {formData.poinKunci.map((item: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input 
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange("poinKunci", index, e.target.value)}
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white"
                  placeholder={`Poin kunci ${index + 1}`}
                />
                <button type="button" onClick={() => removeArrayItem("poinKunci", index)} className="px-3 bg-bahaya/20 text-bahaya rounded-lg hover:bg-bahaya/40">X</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("poinKunci")} className="text-emas text-sm hover:underline">+ Tambah Poin</button>
          </div>
        </div>

        {/* Praktik Baik */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">Praktik Baik</label>
          <div className="space-y-2">
            {formData.praktikBaik.map((item: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input 
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange("praktikBaik", index, e.target.value)}
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white"
                  placeholder={`Praktik baik ${index + 1}`}
                />
                <button type="button" onClick={() => removeArrayItem("praktikBaik", index)} className="px-3 bg-bahaya/20 text-bahaya rounded-lg hover:bg-bahaya/40">X</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("praktikBaik")} className="text-emas text-sm hover:underline">+ Tambah Praktik Baik</button>
          </div>
        </div>

        {/* Pelanggaran */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">Pelanggaran</label>
          <div className="space-y-2">
            {formData.pelanggaran.map((item: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input 
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange("pelanggaran", index, e.target.value)}
                  className="flex-1 bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white"
                  placeholder={`Pelanggaran ${index + 1}`}
                />
                <button type="button" onClick={() => removeArrayItem("pelanggaran", index)} className="px-3 bg-bahaya/20 text-bahaya rounded-lg hover:bg-bahaya/40">X</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem("pelanggaran")} className="text-emas text-sm hover:underline">+ Tambah Pelanggaran</button>
          </div>
        </div>

        {/* Kutipan Pasal */}
        <div>
          <label className="block text-sm font-bold text-white mb-2">Kutipan Pasal</label>
          <div className="space-y-3">
            {formData.kutipanPasal.map((kutipan: any, index: number) => (
              <div key={index} className="flex gap-2 items-start bg-black/10 p-3 rounded-lg border border-white/5">
                <div className="flex-1 space-y-2">
                  <input 
                    type="text"
                    value={kutipan.label}
                    onChange={(e) => handleKutipanChange(index, "label", e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white"
                    placeholder={`Label (misal: Pasal 10)`}
                  />
                  <textarea 
                    value={kutipan.teks}
                    onChange={(e) => handleKutipanChange(index, "teks", e.target.value)}
                    rows={2}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-sm text-white"
                    placeholder="Isi kutipan pasal"
                  />
                </div>
                <button type="button" onClick={() => removeKutipan(index)} className="px-3 py-2 bg-bahaya/20 text-bahaya rounded-lg hover:bg-bahaya/40 mt-1">X</button>
              </div>
            ))}
            <button type="button" onClick={addKutipan} className="text-emas text-sm hover:underline">+ Tambah Kutipan Pasal</button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-3 bg-emas text-marun-dark font-bold rounded-xl hover:bg-emas-light transition-colors disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : (initialData ? "Simpan Perubahan" : "Buat Materi")}
        </button>
        <Link 
          href="/admin/materi" 
          className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
