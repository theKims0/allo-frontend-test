# SpaceX Rocket Explorer - Allo Bank Frontend Technical Assignment

Repositori ini berisi solusi untuk Frontend Technical Assignment di Allo Bank. Aplikasi ini dibuat menggunakan Vue 3, TypeScript, dan Tailwind CSS untuk menampilkan katalog roket SpaceX dengan memanfaatkan Launch Library 2 API dari The Space Devs.

Aplikasi terdiri dari dua halaman utama:
1. Halaman daftar roket (Rocket List Screen)
2. Halaman detail spesifikasi roket (Rocket Detail Screen)

---

## Pembahasan Soal dan Implementasi

Berikut adalah penjelasan teknis mengenai bagaimana setiap kebutuhan fungsional dan non-fungsional diimplementasikan dalam aplikasi ini.

### 1. Functional Requirements

- **Daftar Roket**
  Aplikasi memuat seluruh data roket SpaceX dari API dan menampilkannya dalam bentuk grid responsif. Setiap kartu roket memuat gambar roket, nama lengkap (`full_name`), serta ringkasan deskripsi (`description`).

- **Fitur Filter / Pencarian**
  Pengguna dapat memfilter roket berdasarkan nama secara langsung (real-time). Input pencarian ini terhubung dengan computed property reaktif di Vue, sehingga daftar roket langsung ter-filter tanpa perlu memuat ulang halaman. Jika kata kunci tidak cocok dengan roket manapun, aplikasi menampilkan pesan bahwa roket tidak ditemukan beserta tombol untuk mereset pencarian.

- **Menambah Roket Baru (Client-side Persistence)**
  Karena API yang disediakan bersifat read-only, penambahan roket baru diimplementasikan pada sisi klien. Pengguna dapat membuka form modal untuk menambahkan roket dengan mengisi nama dan deskripsi (wajib), serta beberapa data opsional seperti URL gambar, biaya peluncuran, kode negara, dan tanggal peluncuran pertama.
  Data roket baru ini disimpan ke dalam state global dan dipersistensikan ke `localStorage` browser. Dengan cara ini, roket yang baru ditambahkan tetap muncul di daftar dan bisa dibuka detailnya meskipun halaman di-refresh.

- **Halaman Detail Roket**
  Saat salah satu kartu roket diklik, aplikasi berpindah ke rute `/rocket/:id`. Halaman ini menampilkan detail lengkap meliputi gambar roket, nama roket, deskripsi panjang, perkiraan biaya peluncuran (*cost per launch*), negara pembuat, dan tanggal penerbangan perdana (*maiden flight*). Disediakan juga tombol navigasi untuk kembali ke daftar utama.

- **Penanganan Data yang Tidak Lengkap (Missing Data)**
  Beberapa roket dari API tidak memiliki nilai untuk atribut tertentu seperti `launch_cost`, `maiden_flight`, atau `image_url`. Aplikasi menangani kondisi ini dengan:
  - Menyediakan tampilan placeholder khusus jika gambar roket bernilai null atau gagal dimuat oleh browser.
  - Memformat biaya peluncuran menjadi format mata uang dolar jika ada, atau menampilkan teks "Data tidak tersedia" jika nilainya kosong.
  - Menampilkan tanda strip ("-") jika negara atau tanggal penerbangan perdana tidak tercantum pada data API.
  - Menampilkan teks fallback deskripsi jika roket belum memiliki deskripsi resmi.

---

### 2. Penggunaan Launch Library 2 API

Sesuai panduan tugas, aplikasi ini terhubung ke Launch Library 2 API versi 2.2.0:

- **Host Development:**
  Menggunakan `https://lldev.thespacedevs.com/2.2.0/` sesuai anjuran, karena host pengujian ini memiliki batasan rate limit yang jauh lebih longgar dibanding host produksi yang membatasi 15 request per jam untuk pengguna anonim.

- **Endpoint List Roket:**
  `GET https://lldev.thespacedevs.com/2.2.0/config/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20`
  - Parameter `mode=detailed` digunakan agar respon API menyertakan deskripsi dan spesifikasi lengkap roket.
  - Parameter `limit=20` digunakan agar ke-13 roket SpaceX dapat dimuat sekaligus dalam satu panggilan API tanpa harus melakukan pagination tambahan.

- **Endpoint Detail Roket:**
  `GET https://lldev.thespacedevs.com/2.2.0/config/launcher/:id/`
  - Endpoint ini dipanggil ketika halaman detail dibuka langsung melalui URL.
  - Aplikasi juga memiliki logika fallback: jika ID yang dibuka berawalan `local_` (roket buatan pengguna), sistem akan langsung membacanya dari penyimpanan lokal tanpa memanggil server SpaceX untuk mencegah terjadinya respon error 404.

- **Alasan Pemilihan Versi 2.2.0:**
  Versi 2.2.0 dipertahankan sesuai instruksi karena memiliki struktur field yang konsisten dengan kebutuhan tugas (`image_url`, `full_name`, `description`, `launch_cost`, `manufacturer.country_code`, dan `maiden_flight`).

---

### 3. Non-Functional Requirements

- **Routing:**
  Menggunakan Vue Router 4 dengan konfigurasi rute eksplisit:
  - `/` untuk halaman list roket.
  - `/rocket/:id` untuk halaman detail roket.
  - Redirect otomatis ke `/` jika pengguna mengakses URL yang tidak terdaftar.
  - Mengatur `scrollBehavior` agar posisi layar selalu kembali ke paling atas saat berpindah rute.

- **State Management:**
  Menggunakan pola Composable Vue 3 (`useRockets`) yang menyediakan reactive state global untuk daftar roket, roket yang sedang dipilih, status loading, dan pesan error. Composable ini mempermudah pemisahan logika bisnis dari komponen tampilan.

- **Lifecycle Hooks:**
  - `onMounted` digunakan untuk memicu pemanggilan data roket saat komponen dimuat pertama kali.
  - `watch` digunakan pada halaman detail untuk memantau perubahan parameter ID di rute dan memuat ulang data jika pengguna berpindah ke roket lain.

- **Component-Based Architecture:**
  Kode disusun secara modular agar mudah dibaca dan dipelihara:
  - `Header.vue`: Komponen header navigasi atas.
  - `RocketCard.vue`: Komponen kartu roket dengan penanganan fallback gambar.
  - `AddRocketModal.vue`: Modal form tambah roket lengkap dengan validasi.
  - `Spinner.vue`: Komponen indikator loading.
  - `index.vue` dan `[id].vue`: Halaman list dan detail.

- **Tiga Kondisi Tampilan (UI States):**
  - **Loading:** Menampilkan indikator loading saat aplikasi sedang menunggu respon dari server.
  - **Fail / Error & Retry:** Jika koneksi terputus atau server mengembalikan error, aplikasi menampilkan pesan kesalahan yang ramah dan menyediakan tombol "Coba Lagi" (Retry) agar pengguna dapat melakukan request ulang tanpa me-refresh seluruh browser.
  - **Success:** Menampilkan data roket atau tampilan kosong yang rapi jika filter tidak menemukan hasil.

---
