# Formulir Data DO — D745 Tomohon

Aplikasi web satu berkas untuk mengisi data DO/SPK, mengirimnya ke Google Sheet,
dan mencetak sembilan lembar berkas DO dalam ukuran A4 margin 0,5 cm.
Bisa dipasang di Android, iPhone, dan komputer, serta tetap jalan tanpa sinyal.

## Isi repo

| Berkas | Gunanya |
|---|---|
| `index.html` | Aplikasinya sendiri — tab Formulir, Cetak, Riwayat, Pengaturan |
| `manifest.webmanifest` | Nama, ikon, dan warna aplikasi saat dipasang |
| `sw.js` | Service worker — aplikasi tetap bisa dibuka tanpa sinyal |
| `icons/` | Ikon 192, 512, maskable, apple-touch, favicon |
| `netlify.toml` | Pengaturan Netlify (header + fallback halaman) |
| `_headers`, `_redirects` | Cadangan pengaturan yang sama |
| `PANDUAN-NETLIFY.md` | Panduan lengkap: pasang di HP, sambung ke Sheet, cetak |

## Menerbitkan lewat GitHub → Netlify

1. Unggah **isi** folder ini ke akar repo (bukan foldernya, supaya `index.html`
   berada di akar).
2. Di Netlify: **Add new project → Import an existing project → GitHub**, pilih repo ini.
3. Build command dikosongkan, **Publish directory** diisi titik: `.`
4. Deploy.

Setelah itu setiap perubahan yang didorong ke branch utama diterbitkan sendiri
oleh Netlify — tidak perlu seret-lepas folder lagi.

Kalau situsnya sudah ada di Netlify dan hanya mau dipindah sumbernya:
**Site configuration → Build & deploy → Link repository**.

## Kalau `index.html` diperbarui

Buka `sw.js`, naikkan nomor versinya:

```js
const VERSI = 'form-do-v4';   // ganti jadi form-do-v5, v6, dan seterusnya
```

Tanpa itu, HP yang sudah memasang aplikasi akan tetap memakai versi lama yang
tersimpan di perangkat.

## Yang perlu disetel sekali di aplikasi

Buka tab **Pengaturan**:

- **URL Web App (Apps Script)** — tempel URL `/exec` agar tombol *Kirim ke Sheet*
  berfungsi. Langkahnya ada di `PANDUAN-NETLIFY.md`.
- **Sumber stok kendaraan** — sudah terisi spreadsheet Stok; pastikan spreadsheet
  itu dibagikan "Siapa saja yang memiliki link ▸ Pelihat".

Pengaturan tersimpan per perangkat. Untuk memindahkannya ke HP lain pakai
**Unduh cadangan (.json)** lalu **Muat cadangan**.

## Lembar cetak

Checklist, Check Sheet PDI, Surat Kuasa, Pengalihan Dana, Beda Data STNK/BPKB,
Beda Tanda Tangan KTP, Surat Pernyataan Agen, Internal Memo Beda Nama, dan
Pengembalian Lebih Bayar. Semuanya tanpa kop surat dan otomatis mengecil sedikit
bila isinya hampir melebihi satu halaman.
