# Kumpulan - kumpulan latihan typescript dan fungsi

## Cara menjalankan proyek

### Method dalam Promise
```javascript 
.then(callback) → // Dipanggil jika Promise berhasil (fulfilled)

.catch(callback) → // Dipanggil jika Promise gagal (rejected).

.finally(callback) → // Dipanggil setelah Promise selesai (baik sukses atau gagal).

Promise.all([...]) → // Menjalankan banyak Promise secara paralel dan menunggu semuanya selesai.

Promise.race([...]) → // Menjalankan banyak Promise dan mengambil yang selesai lebih dulu.

Promise.allSettled([...]) → // Menjalankan banyak Promise dan mengembalikan hasil dari semuanya, baik yang berhasil atau gagal```