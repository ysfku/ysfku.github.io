---
layout: post
title: "Setting Vlan OpenWRT"
date: 2024-11-02 05:46:00 +0800
categories: [openwrt]
---

Virtual Local Area Network (VLAN) adalah fitur jaringan yang memungkinkan Anda untuk memisahkan jaringan fisik menjadi beberapa segmen logis. Dengan menggunakan VLAN, Anda dapat meningkatkan keamanan dan manajemen jaringan Anda. Dalam artikel ini, kita akan membahas cara mengatur VLAN di OpenWRT, termasuk langkah-langkah rinci dan manfaat dari penggunaan VLAN.

### Apa Itu VLAN?

VLAN memungkinkan Anda untuk membagi satu jaringan fisik menjadi beberapa jaringan logis yang lebih kecil. Ini berguna untuk memisahkan berbagai jenis lalu lintas jaringan, meningkatkan keamanan, dan mengoptimalkan kinerja jaringan. Misalnya, Anda dapat memisahkan jaringan untuk perangkat karyawan dan tamu atau membagi jaringan untuk departemen yang berbeda dalam perusahaan Anda.

### Manfaat Menggunakan VLAN

1. **Keamanan**: Dengan memisahkan jaringan, Anda dapat mencegah akses tidak sah dan mengurangi risiko serangan.
1. **Manajemen Jaringan**: VLAN memudahkan pengelolaan jaringan yang besar dengan membaginya menjadi segmen yang lebih kecil.
1. **Kinerja**: Memisahkan lalu lintas jaringan yang berbeda dapat meningkatkan kinerja keseluruhan jaringan.

### Persiapan

Sebelum Anda mulai, pastikan Anda memiliki akses ke antarmuka web OpenWRT (LuCI) dan perangkat yang mendukung VLAN. Juga, pastikan Anda telah mencadangkan konfigurasi router Anda untuk menghindari kehilangan data jika terjadi kesalahan.

### Langkah-langkah Setting VLAN di OpenWRT

#### 1. Masuk ke Antarmuka LuCI

Buka browser web Anda dan masukkan alamat IP router Anda, biasanya `192.168.1.1`. Login menggunakan kredensial Anda.

#### 2. Navigasi ke Network Interfaces

Setelah masuk, pergi ke **Network** > **Interfaces**. Di sini, Anda akan melihat antarmuka jaringan yang ada.

#### 3. Tambahkan VLAN Baru

Untuk menambahkan VLAN baru, klik tombol **Add new interface**. Berikan nama untuk VLAN baru Anda, misalnya `VLAN10`, dan pilih opsi untuk membuat antarmuka baru dari `eth0.10` (di mana `10` adalah ID VLAN Anda).

#### 4. Konfigurasi VLAN

Setelah menambahkan antarmuka baru, Anda perlu mengkonfigurasi pengaturan dasar seperti alamat IP dan subnet mask. Anda juga bisa menyesuaikan pengaturan DHCP jika diperlukan.

#### 5. Menambahkan VLAN ke Switch

Navigasi ke **Network** > **Switch**. Di sini, Anda akan mengonfigurasi VLAN pada switch internal router. Tambahkan entri VLAN baru dengan ID VLAN yang sesuai dan atur port yang relevan ke dalam VLAN tersebut.

Contoh pengaturan:

- VLAN ID: 10
- Port: eth0 (untagged)
- CPU (eth0.10): tagged

#### 6. Simpan dan Terapkan Pengaturan

Setelah selesai mengkonfigurasi, klik **Save & Apply** untuk menerapkan perubahan.

### Menguji Konfigurasi VLAN

Pastikan konfigurasi VLAN Anda berfungsi dengan benar dengan menghubungkan perangkat ke port yang telah Anda atur ke VLAN yang baru dan periksa konektivitasnya.

### Troubleshooting

Jika terjadi masalah, berikut beberapa langkah yang dapat Anda coba:

1. **Periksa ID VLAN**: Pastikan ID VLAN yang digunakan konsisten di seluruh pengaturan.
1. **Port VLAN**: Pastikan port switch telah dikonfigurasi dengan benar.
1. **Restart Router**: Coba restart router Anda untuk memastikan semua perubahan telah diterapkan.

### Tips Tambahan

1. **Dokumentasi**: Selalu dokumentasikan konfigurasi VLAN Anda untuk referensi di masa depan.
1. **Monitoring**: Gunakan alat monitoring jaringan untuk memantau performa dan keamanan VLAN Anda.
1. **Pembaruan Firmware**: Pastikan firmware OpenWRT Anda selalu diperbarui untuk mendapatkan fitur dan keamanan terbaru.

Mengatur VLAN di OpenWRT dapat meningkatkan keamanan, manajemen, dan kinerja jaringan Anda. Dengan mengikuti panduan ini, Anda dapat dengan mudah mengkonfigurasi VLAN pada router OpenWRT Anda dan memanfaatkan manfaat dari segmentasi jaringan. Jangan lupa untuk selalu memonitor dan menyesuaikan pengaturan VLAN Anda sesuai dengan kebutuhan jaringan Anda.