# Bale Keluarga Homestay Sembalun - Landing Page & Panel Admin

<p align="center">
  <img src="images/logo.png" alt="Bale Keluarga Homestay Logo" width="180">
  <br>
  <em>Harmoni Kemegahan Rinjani & Kehangatan Keluarga Tradisional Sasak</em>
</p>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frodiman-2024%2Fbalesembalun)

Landing page premium, responsif, dan siap pakai untuk **Bale Keluarga Homestay Sembalun**, Lombok Timur, lengkap dengan **Panel Admin Interaktif** untuk kustomisasi seluruh konten, harga, teks, dan foto secara langsung.

🌐 **Website Resmi**: **[https://www.penginapansembalun.my.id/](https://www.penginapansembalun.my.id/)**

---

## ⚡ Deploy Instan ke Vercel

Klik tombol di bawah ini untuk deploy otomatis ke akun Vercel Anda:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frodiman-2024%2Fbalesembalun)

Atau buka tautan berikut:
👉 **[https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frodiman-2024%2Fbalesembalun](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frodiman-2024%2Fbalesembalun)**

---

## 🌟 Fitur Utama Landing Page
1. **Hero Section dengan Visual Panorama**: Pemandangan matahari terbit lereng Gunung Rinjani dan arsitektur tradisional Sasak.
2. **Quick Availability Check**: Formulir pencarian cepat di bagian atas yang langsung terhubung ke kalkulator reservasi.
3. **Profil Lengkap Homestay**: Filosofi "Bale" (Rumah Keluarga), keunggulan lokasi 1.150 mdpl, dan komitmen kehangatan ramah tamu.
4. **Katalog Kamar Interaktif**:
   - *Deluxe Rinjani View Room*, *Family Suite Bale*, dan *Standard Cozy Room*.
   - Pop-up modal fasilitas detail untuk setiap kamar.
5. **Fasilitas Unggulan**: Water heater 24 jam (esensial di hawa dingin Sembalun), Wi-Fi fiber kencang, area api unggun & BBQ, kebun stroberi petik sendiri, dapur bersama, dan parkir luas.
6. **Paket Wisata Lokal**: Sunrise Bukit Pergasingan, Petik Stroberi & Tur Desa Adat Beleq, serta Malam Api Unggun.
7. **Kalkulator Biaya & Generator WhatsApp**: Menghitung biaya kamar, jumlah malam, dan layanan tambahan secara real-time, lalu membuat teks pesan WhatsApp rapi untuk reservasi instan tanpa komisi OTA.
8. **Galeri Foto**: Filter kategori *Semua*, *Kamar*, *Pemandangan*, dan *Aktivitas*.
9. **FAQ & Rute Lokasi**: Petunjuk arah dari Bandara Lombok (BIL), Mataram, dan Jalur Pendakian Rinjani.

---

## 🛠️ Fitur Panel Admin (`admin.html`)
Panel Admin mandiri yang memungkinkan pemilik/pengelola mengedit:
- 📊 **Dashboard Ringkasan**: Statistik kamar aktif, fasilitas, paket wisata, dan galeri foto.
- 🏞️ **Hero & Banner**: Slogan rating, judul utama, kata highlight emas, deskripsi, dan foto background hero (pilih foto koleksi atau unggah foto sendiri dari komputer).
- 🏨 **Profil & Kontak**: Nama brand, subtitle, nomor WhatsApp reservasi, nomor telepon, alamat, kisah tentang kami, dan jam check-in/out.
- 🛏️ **Kelola Kamar**: Tambah kamar baru, edit nama kamar, harga per malam, kapasitas tamu, tipe tempat tidur, fasilitas termasuk, dan foto kamar.
- 🌿 **Fasilitas**: Tambah, edit judul & deskripsi fasilitas, serta hapus fasilitas.
- 🧭 **Paket Wisata**: Tambah, ubah harga tiket/paket trip sunrise Pergasingan, petik stroberi, atau BBQ.
- 🖼️ **Galeri Foto**: Tambah foto baru, upload file komputer, atur kategori dan layout lebar.
- ⭐ **Ulasan Tamu**: Tambah atau edit ulasan tamu yang menginap.
- ❓ **FAQ**: Tambah dan ubah pertanyaan serta jawaban yang sering diajukan.
- 💾 **Backup & Pemulihan**: Unduh cadangan file JSON, impor data, atau reset ke pengaturan awal pabrik.

---

## 🚀 Cara Menjalankan Secara Lokal

### 1. Membuka Landing Page & Panel Admin:
Pastikan server lokal berjalan (default: port 8080):
- **Landing Page**: [http://localhost:8080/](http://localhost:8080/)
- **Panel Admin**: [http://localhost:8080/admin.html](http://localhost:8080/admin.html)

*(Terdapat juga tombol akses transparan di samping teks hak cipta pada footer).*

### 2. Menjalankan Server PowerShell:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

---

## 📁 Struktur Direktori
```
d:/landingpage/
├── images/             # Foto panorama Sembalun, kamar, dan aktivitas
├── index.html          # Landing Page utama & SEO Schema.org
├── styles.css          # Desain sistem & responsivitas landing page
├── script.js           # Engine kalkulator & hidrasi data dinamis
├── admin.html          # Tampilan antarmuka Panel Admin
├── admin.css           # Styling dashboard Panel Admin modern
├── admin.js            # Engine manajemen data, upload foto, & sinkronisasi
├── data.json           # Sumber data terpusat homestay
├── server.ps1          # Web server lokal dengan REST API data
├── vercel.json         # Konfigurasi deployment Vercel
├── PRD.md              # Dokumen spesifikasi kebutuhan produk (PRD)
└── README.md           # Panduan penggunaan proyek
```
