export interface QuizOption {
  id: string;
  teks: string;
}

export interface QuizQuestion {
  id: number;
  pertanyaan: string;
  pilihan: QuizOption[];
  jawabanBenar: string;
  penjelasan: string;
  rujukanPasal: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    pertanyaan: "Hubungan antar Taruna didasarkan pada asas...",
    pilihan: [
      { id: "a", teks: "Senioritas" },
      { id: "b", teks: "Kekeluargaan" },
      { id: "c", teks: "Komando" },
      { id: "d", teks: "Persaingan" },
    ],
    jawabanBenar: "b",
    penjelasan:
      "Hubungan antar Taruna didasarkan pada asas kekeluargaan, bukan senioritas atau komando.",
    rujukanPasal: "Pasal 41 ayat 1",
  },
  {
    id: 2,
    pertanyaan: "Prinsip kemitraan antar Taruna...",
    pilihan: [
      { id: "a", teks: "Asah, asih, asuh" },
      { id: "b", teks: "Cepat, tepat, hemat" },
      { id: "c", teks: "Disiplin tanpa kompromi" },
      { id: "d", teks: "Senang-susah bersama" },
    ],
    jawabanBenar: "a",
    penjelasan:
      "Prinsip kemitraan antar Taruna adalah asah (mengasah kemampuan), asih (menyayangi), dan asuh (membimbing).",
    rujukanPasal: "Pasal 41 ayat 2",
  },
  {
    id: 3,
    pertanyaan: "Pembinaan senior ke junior harus bersifat...",
    pilihan: [
      { id: "a", teks: "Tegas dengan hukuman fisik" },
      { id: "b", teks: "Positif & mendidik" },
      { id: "c", teks: "Sesuai tradisi lama" },
      { id: "d", teks: "Rahasia" },
    ],
    jawabanBenar: "b",
    penjelasan:
      "Pembinaan harus bersifat positif dan mendidik, bukan dengan hukuman fisik atau mengikuti tradisi lama yang menyimpang.",
    rujukanPasal: "Pasal 43 ayat 2",
  },
  {
    id: 4,
    pertanyaan: "Yang DILARANG dalam pembinaan...",
    pilihan: [
      { id: "a", teks: "Keteladanan" },
      { id: "b", teks: "Membimbing" },
      { id: "c", teks: "Kontak fisik/kekerasan" },
      { id: "d", teks: "Menasihati" },
    ],
    jawabanBenar: "c",
    penjelasan:
      "Kontak fisik dan tindakan kekerasan yang dapat merugikan/mencederai sesama Taruna dilarang keras.",
    rujukanPasal: "Pasal 43 ayat 5",
  },
  {
    id: 5,
    pertanyaan: "Junior wajib mematuhi perintah senior...",
    pilihan: [
      { id: "a", teks: "Selalu tanpa kecuali" },
      { id: "b", teks: "Selama tak bertentangan dengan norma & peraturan" },
      { id: "c", teks: "Hanya jika seangkatan" },
      { id: "d", teks: "Jika diberi imbalan" },
    ],
    jawabanBenar: "b",
    penjelasan:
      "Junior wajib mematuhi perintah senior selama perintah tersebut tidak bertentangan dengan norma dan peraturan yang berlaku.",
    rujukanPasal: "Pasal 42 ayat 1",
  },
  {
    id: 6,
    pertanyaan: "Tradisi menyimpang dari norma & peraturan...",
    pilihan: [
      { id: "a", teks: "Boleh jika turun-temurun" },
      { id: "b", teks: "Boleh jika ringan" },
      { id: "c", teks: "Dilarang" },
      { id: "d", teks: "Wajib dilestarikan" },
    ],
    jawabanBenar: "c",
    penjelasan:
      "Tradisi yang menyimpang dari norma dan peraturan dilarang, tidak peduli sudah berapa lama tradisi tersebut berlangsung.",
    rujukanPasal: "Pasal 50 ayat 5 huruf a",
  },
  {
    id: 7,
    pertanyaan: "Contoh tradisi sah/konstruktif...",
    pilihan: [
      { id: "a", teks: "Push up anyam" },
      { id: "b", teks: "Mentoring & keluarga asuh" },
      { id: "c", teks: "Sikap tobat" },
      { id: "d", teks: "Gaya meroket" },
    ],
    jawabanBenar: "b",
    penjelasan:
      "Mentoring dan keluarga asuh adalah contoh tradisi sah yang mendukung capaian pembelajaran dan pengembangan karakter.",
    rujukanPasal: "Pasal 50 ayat 3 huruf d",
  },
  {
    id: 8,
    pertanyaan:
      "Jika menerima perintah senior yang melanggar norma/hukum...",
    pilihan: [
      { id: "a", teks: "Menjalankannya" },
      { id: "b", teks: "Menolak/menghindari lalu melaporkannya" },
      { id: "c", teks: "Diam saja" },
      { id: "d", teks: "Sebar ke medsos" },
    ],
    jawabanBenar: "b",
    penjelasan:
      "Taruna wajib menolak/menghindari perintah yang melanggar norma agama, hukum, atau kesusilaan, kemudian melaporkannya untuk mendapat perlindungan hukum.",
    rujukanPasal: "Pasal 50 ayat 4 huruf g",
  },
  {
    id: 9,
    pertanyaan:
      "Pinjam-meminjam barang inventaris, Taruna wajib...",
    pilihan: [
      { id: "a", teks: "Ikuti ketentuan & konfirmasi kronologi" },
      { id: "b", teks: "Simpan diam-diam" },
      { id: "c", teks: "Hapus catatan" },
      { id: "d", teks: "Pinjamkan ke siapa saja" },
    ],
    jawabanBenar: "a",
    penjelasan:
      "Taruna wajib mengikuti ketentuan yang berlaku dan mengonfirmasikan kronologis kejadian jika barang rusak atau hilang.",
    rujukanPasal: "Pasal 59 ayat 1",
  },
  {
    id: 10,
    pertanyaan: "Salah satu dari 9 unsur Etos Sandi...",
    pilihan: [
      { id: "a", teks: "Ambisius" },
      { id: "b", teks: "Tanggung jawab" },
      { id: "c", teks: "Kompetitif" },
      { id: "d", teks: "Dominan" },
    ],
    jawabanBenar: "b",
    penjelasan:
      "Tanggung jawab adalah salah satu dari 9 unsur Etos Sandi, bersama patriotisme, dapat dipercaya, kemampuan menyimpan rahasia, dapat diandalkan, dedikasi, disiplin, jiwa korsa, dan mandiri.",
    rujukanPasal: "Pasal 3 ayat 3",
  },
];
