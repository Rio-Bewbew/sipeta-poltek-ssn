export interface CaseOption {
  id: string;
  teks: string;
  benar: boolean;
}

export interface CaseStudy {
  id: string;
  nomor: number;
  judul: string;
  situasi: string;
  pilihan: CaseOption[];
  umpanBalikBenar: string;
  pelajaranUtama: string;
  rujukanPasal: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "pemukulan-disiplin",
    nomor: 1,
    judul: 'Pemukulan saat "menegakkan disiplin"',
    situasi:
      "Senior memukul kepala junior karena dianggap tak mengindahkan perintah komandan polisi taruna; junior pendarahan & dibawa ke poliklinik.",
    pilihan: [
      {
        id: "a",
        teks: "Memukul boleh demi kedisiplinan",
        benar: false,
      },
      {
        id: "b",
        teks: "Menegur lisan tegas + catat lewat evaluasi resmi",
        benar: true,
      },
      {
        id: "c",
        teks: "Menyuruh push up sampai lelah",
        benar: false,
      },
    ],
    umpanBalikBenar:
      "Pembinaan harus baik, bijak, mendidik; kontak fisik dilarang.",
    pelajaranUtama:
      "Tidak ada situasi yang membenarkan kekerasan fisik.",
    rujukanPasal: "Pasal 43 ayat 4 & 5",
  },
  {
    id: "perintah-hapus-peminjaman",
    nomor: 2,
    judul: "Perintah menghapus peminjaman kunci",
    situasi:
      "Senior menyuruh junior menghapus catatan peminjaman kunci tanpa konfirmasi ke Satuan Pengasuhan.",
    pilihan: [
      {
        id: "a",
        teks: "Langsung menghapus karena perintah senior",
        benar: false,
      },
      {
        id: "b",
        teks: "Menolak sopan + konfirmasi prosedur ke Unit Pengasuhan",
        benar: true,
      },
      {
        id: "c",
        teks: "Menghapus diam-diam",
        benar: false,
      },
    ],
    umpanBalikBenar:
      "Junior patuh hanya bila perintah tak melanggar aturan; tindakan administratif harus sesuai prosedur.",
    pelajaranUtama:
      "Perintah yang melanggar aturan tidak wajib dipatuhi.",
    rujukanPasal: "Pasal 42 ayat 1; Pasal 59",
  },
  {
    id: "tradisi-turun-temurun",
    nomor: 3,
    judul: '"Sudah tradisi turun-temurun"',
    situasi:
      "Senior menjalankan tradisi lama: sikap tobat, gaya meroket, push up anyam ke junior.",
    pilihan: [
      {
        id: "a",
        teks: "Lanjutkan karena sudah tradisi",
        benar: false,
      },
      {
        id: "b",
        teks: "Hentikan; ganti tradisi konstruktif (mentoring/keluarga asuh)",
        benar: true,
      },
      {
        id: "c",
        teks: "Lakukan versi lebih ringan",
        benar: false,
      },
    ],
    umpanBalikBenar:
      "Tradisi menyimpang dari norma & peraturan dilarang, sekalipun turun-temurun.",
    pelajaranUtama:
      '"Tradisi" bukan pembenaran pelanggaran.',
    rujukanPasal: "Pasal 50 ayat 4 & 5",
  },
  {
    id: "kegiatan-luar-waktu",
    nomor: 4,
    judul: "Kegiatan di luar ketentuan waktu",
    situasi:
      'Senior mengumpulkan junior sebelum jam bangun pagi untuk membahas "ketidaksesuaian".',
    pilihan: [
      {
        id: "a",
        teks: "Boleh asal niat membina",
        benar: false,
      },
      {
        id: "b",
        teks: "Tidak — kegiatan pengasuhan harus sesuai ketentuan waktu & jalur resmi",
        benar: true,
      },
      {
        id: "c",
        teks: "Boleh kalau sebentar",
        benar: false,
      },
    ],
    umpanBalikBenar:
      "Pembinaan mengikuti ketentuan & cara terpuji, bukan di luar jadwal sepihak.",
    pelajaranUtama:
      "Niat baik tidak menghalalkan cara yang melanggar prosedur.",
    rujukanPasal: "Pasal 43 ayat 4; Pasal 6–7",
  },
];
