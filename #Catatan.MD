# Catatan Belajar

---

Untuk menyimpan pertanyaan pas pertemuan nanti kalo ingat \

### Pertanyaan

- [ ] Untuk penulisan file itu better auth.route.ts atau authRoute.ts, kalo di dunia industri itu biasanya gimana ya mas?

### Progres Dah

1. Mengikuti yang ada di module
2. Membuat code code yang tidak ada di module, mungkin mentornya lupa (it's okey, time to explore)
3. Kerjain Tugas #1

### Tugas Ke #2

Tugas

- menambahkan auth ke beberapa endpoint dibawah
  - create counter
  - update counter
  - delete counter
  - skip queue
  - next queue
  - reset queue
  - create admin
  - update admin
  - delete admin
  - get all admin
  - get detail admin
- tugas opsional di day 3 menjadi wajib (queue) dengan sedikit tambahan API baru
  - /claim, Membuat entri antrean baru untuk pelanggan. Sistem secara otomatis memilih loket dengan nomor antrean terkecil untuk memastikan distribusi yang seimbang. Mengembalikan nomor antrean yang diberikan, nama loket, dan ID loket.
    - Auth: no
    - Response: Detail yang diambil termasuk nomor antrean dan informasi loket (counter).
  - /release, Membatalkan antrean yang telah diambil namun belum diproses. Mengubah status antrean menjadi 'released'.
    - Auth: no
    - Response: confirmation message
  - /curent, Mengambil status terkini dari semua loket aktif, termasuk nomor antrean saat ini, kapasitas antrean maksimal, dan status aktif. Ini berguna untuk menampilkan informasi antrean kepada pelanggan
    - Auth: no
    - Response: Daftar semua loket aktif dengan informasi antrean terkininya
  - /next/:counter_id, Memanggil pelanggan berikutnya dalam antrean untuk loket tertentu. Mengubah status antrean terlama yang telah diambil menjadi 'called'.
    - Auth: yes
    - Payload: `counter_id`
    - Response: Detail queue yang dipanggil, termasuk nomor queue dan informasi loket
  - /skip/:counter_id, Melewati antrean yang sedang dipanggil untuk suatu loket (menandai sebagai 'skipped') dan secara otomatis mencoba memanggil pelanggan berikutnya dalam antrean
    - Auth: yes
    - Payload:  `counter_id`
    - Response: Pesan konfirmasi berserta detail antrean berikutnya yang dipanggil (jika tersedia)
  - /reset, ulang sistem antrean baik untuk loket tertentu atau untuk semua loket aktif. Mengubah semua entri antrean aktif ke status 'reset' dan mengembalikan antrean saat ini di loket ke 0
    - Auth: yes
    - Payload:  `counter_id`
    - Repsonse: Pesan konfirmasi
