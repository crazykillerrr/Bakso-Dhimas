/**
 * data.js — Bakso Dhimas
 * Source of truth untuk seluruh data menu.
 * Tidak ada logic di sini, hanya data.
 */

"use strict";

const MENUS = [
  {
    id: 1,
    name: "Bakso Biasa",
    category: "Bakso",
    price: 17000,
    description:
      "Bakso andalan kami dengan bola daging sapi jumbo, kuah kaldu sapi pekat, mie kuning, bihun, dan taoge segar. Disajikan dengan kerupuk dan sambal pedas pilihan.",
    longDescription:
      "Bakso Spesial Dhimas adalah menu unggulan yang telah menjadi favorit pelanggan sejak pertama kami buka. Menggunakan daging sapi segar pilihan tanpa campuran tepung berlebih, disajikan dalam kuah kaldu sapi yang dimasak selama 8 jam untuk menghasilkan cita rasa yang kaya dan gurih. Dilengkapi mie kuning kenyal, bihun halus, taoge segar renyah, daun bawang, dan bawang goreng. Tersedia sambal rawit dan kecap manis.",
    image: "assets/images/bakso-biasa.jpeg",
    badge: "Best Seller",
    badgeClass: "bg-danger",
    isPopular: true,
  },
  {
    id: 2,
    name: "Bakso frozen 100pcs",
    category: "Bakso",
    price: 120000,
    description:
      "Bakso pedas ekstrem dengan cabai rawit merah segar, kuah merah membara, dan bola bakso urat yang kenyal. Khusus pecinta pedas sejati!",
    longDescription:
      "Bakso Mercon hadir untuk para pecinta pedas yang tidak mau kompromi. Kuah merahnya berasal dari cabai rawit merah segar yang ditumis dengan bawang putih dan rempah pilihan, menghasilkan rasa pedas yang menggigit namun tetap gurih. Bola bakso uratnya dibuat dari daging sapi giling kasar dengan tekstur kenyal dan penuh serat. Tersedia level pedas: sedang, pedas, dan ekstra pedas. Hati-hati, ini beneran panas!",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    badge: "Pedas 🔥",
    badgeClass: "bg-warning text-dark",
    isPopular: true,
  },
  {
    id: 3,
    name: "Bakso Besar Urat ",
    category: "Bakso",
    price: 22000,
    description:
      "Satu bola bakso urat ukuran ekstra besar dengan tekstur kenyal dan serat daging yang melimpah. Dijamin bikin kenyang!",
    longDescription:
      "Bakso Urat Gajah hadir untuk kamu yang ingin puas dalam satu porsi. Satu bola bakso berukuran sebesar kepalan tangan, dipenuhi serat urat sapi yang dimasak hingga empuk sempurna. Kuah kaldu beningnya memberikan kesegaran yang membalut rasa gurih daging sapi asli. Dilengkapi mie, bihun, dan sayuran segar. Cocok untuk kamu yang aktif dan butuh energi besar.",
    image: "assets/images/bakso-urat.jpeg",
    badge: "Extra Besar",
    badgeClass: "bg-primary",
    isPopular: false,
  },
  {
    id: 4,
    name: "Bakso Telur",
    category: "Bakso",
    price: 19000,
    description:
      "Bakso bulat sempurna dengan kejutan telur ayam di dalamnya. Kuah bening segar dan mie ramen kenyal yang lezat.",
    longDescription:
      "Bakso Telur adalah varian klasik yang selalu digemari berbagai kalangan. Di dalam setiap bola bakso tersembunyi telur ayam utuh yang matang sempurna, memberikan kejutan tekstur dan cita rasa yang kaya. Kuah bening kaldu sapi kami dimasak dengan jahe dan daun bawang untuk menghasilkan aroma yang hangat dan menyegarkan. Disajikan bersama mie ramen, tahu goreng, dan taoge.",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&q=80",
    badge: "Klasik",
    badgeClass: "bg-success",
    isPopular: false,
  },
  {
    id: 5,
    name: "Mie Ayam Bakso",
    category: "Mie Ayam",
    price: 16000,
    description:
      "Mie kuning kenyal dengan topping ayam cincang berbumbu, bakso mini, sawi hijau, dan pangsit goreng renyah.",
    longDescription:
      "Mie Ayam Bakso adalah kombinasi sempurna antara kelezatan mie ayam dan bakso dalam satu mangkuk. Mie kuning kami dibuat fresh setiap hari dari tepung terigu pilihan, disajikan dengan topping ayam cincang yang dibumbui kecap asin, saus tiram, dan rempah-rempah pilihan. Ditambah bakso mini kenyal, sawi hijau segar, dan pangsit goreng yang renyah. Kuah ayam yang gurih disajikan terpisah.",
    image: "assets/images/mie-ayam-bakso.jpeg",
    badge: "Favorit",
    badgeClass: "bg-info text-dark",
    isPopular: true,
  },
  {
    id: 6,
    name: "Mie Ayam",
    category: "Mie Ayam",
    price: 23000,
    description:
      "Inovasi terbaru! Bakso dengan kuah susu creamy gurih dipadu kaldu sapi dan rempah. Lembut, kaya, dan bikin ketagihan.",
    longDescription:
      "Bakso Kuah Susu adalah kreasi unik Bakso Dhimas yang menggabungkan kekayaan susu segar dengan kedalaman kaldu sapi. Kuah creamy berwarna putih kekuningan ini dibuat dari perpaduan susu full cream, kaldu sapi pekat, dan bumbu rempah pilihan. Bola bakso sapi premium dimasak dalam kuah ini hingga meresap sempurna. Cocok untuk kamu yang ingin mencoba sesuatu yang berbeda. Tersedia topping keju parut tambahan.",
    image: "assets/images/mie-ayam.jpeg",
    badge: "Inovasi Baru",
    badgeClass: "bg-secondary",
    isPopular: false,
  },
  {
    id: 7,
    name: "Tahu Bakso",
    category: "Camilan",
    price: 12000,
    description:
      "Tahu putih diisi adonan bakso sapi lembut, digoreng hingga keemasan. Renyah di luar, lembut di dalam. Cocok sebagai camilan.",
    longDescription:
      "Tahu Bakso adalah camilan favorit yang bisa dinikmati sambil menunggu pesanan utama atau sebagai lauk tambahan. Tahu putih segar diisi dengan adonan bakso sapi halus yang berbumbu, kemudian digoreng dalam minyak panas hingga kulitnya berwarna keemasan dan renyah sempurna. Bagian dalam tetap lembut dan juicy. Disajikan dengan cocolan saus kacang dan sambal cabai hijau.",
    image: "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=600&q=80",
    badge: "Camilan",
    badgeClass: "bg-warning text-dark",
    isPopular: false,
  },
  {
    id: 8,
    name: "Pangsit Goreng Bakso",
    category: "Camilan",
    price: 13000,
    description:
      "Pangsit kulit tipis berisi campuran daging sapi dan udang, digoreng krispi. 10 pcs per porsi. Pas banget buat ngemil!",
    longDescription:
      "Pangsit Goreng Bakso kami menggunakan kulit pangsit tipis berkualitas yang diisi dengan campuran daging sapi cincang dan udang segar berbumbu. Digoreng dalam minyak panas hingga berwarna keemasan dan krispi di setiap gigitan. Satu porsi berisi 10 buah pangsit, disajikan dengan saus asam manis spesial dan sambal rawit segar. Tersedia juga versi rebus untuk pilihan yang lebih sehat.",
    image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=600&q=80",
    badge: "10 pcs",
    badgeClass: "bg-success",
    isPopular: true,
  },
  {
    id: 9,
    name: "Es Jeruk Peras",
    category: "Minuman",
    price: 8000,
    description:
      "Jeruk segar diperas langsung, tanpa tambahan perisa buatan. Segar, manis alami, cocok menemani bakso panas.",
    longDescription:
      "Es Jeruk Peras kami dibuat dari buah jeruk segar pilihan yang diperas langsung saat pesanan masuk. Tidak menggunakan konsentrat atau perisa buatan, hanya jeruk asli, gula pasir, dan es batu kristal. Rasa asam manisnya yang alami menjadi pelengkap sempurna untuk bakso panas yang gurih dan pedas. Tersedia versi tanpa es dan tanpa gula untuk kamu yang memiliki kebutuhan diet khusus.",
    image: "https://images.unsplash.com/photo-1534353473418-4cfa787261e4?w=600&q=80",
    badge: "Segar",
    badgeClass: "bg-success",
    isPopular: false,
  },
  {
    id: 10,
    name: "Es Teh Manis",
    category: "Minuman",
    price: 5000,
    description:
      "Teh celup premium diseduh panas, didinginkan dengan es batu kristal. Manis pas, segar, dan murah meriah.",
    longDescription:
      "Es Teh Manis adalah minuman sederhana yang tak pernah gagal menemani makan bakso. Kami menggunakan teh hitam premium yang diseduh panas dengan air mendidih sempurna, kemudian dimaniskan dengan gula pasir asli dan didinginkan dengan es batu kristal jernih. Rasa tehnya pekat dan harum, tidak pahit berlebihan. Harga yang bersahabat membuat minuman ini menjadi pilihan utama para pelanggan setia kami.",
    image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=600&q=80",
    badge: "Murah",
    badgeClass: "bg-primary",
    isPopular: false,
  },
];

// Nomor WhatsApp (ganti dengan nomor asli)
const WA_NUMBER = "6281234567890";
const BRAND_NAME = "Bakso Dhimas";
