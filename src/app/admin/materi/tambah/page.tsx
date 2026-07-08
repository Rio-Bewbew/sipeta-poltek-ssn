import MateriForm from "../MateriForm";

export default function TambahMateriPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="font-serif text-3xl font-bold text-white mb-2">Tambah Materi</h2>
        <p className="text-white/60">Buat modul pembelajaran baru.</p>
      </div>

      <MateriForm />
    </div>
  );
}
