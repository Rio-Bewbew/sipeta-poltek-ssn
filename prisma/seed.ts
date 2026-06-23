import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding forum data...");

  // Clear existing data
  await prisma.reply.deleteMany();
  await prisma.thread.deleteMany();

  // Thread 1
  const thread1 = await prisma.thread.create({
    data: {
      title: "Bagaimana cara menegur junior yang benar?",
      category: "Metode Pembinaan",
      author: "Taruna Ahmad",
      content:
        "Saya ingin bertanya, bagaimana cara yang tepat untuk menegur junior yang melakukan kesalahan? Terkadang saya bingung antara bersikap tegas tapi tetap mendidik. Apakah ada panduan dari peraturan yang bisa dijadikan acuan?",
      replies: {
        create: [
          {
            author: "Pengasuh Cpt. Budi",
            content:
              'Pertanyaan yang sangat baik. Berdasarkan Pasal 43, pembinaan harus dilakukan dengan cara baik, bijak, terpuji, dan mendidik. Langkah yang tepat: (1) Tegur secara pribadi, bukan di depan umum, (2) Jelaskan kesalahan dengan merujuk aturan, (3) Berikan solusi dan arahan, (4) Catat melalui evaluasi resmi jika diperlukan. Yang penting, hindari kontak fisik dan tindakan yang merendahkan.',
            isPengasuh: true,
            upvotes: 12,
          },
          {
            author: "Taruna Sari",
            content:
              "Terima kasih Pak. Saya juga pernah mengalami situasi serupa. Yang saya lakukan adalah mendekati junior secara personal dan menjelaskan mengapa perilakunya perlu diperbaiki, sambil menunjukkan contoh yang benar.",
            isPengasuh: false,
            upvotes: 5,
          },
        ],
      },
    },
  });
  console.log(`  ✅ Thread 1 created: ${thread1.id}`);

  // Thread 2
  const thread2 = await prisma.thread.create({
    data: {
      title: "Apakah push up anyam termasuk pelanggaran?",
      category: "Larangan Kekerasan",
      author: "Taruna Dimas",
      content:
        'Saya dengar bahwa push up anyam sudah menjadi "tradisi" di beberapa angkatan sebelumnya. Apakah ini masih diperbolehkan? Beberapa senior bilang ini bentuk pembinaan fisik yang wajar.',
      replies: {
        create: [
          {
            author: "Pengasuh Lt. Rina",
            content:
              "Push up anyam TERMASUK pelanggaran. Berdasarkan Pasal 50 ayat 5, Taruna dilarang mengembangkan tradisi yang menyimpang dari norma dan peraturan. Push up anyam, sikap tobat, dan gaya meroket adalah contoh tradisi menyimpang yang dilarang. Tidak ada pembenaran untuk tradisi yang dapat merugikan/mencederai Taruna, seberapapun lamanya tradisi tersebut sudah berlangsung.",
            isPengasuh: true,
            upvotes: 18,
          },
        ],
      },
    },
  });
  console.log(`  ✅ Thread 2 created: ${thread2.id}`);

  // Thread 3
  const thread3 = await prisma.thread.create({
    data: {
      title:
        "Prosedur konfirmasi peminjaman kunci ke Satuan Pengasuhan",
      category: "Prosedur & Izin",
      author: "Taruna Fitri",
      content:
        "Mohon penjelasan mengenai prosedur yang benar untuk meminjam kunci ruangan. Apakah harus selalu dikonfirmasi ke Satuan Pengasuhan? Bagaimana jika dalam keadaan mendesak?",
      replies: {
        create: [
          {
            author: "Pengasuh Cpt. Budi",
            content:
              "Sesuai Pasal 59, setiap peminjaman wajib: (1) seizin pemilik/penanggung jawab, (2) dicatat dengan jelas, (3) dikonfirmasi ke Unit Pengasuhan jika menyangkut inventaris dinas. Dalam keadaan mendesak, tetap harus ada konfirmasi — bisa via telepon terlebih dahulu, kemudian disusul dengan pencatatan tertulis. Jangan pernah menghapus atau mengubah catatan peminjaman tanpa konfirmasi resmi.",
            isPengasuh: true,
            upvotes: 9,
          },
          {
            author: "Taruna Galih",
            content:
              "Tambahan dari pengalaman saya: selalu foto/screenshot catatan peminjaman sebagai bukti. Ini membantu jika ada pertanyaan di kemudian hari.",
            isPengasuh: false,
            upvotes: 7,
          },
        ],
      },
    },
  });
  console.log(`  ✅ Thread 3 created: ${thread3.id}`);

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
