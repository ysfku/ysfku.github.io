---
title: Cara Install OpenClash di OpenWrt
tags: [openclash]
keywords: openclash, tutorial
summary: "Langkah-langkah install openclash untuk openwrt."
sidebar: openclash
permalink: openclash.html
folder: openclash
---

## Pengenalan

OpenClash adalah salah satu alat terbaik untuk mengelola proxy di router OpenWrt. Dengan OpenClash, Anda dapat mengatur trafik internet melalui berbagai jenis proxy seperti Shadowsocks, V2Ray, dan lain-lain. Artikel ini akan membahas secara mendetail cara mengatur setting global di OpenClash untuk memastikan jaringan Anda berjalan dengan optimal.

## Mengapa Menggunakan OpenClash?

OpenClash menyediakan fleksibilitas dan kontrol yang lebih baik atas bagaimana trafik internet Anda dikelola. Berikut adalah beberapa manfaat menggunakan OpenClash:
- **Keamanan**: Melindungi data Anda dari pengintai dan peretas.
- **Kecepatan**: Mengoptimalkan kecepatan internet dengan memilih server proxy tercepat.
- **Fleksibilitas**: Mendukung berbagai jenis proxy dan aturan routing yang dapat disesuaikan.

## Persiapan

Sebelum memulai pengaturan, pastikan Anda sudah menginstal OpenClash di router OpenWrt Anda. Jika belum, berikut adalah langkah-langkah dasar untuk instalasinya:

### 1. Menambahkan Custom Feeds

Tambahkan custom feeds ke OpenWrt untuk mengunduh OpenClash:
```sh
opkg update
opkg add https://github.com/helmiau/openwrt-config/raw/main/others/openclash-for-openwrt-setup.md
```

### 2. Menginstal Paket-paket yang Diperlukan

Instal paket-paket yang diperlukan untuk OpenClash:

```sh
opkg install iptables dnsmasq-full coreutils coreutils-nohup bash curl ca-certificates ipset ip-full iptables-mod-tproxy iptables-mod-extra libcap libcap-bin ruby ruby-yaml kmod-tun luci-base iptables jsonfilter luci-compat
```

### 3. Mengunduh OpenClash

Unduh dan instal OpenClash:

```sh
opkg install openclash
```

## Mengakses OpenClash

Setelah instalasi selesai, buka antarmuka web OpenWrt Anda dan navigasikan ke **Services > OpenClash**. Di sini, Anda akan melihat berbagai tab dan opsi untuk mengkonfigurasi OpenClash.

Dengan mengikuti langkah-langkah di atas, Anda seharusnya dapat menginstal dan mengkonfigurasi OpenClash di OpenWrt dengan mudah. Jika Anda mengalami kesulitan atau memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami melalui kontak kami di navigasi.

{% include links.html %}
