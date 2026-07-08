import StudiKasusForm from "../StudiKasusForm";

export default function TambahStudiKasusPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Tambah Studi Kasus</h2>
        <p className="text-white/60">Buat skenario studi kasus baru.</p>
      </div>

      <StudiKasusForm />
    </div>
  );
}
