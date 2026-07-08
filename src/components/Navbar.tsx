"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/materi", label: "Materi" },
  { href: "/studi-kasus", label: "Studi Kasus" },
  { href: "/kuis", label: "Kuis" },
  { href: "/forum", label: "Forum" },
  { href: "/leaderboard", label: "Peringkat" },
  { 
    href: "/pelaporan", 
    label: "Pelaporan Anonim",
  },
];

export default function Navbar({ session }: { session: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`w-full max-w-7xl mx-auto rounded-2xl transition-all duration-500 overflow-hidden ${
          scrolled 
            ? "glass-panel-dark shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10" 
            : "bg-marun-dark/90 backdrop-blur-xl border border-white/5 shadow-lg"
        }`}
      >
        <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 transition-all duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-10 h-10 rounded-xl bg-emas/20 flex items-center justify-center border border-emas/30 group-hover:bg-emas/40 transition-colors shadow-inner"
            >
              <span className="text-emas font-bold text-lg">S</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-white tracking-wide leading-tight group-hover:text-emas transition-colors">
                SIPETA
              </span>
              <span className="text-[10px] text-emas/80 tracking-widest uppercase hidden sm:block font-medium">
                E-Pembinaan Taruna
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <AnimatePresence>
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-white/80 hover:text-white"
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-white/10 rounded-lg border border-white/5"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {isActive && (
                      <motion.span 
                        layoutId="navbar-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-emas rounded-full" 
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </AnimatePresence>
            
            {/* Search Bar Desktop */}
            <form onSubmit={handleSearch} className="ml-2 hidden lg:flex relative">
              <input 
                type="text" 
                placeholder="Cari materi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 xl:w-64 pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-emas focus:ring-1 focus:ring-emas focus:outline-none transition-all"
              />
              <svg className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
            
            {/* User Profile / Login Desktop */}
            <div className="ml-4 pl-4 border-l border-white/10 hidden lg:block">
              {session ? (
                <Link href="/dashboard" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-emas/20 border border-emas/40 flex items-center justify-center group-hover:bg-emas/40 transition-colors">
                    <span className="text-emas font-bold text-sm">{session.name?.charAt(0).toUpperCase()}</span>
                  </div>
                </Link>
              ) : (
                <Link href="/login" className="px-4 py-2 bg-emas/10 text-emas hover:bg-emas hover:text-marun-dark rounded-xl text-sm font-bold transition-colors">
                  Masuk
                </Link>
              )}
            </div>
          </div>

          {/* User Profile Mobile & Mobile toggle */}
          <div className="flex items-center gap-3 md:hidden">
            {session ? (
              <Link href="/dashboard" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-emas/20 border border-emas/40 flex items-center justify-center">
                  <span className="text-emas font-bold text-sm">{session.name?.charAt(0).toUpperCase()}</span>
                </div>
              </Link>
            ) : (
              <Link href="/login" className="text-emas text-sm font-bold">Masuk</Link>
            )}
            
            <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 pb-4 pt-2 border-t border-white/10">
                <form onSubmit={handleSearch} className="px-4 mb-2 relative">
                  <input 
                    type="text" 
                    placeholder="Cari materi, kuis, atau forum..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:border-emas focus:outline-none"
                  />
                  <svg className="w-4 h-4 text-white/40 absolute left-7 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </form>
                {navLinks.map((link, i) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`
                          block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                          ${
                            isActive
                              ? "text-emas bg-white/10 border border-white/5"
                              : "text-white/80 hover:text-white hover:bg-white/5"
                          }
                        `}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      </motion.header>
    </div>
  );
}
