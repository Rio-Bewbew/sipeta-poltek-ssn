export default function Footer() {
  return (
    <footer className="relative bg-[#0b1120] overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emas/30 to-transparent"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-marun/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-10 -left-20 w-64 h-64 bg-emas/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-white/80">
        {/* Top section */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-emas/20 flex items-center justify-center border border-emas/30">
                <span className="text-emas font-bold text-sm">S</span>
              </div>
              <span className="font-serif text-xl font-bold text-white">
                SIPETA
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Sistem Informasi Pembinaan Taruna — Platform edukasi
              interaktif untuk memahami dan menerapkan pembinaan yang
              positif, mendidik, dan bebas kekerasan.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif font-semibold text-emas mb-4 text-sm uppercase tracking-wider">
              Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/materi", label: "Materi Pembinaan" },
                { href: "/studi-kasus", label: "Studi Kasus" },
                { href: "/kuis", label: "Kuis Pemahaman" },
                { href: "/forum", label: "Forum Tanya-Jawab" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/60 hover:text-emas transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif font-semibold text-emas mb-4 text-sm uppercase tracking-wider">
              Sumber Hukum
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Seluruh materi mengacu pada{" "}
              <strong className="text-white/80">
                Peraturan Direktur Poltek SSN No. 2 Tahun 2024
              </strong>{" "}
              tentang Kehidupan Taruna.
            </p>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              Selaras dengan prinsip pembinaan positif & pencegahan kekerasan
              dalam regulasi pendidikan nasional.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            &copy; 2024{" "}
            <span className="text-emas/70 font-semibold">
              Kelompok 3 — Etos Sandi
            </span>{" "}
            · Politeknik Siber dan Sandi Negara
          </p>
          <p>
            Sumber: Perdir Poltek SSN No. 2/2024 tentang Kehidupan
            Taruna
          </p>
        </div>
      </div>
    </footer>
  );
}
