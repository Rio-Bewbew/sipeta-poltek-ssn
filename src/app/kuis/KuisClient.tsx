"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type QuizState = "playing" | "feedback" | "result" | "review";

export default function KuisClient({ quizQuestions }: { quizQuestions: any[] }) {
  const [state, setState] = useState<QuizState>("playing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const actionAreaRef = useRef<HTMLDivElement>(null);
  const questionAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(quizQuestions));
  }, [quizQuestions]);

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;
  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  // Calculate score
  const score = useMemo(() => {
    let correct = 0;
    for (const q of shuffledQuestions) {
      if (answers[q.id] === q.jawabanBenar) correct++;
    }
    return totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
  }, [answers, shuffledQuestions, totalQuestions]);

  const correctCount = useMemo(() => {
    let c = 0;
    for (const q of shuffledQuestions) {
      if (answers[q.id] === q.jawabanBenar) c++;
    }
    return c;
  }, [answers, shuffledQuestions]);

  const handleSelectAnswer = (optionId: string) => {
    if (state !== "playing") return;
    setSelectedAnswer(optionId);
    setTimeout(() => {
      actionAreaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer,
    }));
    setState("feedback");
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setState("playing");

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      // Save score to localStorage
      try {
        localStorage.setItem("sipeta-quiz-score", score.toString());
      } catch {}

      // Submit score to database for gamification points
      fetch("/api/kuis/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: correctCount, total: totalQuestions }),
      }).catch(err => console.error("Failed to submit score", err));

      setState("result");

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const handleRestart = () => {
    setShuffledQuestions(shuffleArray(quizQuestions));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswers({});
    setState("playing");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleReview = () => {
    setState("review");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleBackToResult = () => {
    setState("result");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse text-teks/40">Memuat soal...</div>
      </div>
    );
  }

  // REVIEW STATE
  if (state === "review") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-marun-dark mb-2">
            Tinjau Jawaban
          </h1>
          <p className="text-teks/60">
            Skor Anda: {correctCount}/{totalQuestions} ({score}%)
          </p>
        </div>

        <div className="space-y-6">
          {shuffledQuestions.map((q, i) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.jawabanBenar;
            return (
              <div
                key={q.id}
                className={`bg-white rounded-xl p-6 border-2 ${
                  isCorrect ? "border-sukses/30" : "border-bahaya/30"
                }`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      isCorrect ? "bg-sukses" : "bg-bahaya"
                    }`}
                  >
                    {isCorrect ? "✓" : "✗"}
                  </span>
                  <p className="font-medium text-teks">
                    {i + 1}. {q.pertanyaan}
                  </p>
                </div>

                <div className="space-y-2 mb-4 ml-11">
                  {q.pilihan.map((p: any) => {
                    let cls = "text-teks/50";
                    if (p.id === q.jawabanBenar) cls = "text-sukses font-medium";
                    if (p.id === userAnswer && !isCorrect)
                      cls = "text-bahaya line-through";
                    return (
                      <p key={p.id} className={`text-sm ${cls}`}>
                        {p.id.toUpperCase()}. {p.teks}
                        {p.id === q.jawabanBenar && " ✓"}
                        {p.id === userAnswer && !isCorrect && " (Jawaban Anda)"}
                      </p>
                    );
                  })}
                </div>

                <div className="ml-11 bg-navy/5 rounded-lg p-3">
                  <p className="text-xs text-teks/70 leading-relaxed">
                    {q.penjelasan}
                  </p>
                  <p className="text-xs text-emas font-medium mt-1">
                    📎 {q.rujukanPasal}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleBackToResult}
            className="px-6 py-3 bg-navy text-white font-bold rounded-xl hover:bg-navy/90 transition-all"
          >
            ← Kembali ke Hasil
          </button>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-marun text-white font-bold rounded-xl hover:bg-marun-dark transition-all"
          >
            🔄 Ulangi Kuis
          </button>
        </div>
      </div>
    );
  }

  // RESULT STATE
  if (state === "result") {
    const category =
      score >= 80
        ? { label: "Paham Baik", emoji: "🎉", color: "text-sukses", bg: "bg-sukses-light", border: "border-sukses/30" }
        : score >= 60
        ? { label: "Cukup", emoji: "📖", color: "text-emas", bg: "bg-emas/10", border: "border-emas/30" }
        : { label: "Perlu Belajar Lagi", emoji: "📚", color: "text-bahaya", bg: "bg-bahaya-light", border: "border-bahaya/30" };

    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 12 }}
          className={`text-center ${category.bg} rounded-3xl p-10 border-2 ${category.border} shadow-xl`}
        >
          <motion.div 
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-7xl mb-6"
          >
            {category.emoji}
          </motion.div>
          <h1 className="font-serif text-4xl font-bold text-marun-dark mb-2">
            Hasil Kuis
          </h1>

          <div className="my-10 relative">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 50, delay: 0.3 }}
              className={`text-7xl font-black ${category.color} drop-shadow-md`}
            >
              {score}%
            </motion.div>
            <p className="text-teks/70 mt-3 font-medium text-lg">
              {correctCount} dari {totalQuestions} soal benar
            </p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`inline-block px-8 py-3 rounded-full font-bold text-lg ${category.color} bg-white shadow-sm border ${category.border} mb-8`}
          >
            {category.label}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col gap-4 mt-4"
          >
            <button
              onClick={handleReview}
              className="w-full py-4 bg-navy text-white font-bold rounded-2xl hover:bg-navy/90 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
            >
              📋 Tinjau Jawaban
            </button>
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 py-4 bg-marun text-white font-bold rounded-2xl hover:bg-marun-dark hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                🔄 Ulangi Kuis
              </button>
              <Link
                href="/materi"
                className="flex-1 py-4 bg-white text-marun font-bold rounded-2xl border-2 border-marun/20 hover:bg-marun/5 hover:scale-[1.02] active:scale-95 transition-all text-center shadow-sm"
              >
                📖 Materi
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // PLAYING / FEEDBACK STATE
  const isCorrectAnswer =
    state === "feedback" &&
    selectedAnswer === currentQuestion.jawabanBenar;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-marun-dark mb-3">
          Kuis Pemahaman
        </h1>
        <p className="text-teks/60">
          Jawab {totalQuestions} soal untuk menguji pemahaman Anda tentang peraturan
          pembinaan
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-teks/60">
            Soal {currentIndex + 1} dari {totalQuestions}
          </span>
          <span className="font-bold text-marun">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <div className="h-2.5 bg-black/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-marun to-emas rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div 
          ref={questionAreaRef}
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-black/5 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <p className="font-serif text-lg md:text-xl font-bold text-marun-dark mb-6 leading-relaxed">
              {currentQuestion.pertanyaan}
            </p>

            <div className="space-y-3">
              {currentQuestion.pilihan.map((pilihan: any, i: number) => {
                let optionStyle =
                  "border-black/10 hover:border-marun/30 bg-white cursor-pointer hover:shadow-md";

                if (state === "feedback") {
                  if (pilihan.id === currentQuestion.jawabanBenar) {
                    optionStyle = "border-sukses bg-sukses-light shadow-sm scale-[1.02] z-10";
                  } else if (
                    pilihan.id === selectedAnswer &&
                    pilihan.id !== currentQuestion.jawabanBenar
                  ) {
                    optionStyle = "border-bahaya bg-bahaya-light shadow-sm";
                  } else {
                    optionStyle = "border-black/5 bg-black/2 opacity-50";
                  }
                } else if (selectedAnswer === pilihan.id) {
                  optionStyle = "border-marun bg-marun/5 shadow-sm scale-[1.02]";
                }

                return (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileTap={state === "playing" ? { scale: 0.98 } : {}}
                    key={pilihan.id}
                    onClick={() => handleSelectAnswer(pilihan.id)}
                    disabled={state === "feedback"}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 relative ${optionStyle}`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-colors duration-300 ${
                          state === "feedback" &&
                          pilihan.id === currentQuestion.jawabanBenar
                            ? "bg-sukses text-white border-sukses"
                            : state === "feedback" &&
                              pilihan.id === selectedAnswer &&
                              pilihan.id !== currentQuestion.jawabanBenar
                            ? "bg-bahaya text-white border-bahaya"
                            : selectedAnswer === pilihan.id
                            ? "bg-marun text-white border-marun"
                            : "bg-white text-teks/60 border-black/20"
                        }`}
                      >
                        {state === "feedback" &&
                        pilihan.id === currentQuestion.jawabanBenar
                          ? "✓"
                          : state === "feedback" &&
                            pilihan.id === selectedAnswer &&
                            pilihan.id !== currentQuestion.jawabanBenar
                          ? "✗"
                          : pilihan.id.toUpperCase()}
                      </span>
                      <span className="text-sm md:text-base font-medium text-teks/80 leading-snug">{pilihan.teks}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

        {/* Action / Feedback section */}
        <div ref={actionAreaRef} className="px-6 md:px-8 pb-6 md:pb-8 pt-4">
          <AnimatePresence mode="wait">
            {state === "playing" ? (
              <motion.button
                key="btn-jawab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="w-full py-4 bg-gradient-to-r from-marun to-marun-dark text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                Kirim Jawaban
              </motion.button>
            ) : (
              <motion.div 
                key="feedback-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div
                  className={`rounded-xl p-5 mb-5 border-2 shadow-sm ${
                    isCorrectAnswer
                      ? "bg-sukses-light/50 border-sukses/40"
                      : "bg-bahaya-light/50 border-bahaya/40"
                  }`}
                >
                  <p
                    className={`font-bold text-lg mb-2 flex items-center gap-2 ${
                      isCorrectAnswer ? "text-sukses" : "text-bahaya"
                    }`}
                  >
                    {isCorrectAnswer ? "✅ Tepat Sekali!" : "❌ Kurang Tepat"}
                  </p>
                  <p className="text-sm text-teks/80 leading-relaxed font-medium">
                    {currentQuestion.penjelasan}
                  </p>
                  <p className="text-xs text-emas font-bold mt-3 bg-emas/10 inline-block px-3 py-1.5 rounded-md">
                    📎 {currentQuestion.rujukanPasal}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="w-full py-4 bg-navy text-white font-bold rounded-xl shadow-md"
                >
                  {currentIndex < totalQuestions - 1
                    ? "Soal Berikutnya →"
                    : "Lihat Hasil Akhir 🏆"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
