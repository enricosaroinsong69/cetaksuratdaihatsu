# Formulir Data DO — D745 Tomohon
## Cara menaruh di Netlify lalu memasangnya di HP

Isi folder ini sudah siap pakai. Tidak ada yang perlu dibangun atau di-compile.

---

## 1. Unggah ke Netlify (cara tercepat, tanpa akun pun bisa dicoba)

1. Buka **https://app.netlify.com/drop** di komputer.
2. **Seret folder `formulir-do-netlify`** (folder-nya, bukan isinya satu per satu) ke kotak besar di halaman itu.
   - Kalau yang Anda punya masih berupa `.zip`, ekstrak dulu, lalu seret foldernya.
3. Tunggu beberapa detik. Netlify memberi alamat acak seperti
   `https://sparkly-dusk-12ab34.netlify.app` — alamat itu sudah langsung bisa dibuka dari HP.
4. Masuk/daftar Netlify (gratis, bisa pakai akun Google) supaya situsnya tersimpan permanen.
   Tanpa login, situs percobaan akan hilang setelah beberapa jam.

### Mengganti nama alamat
Di Netlify: **Site configuration → Site details → Change site name**.
Misalnya diubah jadi `formulir-do-d745`, alamatnya menjadi
`https://formulir-do-d745.netlify.app`.

---

## 2. Pasang di HP

Buka alamat Netlify tadi di HP, lalu:

**Android (Chrome)**
Buka tab Pengaturan di aplikasi → tombol **Pasang di perangkat ini**.
Kalau tombolnya tidak muncul: menu **⋮** di Chrome → **Instal aplikasi**.

**iPhone / iPad (wajib Safari, bukan Chrome)**
Tombol **Bagikan** di bawah layar → gulir → **Add to Home Screen** → **Add**.

**Komputer (Chrome/Edge)**
Ikon pasang di ujung kanan kolom alamat.

Setelah terpasang, aplikasi punya ikonnya sendiri dan terbuka layar penuh tanpa
kolom alamat. Isian, pengaturan, riwayat, dan daftar stok tersimpan di perangkat,
jadi aplikasi tetap jalan saat tidak ada sinyal.

---

## 3. Memperbarui aplikasi nanti

Kalau suatu saat `index.html` diganti dengan versi baru:

1. Buka `sw.js`, ubah baris `const VERSI = 'form-do-v3';` menjadi `'form-do-v4'`
   (naikkan angkanya). Langkah ini yang membuat HP mengambil versi baru,
   bukan versi lama yang tersimpan.
2. Seret ulang folder ke Netlify — atau, kalau situsnya sudah tersimpan di akun:
   **Deploys → Drag and drop your site folder here**.
3. Di HP, tutup aplikasi lalu buka lagi. Bisa juga tekan **Periksa pembaruan**
   di tab Pengaturan.

---

## 4. Isi folder

| Berkas | Gunanya |
|---|---|
| `index.html` | Aplikasinya sendiri — formulir, cetak, riwayat, pengaturan |
| `manifest.webmanifest` | Nama, ikon, dan warna aplikasi saat dipasang |
| `sw.js` | Membuat aplikasi tetap bisa dibuka tanpa sinyal |
| `icons/` | Ikon aplikasi (192, 512, maskable, apple-touch, favicon) |
| `netlify.toml` | Pengaturan Netlify |
| `_headers`, `_redirects` | Cadangan pengaturan yang sama, untuk jaga-jaga |

---

## 5. Yang masih perlu disetel sekali di aplikasi

Setelah aplikasi terbuka, masuk tab **Pengaturan**:

- **URL Web App (Apps Script)** — tempel URL `/exec` dari `Kode-AppsScript.gs`
  supaya tombol *Kirim ke Sheet* berfungsi. Langkahnya ada di `PANDUAN.md`.
- **Sumber stok kendaraan** — sudah terisi spreadsheet Stok; pastikan spreadsheet
  itu dibagikan "Siapa saja yang memiliki link ▸ Pelihat" agar daftar type, warna,
  dan nomor rangka bisa terbaca.

Pengaturan ini tersimpan per perangkat, jadi perlu diisi sekali di tiap HP —
atau pakai **Unduh cadangan (.json)** lalu **Muat cadangan** di HP berikutnya.

---

## Catatan

- Netlify menyajikan situs lewat HTTPS. Itu memang syarat agar aplikasi bisa
  dipasang dan bisa jalan offline — membuka berkas lewat `file://` tidak bisa.
- Paket ini tidak memuat data pelanggan apa pun. Semua isian tersimpan di
  perangkat masing-masing dan di Google Sheet Anda, bukan di Netlify.
- Alamat `.netlify.app` bisa dibuka siapa saja yang tahu alamatnya. Kalau perlu
  dibatasi, Netlify menyediakan proteksi kata sandi di paket berbayar; pilihan
  gratisnya: pakai nama situs yang sulit ditebak.
