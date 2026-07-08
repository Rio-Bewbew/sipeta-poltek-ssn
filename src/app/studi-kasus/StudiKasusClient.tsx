"use client";

import { useState } from "react";

function CaseCard({
  kasus,
  index,
}: {
  kasus: any;
  index: number;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const correctOption = kasus.pilihan.find((p: any) => p.benar);
  const isCorrect = selected
    ? kasus.pilihan.find((p: any) => p.id === selected)?.benar
    : false;

  const handleSelect = (optionId: string) => {
    if (showResult) return;
    setSelected(optionId);
  };

  const handleSubmit = () => {
    if (!selected) return;
    setShowResult(true);
  };

  const handleReset = () => {
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div
      className="glass-panel rounded-2xl shadow-sm overflow-hidden animate-fade-in-up opacity-0"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-marun-dark to-marun p-6">
        <span className="text-xs font-medium text-emas/80 uppercase tracking-wider">
          Kasus {kasus.nomor}
        </span>
        <h3 className="font-serif text-xl font-bold text-white mt-1">
          {kasus.judul}
        </h3>
      </div>

      <div className="p-6 md:p-8">
        {/* Situasi */}
        <div className="bg-navy/5 rounded-xl p-5 mb-8 border-l-4 border-navy">
          <p className="text-sm font-bold text-navy mb-2 flex items-center gap-2">📋 Situasi:</p>
          <p className="text-sm text-teks/80 leading-relaxed font-medium">
            {kasus.situasi}
          </p>
        </div>

        {/* Question */}
        <p className="font-medium text-teks mb-4">
          Apa yang seharusnya dilakukan?
        </p>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {kasus.pilihan.map((pilihan: any) => {
            let optionStyle = "border-black/10 hover:border-marun/30 bg-white";
            if (showResult) {
              if (pilihan.benar) {
                optionStyle = "border-sukses bg-sukses-light";
              } else if (pilihan.id === selected && !pilihan.benar) {
                optionStyle = "border-bahaya bg-bahaya-light";
              } else {
                optionStyle = "border-black/5 bg-black/2 opacity-60";
              }
            } else if (selected === pilihan.id) {
              optionStyle = "border-marun bg-marun/5";
            }

            return (
              <button
                key={pilihan.id}
                onClick={() => handleSelect(pilihan.id)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${optionStyle}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                      showResult && pilihan.benar
                        ? "bg-sukses text-white border-sukses"
                        : showResult &&
                          pilihan.id === selected &&
                          !pilihan.benar
                        ? "bg-bahaya text-white border-bahaya"
                        : selected === pilihan.id
                        ? "bg-marun text-white border-marun"
                        : "bg-white text-teks/60 border-black/20"
                    }`}
                  >
                    {showResult && pilihan.benar
                      ? "✓"
                      : showResult &&
                        pilihan.id === selected &&
                        !pilihan.benar
                      ? "✗"
                      : pilihan.id.toUpperCase()}
                  </span>
                  <span className="text-sm leading-relaxed">
                    {pilihan.teks}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Submit */}
        {!showResult && (
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="w-full py-3 bg-marun text-white font-bold rounded-xl hover:bg-marun-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cek Jawaban
          </button>
        )}

        {/* Feedback */}
        {showResult && (
          <div className="animate-fade-in">
            <div
              className={`rounded-xl p-6 mb-6 border-2 ${
                isCorrect
                  ? "bg-sukses-light/50 border-sukses/30"
                  : "bg-bahaya-light/50 border-bahaya/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">
                  {isCorrect ? "✅" : "❌"}
                </span>
                <span
                  className={`font-bold ${
                    isCorrect ? "text-sukses" : "text-bahaya"
                  }`}
                >
                  {isCorrect ? "Benar!" : "Kurang Tepat"}
                </span>
              </div>
              <p className="text-sm text-teks/80 leading-relaxed mb-2">
                {kasus.umpanBalikBenar}
              </p>
              <p className="text-xs text-teks/50">
                Jawaban benar:{" "}
                <strong className="text-sukses">{correctOption?.teks}</strong>
              </p>
            </div>

            {/* Pelajaran Utama */}
            <div className="bg-emas/10 border border-emas/20 rounded-xl p-5 mb-4">
              <p className="text-sm font-bold text-marun-dark mb-1">
                💡 Pelajaran Utama:
              </p>
              <p className="text-sm text-teks/80 leading-relaxed">
                {kasus.pelajaranUtama}
              </p>
              <p className="text-xs text-emas font-medium mt-2">
                📎 {kasus.rujukanPasal}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 bg-navy text-white font-bold rounded-xl hover:bg-navy/90 transition-all"
            >
              Coba Lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudiKasusClient({ caseStudies }: { caseStudies: any[] }) {
  return (
    <div className="relative min-h-screen">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emas/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-gold"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-marun/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-marun-dark mb-3">
          Studi Kasus Interaktif
        </h1>
        <p className="text-teks/60 max-w-2xl mx-auto">
          Analisis skenario nyata dan pilih tindakan yang sesuai
          dengan peraturan. Dapatkan umpan balik instan beserta
          rujukan pasal.
        </p>
      </div>

        <div className="space-y-8">
          {caseStudies.map((kasus, i) => (
            <CaseCard key={kasus.id} kasus={kasus} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
