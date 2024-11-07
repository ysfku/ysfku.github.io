---
title: Setting Global di OpenClash pada OpenWrt
tags: [openclash]
keywords: global setting
summary: "Tahapan setting global pada openclash."
sidebar: openclash
permalink: global-setting-openclash.html
folder: openclash
---

OpenClash adalah salah satu plugin yang sangat berguna untuk OpenWRT, memungkinkan pengguna untuk mengelola koneksi internet mereka dengan lebih fleksibel dan aman. Dalam panduan ini, kita akan membahas langkah-langkah pengaturan umum OpenClash, mulai dari instalasi hingga konfigurasi lanjutan.

## Konfigurasi Dasar

Setelah instalasi, langkah berikutnya adalah konfigurasi dasar OpenClash:

1. **Akses LuCI**: Buka antarmuka LuCI melalui browser Anda.
1. **Navigasi ke OpenClash**: Pergi ke `Services` > `OpenClash`.
1. **Mulai OpenClash**: Klik `Enable` untuk memulai OpenClash.

## Pengaturan Modem/WAN

### Menentukan Interface Modem/WAN

Untuk menentukan interface-name modem/WAN, ikuti langkah berikut:

1. **Buka LuCI**: Akses `Network` > `Interfaces`.
2. **Identifikasi Interface**: Cari interface yang sesuai dengan modem/WAN Anda. Misalnya:

- WAN A: `eth1`
- WAN B: `wlan0`
- WAN C: `eth2`

### Konfigurasi Multi-WAN

Jika Anda menggunakan lebih dari satu modem/WAN, Anda dapat mengkonfigurasi Multi-WAN:

1. **Tambah Interface**: Tambahkan interface baru di `Network` > `Interfaces`.
1. **Konfigurasi Load Balancing**: Atur load balancing untuk mendistribusikan trafik internet.

## Pengaturan Proxy

### Menambahkan Proxy Provider

OpenClash mendukung berbagai jenis proxy seperti Shadowsocks, Vmess, Trojan, dan lain-lain. Berikut cara menambahkannya:

1. **Buka OpenClash**: Pergi ke `Services` > `OpenClash` > `Proxy Provider`.
2. **Tambah Proxy**: Klik `Add` dan masukkan detail proxy Anda, seperti:

```yaml
- name: "shadowsocks"
  type: ss
  server: aaa.bbb.ccc.ddd
  port: 34963
  cipher: chacha20-ietf-poly1305
  password: passwordss
  udp: true
```

### Mengatur Rules

Atur rules untuk menentukan bagaimana trafik internet dialihkan melalui proxy:

1. **Buka Rules**: Pergi ke `Services` > `OpenClash` > `Rules`.
1. **Tambah Rule**: Klik `Add` dan masukkan aturan yang diinginkan, seperti:

```yaml
- DOMAIN-SUFFIX,google.com,Proxy
- DOMAIN-SUFFIX,facebook.com,Direct
```

## Pengaturan DNS

### Mode DNS

OpenClash menyediakan beberapa mode DNS, seperti Fake-IP dan Redir-Host. Pilih mode yang sesuai dengan kebutuhan Anda:

1. **Fake-IP Mode**: Mengembalikan alamat IP palsu untuk mempercepat respon DNS.
1. **Redir-Host Mode**: Menggunakan DNS asli untuk kompatibilitas yang lebih baik.

### Konfigurasi DNS

Untuk mengkonfigurasi DNS, ikuti langkah berikut:

1. **Buka DNS Settings**: Pergi ke `Services` > `OpenClash` > `DNS Settings`.
1. **Atur DNS**: Masukkan server DNS yang diinginkan, seperti:

```yaml
  nameserver:
  - 8.8.8.8
  - 8.8.4.4
```

## Pengaturan Lanjutan

### GEOIP Update
Untuk memastikan OpenClash dapat memfilter trafik berdasarkan lokasi geografis, lakukan update GEOIP:

1. **Buka GEOIP Update**: Pergi ke `Services` > `OpenClash` > `GEOIP Update`.
1. **Update GEOIP**: Klik `Update` untuk memperbarui database GEOIP.

### Manage Config
Anda dapat mengimpor dan mengelola konfigurasi OpenClash dengan mudah:

1. **Import Config**: Pergi ke `Services` > `OpenClash` > `Manage Config`.
1. **Tambah Config**: Klik `Import` dan pilih file konfigurasi yang diinginkan.

## Troubleshooting

### Masalah Umum
Jika Anda mengalami masalah, berikut beberapa langkah troubleshooting:

1. **Cek Log**: Periksa log OpenClash di `Services` > `OpenClash` > `Log`.
1. **Restart OpenClash**: Coba restart OpenClash untuk memperbaiki masalah sementara.

### Dukungan Komunitas
Jika Anda membutuhkan bantuan lebih lanjut, bergabunglah dengan komunitas OpenClash di menu navigasi kami bagian other.

{% include links.html %}
