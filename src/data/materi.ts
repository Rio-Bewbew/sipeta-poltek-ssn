export interface MateriModule {
  id: string;
  nomor: number;
  judul: string;
  ringkasan: string;
  poinKunci: string[];
  kutipanPasal: {
    label: string;
    teks: string;
  }[];
  praktikBaik: string[];
  pelanggaran: string[];
  icon: string;
}

export const materiModules: MateriModule[] = [
  {
    id: "nilai-dasar-taruna",
    nomor: 1,
    judul: "Nilai Dasar Taruna & Etos Sandi",
    ringkasan:
      "Setiap Taruna wajib mengetahui dan menjalankan empat nilai dasar: Tri Dharma Perguruan Tinggi, Etos Sandi, Kode Kehormatan Taruna, dan Janji Taruna (Pasal 3). Pembinaan apa pun harus berakar pada nilai-nilai ini.",
    poinKunci: [
      "Empat nilai dasar: Tri Dharma Perguruan Tinggi, Etos Sandi, Kode Kehormatan Taruna, dan Janji Taruna.",
      "9 unsur Etos Sandi: patriotisme, dapat dipercaya, kemampuan menyimpan rahasia, dapat diandalkan, dedikasi, disiplin, tanggung jawab, jiwa korsa, dan mandiri.",
      "Nilai-nilai ini menjadi landasan setiap bentuk pembinaan yang dilakukan.",
      "Pembinaan yang melanggar nilai dasar berarti mengkhianati Etos Sandi itu sendiri.",
    ],
    kutipanPasal: [
      {
        label: "Pasal 3 ayat 3",
        teks: '"Etos Sandi meliputi: patriotisme; dapat dipercaya; kemampuan menyimpan rahasia; dapat diandalkan; dedikasi; disiplin; tanggung jawab; jiwa korsa; dan mandiri."',
      },
    ],
    praktikBaik: [
      "Menjadikan disiplin & tanggung jawab sebagai teladan pribadi.",
      "Menunjukkan patriotisme melalui dedikasi dalam tugas sehari-hari.",
      "Membangun jiwa korsa yang sehat melalui kerja sama tim.",
    ],
    pelanggaran: [
      'Memaksakan "disiplin" lewat kekerasan — mengkhianati Etos Sandi itu sendiri.',
      "Menggunakan jiwa korsa sebagai alasan menutupi pelanggaran.",
      "Mengabaikan tanggung jawab pribadi dengan menyalahkan junior.",
    ],
    icon: "Shield",
  },
  {
    id: "hubungan-antar-taruna",
    nomor: 2,
    judul: "Hubungan Antar Taruna: Asas Kekeluargaan",
    ringkasan:
      "Hubungan antar Taruna adalah kemitraan berasas kekeluargaan dengan prinsip asah, asih, asuh, berpedoman pada etika dan hierarki (Pasal 41). Senioritas bukan alat berkuasa, melainkan tanggung jawab membimbing.",
    poinKunci: [
      "Hubungan antar Taruna didasarkan pada asas kekeluargaan.",
      "Prinsip: asah (saling mengasah kemampuan), asih (saling menyayangi), asuh (saling membimbing).",
      "Tujuan: menciptakan kehidupan taruna yang kreatif, sehat, dinamis, dan harmonis.",
      "Saling membantu meningkatkan kepribadian, intelektual, dan keterampilan.",
      "Junior mematuhi perintah/nasihat senior hanya selama tidak bertentangan dengan norma & peraturan (Pasal 42 ayat 1).",
    ],
    kutipanPasal: [
      {
        label: "Pasal 41 ayat 1 & 2",
        teks: '"Hubungan antar Taruna didasarkan pada asas kekeluargaan ... merupakan kemitraan, saling mendukung dengan asas kekeluargaan dan berprinsip asah, asih dan asuh yang berpedoman pada etika dan hierarki."',
      },
    ],
    praktikBaik: [
      "Senior membantu junior yang punya kendala kegiatan harian.",
      "Membimbing junior dengan sabar dan penuh pengertian.",
      "Menciptakan suasana saling mendukung antar angkatan.",
    ],
    pelanggaran: [
      "Menelantarkan junior yang kesulitan.",
      "Menuntut kepatuhan buta di luar prosedur.",
      "Menggunakan senioritas sebagai alat berkuasa, bukan tanggung jawab.",
    ],
    icon: "Users",
  },
  {
    id: "pembinaan-positif",
    nomor: 3,
    judul: "Pembinaan Positif & Mendidik + Larangan Kekerasan",
    ringkasan:
      "Pembinaan senior ke junior harus positif, mendidik, dan dilakukan dengan cara baik, bijak, terpuji. Kontak fisik & segala tindakan kekerasan dilarang keras (Pasal 43). Ini adalah modul inti.",
    poinKunci: [
      "Keteladanan dalam disiplin, sikap, dan perilaku.",
      "Pembinaan harus positif & mendidik.",
      "Bimbingan & bantuan untuk mengatasi kesulitan junior.",
      "Cara pembinaan: baik, bijak, terpuji, mendidik.",
      "DILARANG melakukan kontak fisik/kekerasan yang merugikan/mencederai sesama Taruna.",
    ],
    kutipanPasal: [
      {
        label: "Pasal 43 ayat 5",
        teks: '"Taruna dilarang melakukan kontak fisik atau tindakan kekerasan yang dapat merugikan/mencederai sesama Taruna."',
      },
    ],
    praktikBaik: [
      "Menegur dengan cara membangun dan konstruktif.",
      "Memberi contoh perilaku yang baik sebagai teladan.",
      "Mengarahkan junior secara konstruktif ketika melakukan kesalahan.",
    ],
    pelanggaran: [
      'Memukul, menampar, atau hukuman fisik apa pun — termasuk yang "demi mendisiplinkan".',
      "Kekerasan dalam bentuk apa pun tidak pernah menjadi metode pembinaan yang sah.",
      "Intimidasi verbal yang merendahkan martabat junior.",
    ],
    icon: "Heart",
  },
  {
    id: "tradisi-taruna",
    nomor: 4,
    judul: "Tradisi Taruna: yang Sehat vs yang Menyimpang",
    ringkasan:
      "Tradisi Taruna menanamkan nilai karakter insan sandi, diselenggarakan terstruktur atau mandiri (Pasal 50). Tradisi sah mendukung capaian pembelajaran; tradisi menyimpang dari norma & peraturan dilarang.",
    poinKunci: [
      "Bentuk tradisi sah: role play (ketua kelas, jaga asrama, komandan regu), penghargaan & evaluasi, seremonial (pembaretan, jajar kehormatan), kelembagaan (mentoring, keluarga asuh).",
      "Kewajiban: menegur/mengoreksi secara konstruktif; mengembangkan tradisi yang sejalan dengan pembelajaran.",
      "Wajib menolak/menghindari perintah senior yang melanggar norma agama/hukum/kesusilaan, lalu melaporkannya untuk mendapat perlindungan hukum.",
      "Larangan: mengembangkan tradisi yang menyimpang dari norma dan peraturan.",
    ],
    kutipanPasal: [
      {
        label: "Pasal 50 ayat 5 huruf a",
        teks: '"Taruna secara perseorangan dan/atau kelompok dilarang: mengembangkan tradisi Taruna yang menyimpang dari norma dan peraturan yang berlaku."',
      },
    ],
    praktikBaik: [
      "Mentoring & keluarga asuh sebagai tradisi konstruktif.",
      "Apresiasi perilaku baik sebagai bentuk penguatan positif.",
      "Mengembangkan tradisi yang mendukung capaian pembelajaran.",
    ],
    pelanggaran: [
      'Hukuman fisik berkedok tradisi (sikap tobat, gaya meroket, push up anyam) — alasan "sudah tradisi" tidak menghapus pelanggaran.',
      "Mempertahankan tradisi menyimpang karena tekanan kelompok.",
      "Mengancam junior yang menolak mengikuti tradisi menyimpang.",
    ],
    icon: "BookOpen",
  },
  {
    id: "prosedur-kepatuhan",
    nomor: 5,
    judul: "Prosedur, Kepatuhan & Pinjam-Meminjam",
    ringkasan:
      "Banyak pelanggaran lahir dari tindakan di luar prosedur. Tindakan administratif & inventaris wajib mengikuti ketentuan dan dikonfirmasi ke Unit/Satuan Pengasuhan.",
    poinKunci: [
      "Dalam pinjam-meminjam: wajib seizin pemilik.",
      "Segera mengembalikan barang yang dipinjam tepat waktu.",
      "Mengikuti ketentuan yang berlaku jika meminjam barang inventaris dinas.",
      "Mengonfirmasikan kronologis kejadian bila barang rusak/hilang.",
      "Dilarang meminjamkan barang bukan haknya atau terkait pelanggaran.",
    ],
    kutipanPasal: [
      {
        label: "Pasal 59 ayat 1",
        teks: '"Taruna dalam hal pinjam meminjam sesuatu, wajib: seizin dari pemilik; segera mengembalikan ...; mengikuti ketentuan yang berlaku jika meminjam barang inventaris dinas; dan mengonfirmasikan kronologis kejadian ..."',
      },
    ],
    praktikBaik: [
      "Mengonfirmasi setiap tindakan administratif (mis. peminjaman kunci) ke Satuan Pengasuhan.",
      "Mengembalikan barang tepat waktu dan dalam kondisi baik.",
      "Mencatat dengan jelas setiap transaksi pinjam-meminjam.",
    ],
    pelanggaran: [
      "Menghapus/mengubah catatan peminjaman tanpa konfirmasi — ilegal meski diperintahkan senior.",
      "Meminjam barang inventaris tanpa izin resmi.",
      "Meminjamkan barang dinas kepada pihak yang tidak berhak.",
    ],
    icon: "ClipboardList",
  },
];
