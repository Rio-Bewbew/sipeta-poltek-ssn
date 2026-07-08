import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const session = await getSession();

  // Ambil top 20 user dengan point terbanyak
  const topUsers = await prisma.user.findMany({
    orderBy: { points: "desc" },
    take: 20,
    select: {
      id: true,
      name: true,
      npm: true,
      points: true,
    }
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emas/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-marun/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto space-y-12 relative z-10 animate-fade-in-up">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-emas/20 rounded-2xl mx-auto flex items-center justify-center border border-emas/30 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
            <span className="text-4xl">🏆</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Papan Peringkat <span className="text-emas">Taruna</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Kumpulkan poin sebanyak-banyaknya dengan mengerjakan kuis dan berpartisipasi aktif di forum diskusi.
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="glass-panel-dark rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Top 20 Taruna Terbaik</h2>
            {!session && (
              <Link href="/login" className="text-sm text-emas hover:underline font-bold">
                Masuk untuk melihat posisimu &rarr;
              </Link>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/20 text-white/50 text-xs uppercase tracking-widest border-b border-white/10">
                  <th className="px-6 py-4 font-medium text-center w-20">Peringkat</th>
                  <th className="px-6 py-4 font-medium">Nama Taruna</th>
                  <th className="px-6 py-4 font-medium">NPM</th>
                  <th className="px-6 py-4 font-medium text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {topUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-white/40">
                      Belum ada data peringkat. Jadilah yang pertama mendapatkan poin!
                    </td>
                  </tr>
                ) : (
                  topUsers.map((user, index) => {
                    const isMe = session?.id === user.id;
                    let rankBadge = <span className="text-white/60 font-mono text-lg">#{index + 1}</span>;
                    if (index === 0) rankBadge = <span className="text-3xl">🥇</span>;
                    else if (index === 1) rankBadge = <span className="text-3xl">🥈</span>;
                    else if (index === 2) rankBadge = <span className="text-3xl">🥉</span>;

                    return (
                      <tr 
                        key={user.id} 
                        className={`transition-colors hover:bg-white/5 ${isMe ? "bg-emas/10 border-l-4 border-emas" : ""}`}
                      >
                        <td className="px-6 py-4 text-center font-bold">
                          {rankBadge}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isMe ? "bg-emas text-marun-dark" : "bg-white/10 text-white"}`}>
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className={`font-bold ${isMe ? "text-emas" : "text-white"}`}>{user.name}</p>
                              {isMe && <span className="text-[10px] bg-emas/20 text-emas px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Itu Kamu</span>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-white/60 font-mono text-sm">
                          {user.npm}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-bold text-lg ${index < 3 ? "text-emas" : "text-white/80"}`}>
                            {user.points} <span className="text-sm font-normal opacity-50">XP</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
