import KuisForm from "../KuisForm";

export default function TambahKuisPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Tambah Soal Kuis</h2>
        <p className="text-white/60">Buat soal kuis baru untuk taruna.</p>
      </div>

      <KuisForm />
    </div>
  );
}
