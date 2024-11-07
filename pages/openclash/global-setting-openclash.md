---
title: Setting Global di OpenClash pada OpenWrt
tags: [openclash]
keywords: global setting
summary: "Tahapan setting global pada openclash."
sidebar: openclash
permalink: global-setting-openclash.html
folder: openclash
---


## Setting Global di OpenClash

Bagian ini akan menjelaskan langkah-langkah rinci untuk mengatur setting global di OpenClash.

### 1. Mengatur Global Mode

Pada tab **Global Settings**, Anda akan menemukan opsi untuk mode global. Mode ini menentukan bagaimana trafik internet dialirkan melalui proxy. Ada beberapa mode yang bisa dipilih, namun yang paling umum digunakan adalah:

- **Mode Redir-Host**: Mode ini cocok untuk kebanyakan pengguna karena menawarkan kompatibilitas yang tinggi dan performa yang baik.
- **Mode TUN**: Mode ini digunakan jika Anda memerlukan fitur tambahan seperti UDP relay. Mode ini dapat membantu dalam situasi di mana protokol tertentu membutuhkan dukungan UDP.

### 2. Konfigurasi Proxy Group

Setelah menentukan mode global, langkah berikutnya adalah mengkonfigurasi Proxy Group. Proxy Group memungkinkan Anda mengelola beberapa server proxy secara bersamaan, yang sangat berguna untuk failover dan load balancing.

- **Menambahkan Proxy**: Klik `Add` di bagian `Proxys` untuk menambahkan server proxy baru. Anda bisa mengimpor URL SS/SSR/VMESS/TROJAN atau mengisi manual informasi seperti alamat server, port, dan jenis proxy.
  
```yaml
- name: "Proxy 1"
  type: ss
  server: server1.example.com
  port: 8388
  cipher: chacha20-ietf-poly1305
  password: your_password
```

- **Membuat Proxy Group**: Buat grup proxy untuk mengelola beberapa proxy secara bersamaan. Pilih jenis grup seperti `Fallback`, `Load Balancing`, atau `URL-Test`.

```yaml
proxy-groups:
- name: "Proxy Group"
  type: select
  proxies:
  - "Proxy 1"
  - "Proxy 2"
```

### 3. Mengatur Rules

Pada tab **Rules**, Anda dapat menetapkan aturan untuk mengarahkan trafik tertentu melalui proxy yang berbeda. Aturan ini dapat didasarkan pada berbagai kriteria seperti nama domain, alamat IP, atau lokasi geografis.

- **Domain Suffix**: Aturan ini digunakan untuk mengarahkan trafik berdasarkan nama domain. Misalnya, Anda bisa mengarahkan semua trafik ke *.google.com melalui server proxy tertentu.

```yaml
rules:
- DOMAIN-SUFFIX,google.com,Proxy Group
```

- **GeoIP**: Aturan ini mengarahkan trafik berdasarkan lokasi geografis IP. Misalnya, Anda bisa mengarahkan semua trafik dari China melalui server proxy tertentu.

```yaml
rules:
- GEOIP,CN,Proxy Group
```

## Mengoptimalkan Pengaturan
Selain pengaturan dasar di atas, ada beberapa opsi tambahan yang dapat Anda konfigurasikan untuk mengoptimalkan performa OpenClash:

- **Optimasi DNS**: Pastikan Anda menggunakan server DNS yang cepat dan aman. Anda bisa mengatur server DNS di tab **DNS Settings**.

```yaml
dns:
  enable: true
  listen: 0.0.0.0:53
  enhanced-mode: redir-host
  nameserver:
  - 1.1.1.1
  - 8.8.8.8
```

- **Cache Optimasi**: Aktifkan cache untuk mengurangi beban pada server DNS dan meningkatkan kecepatan akses.
  
```yaml
dns:
  cache: true
```

## Troubleshooting

Jika Anda mengalami masalah saat menggunakan OpenClash, berikut adalah beberapa langkah pemecahan masalah yang dapat Anda coba:

- **Cek Log OpenClash**: Buka tab **Logs** di OpenClash untuk melihat log dan mencari tahu apa yang salah.
- **Verifikasi Konfigurasi**: Pastikan semua pengaturan dan informasi server proxy sudah benar dan sesuai.
- **Periksa Koneksi Internet**: Pastikan koneksi internet Anda stabil dan tidak ada masalah dengan ISP Anda.

Dengan mengikuti panduan ini, Anda seharusnya dapat mengatur setting global di OpenClash dengan mudah dan memastikan bahwa jaringan Anda berjalan dengan optimal. OpenClash adalah alat yang sangat kuat dan fleksibel, dan dengan konfigurasi yang tepat, Anda dapat meningkatkan keamanan, kecepatan, dan stabilitas koneksi internet Anda.

Jika Anda memiliki pertanyaan lebih lanjut atau mengalami kesulitan, jangan ragu untuk menghubungi kami melalui menu navigasi. Kami siap membantu Anda untuk memastikan pengalaman internet yang lebih baik.

{% include links.html %}
