import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }

  // Fetch complete user data
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    include: {
      quizAttempts: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      threads: {
        orderBy: { createdAt: "desc" },
        take: 5,
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-marun/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-emas/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10 animate-fade-in-up">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-emas/20 border-2 border-emas/40 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-emas">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold text-white mb-1">
                Halo, {user.name}
              </h1>
              <p className="text-white/60 font-mono">NPM: {user.npm}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="px-6 py-3 bg-black/40 border border-emas/20 rounded-xl text-center">
              <p className="text-xs text-white/50 uppercase tracking-widest font-bold mb-1">Total Poin</p>
              <p className="text-2xl font-bold text-emas">{user.points} XP</p>
            </div>
            <LogoutButton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Riwayat Kuis */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📝</span> Riwayat Kuis Terakhir
              </h2>
              <Link href="/kuis" className="text-sm text-emas hover:underline">
                Ikuti Kuis Lagi &rarr;
              </Link>
            </div>
            
            <div className="space-y-4">
              {user.quizAttempts.length === 0 ? (
                <div className="text-center py-8 text-white/40 bg-black/20 rounded-xl border border-white/5">
                  Belum ada riwayat kuis. Ayo mulai belajar!
                </div>
              ) : (
                user.quizAttempts.map((attempt) => (
                  <div key={attempt.id} className="flex justify-between items-center p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                    <div>
                      <p className="font-bold text-white mb-1">
                        Skor: <span className={attempt.score >= (attempt.total / 2) ? "text-sukses" : "text-bahaya"}>{attempt.score}</span> / {attempt.total}
                      </p>
                      <p className="text-xs text-white/40">
                        {new Date(attempt.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      {attempt.score === attempt.total ? "🏆" : (attempt.score >= (attempt.total / 2) ? "👍" : "💪")}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Aktivitas Forum */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>💬</span> Aktivitas Forum Saya
              </h2>
              <Link href="/forum" className="text-sm text-emas hover:underline">
                Buka Forum &rarr;
              </Link>
            </div>
            
            <div className="space-y-4">
              {user.threads.length === 0 ? (
                <div className="text-center py-8 text-white/40 bg-black/20 rounded-xl border border-white/5">
                  Belum ada pertanyaan yang diajukan.
                </div>
              ) : (
                user.threads.map((thread) => (
                  <Link href={`/forum/${thread.id}`} key={thread.id} className="block p-4 bg-black/20 border border-white/5 rounded-xl hover:border-emas/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white line-clamp-1">{thread.title}</h3>
                      {thread.isAnswered ? (
                        <span className="text-[10px] font-bold px-2 py-1 bg-sukses/20 text-sukses rounded-full whitespace-nowrap">Dijawab</span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-1 bg-white/10 text-white/60 rounded-full whitespace-nowrap">Menunggu</span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 line-clamp-1 mb-2">{thread.content}</p>
                    <p className="text-[10px] text-white/30">
                      {new Date(thread.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
