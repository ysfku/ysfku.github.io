---
layout: post
title: "Panduan Konfigurasi VLAN OpenWRT Xiaomi Mi 4A"
date: 2025-04-06
categories: [openwrt]
---

Dalam jaringan komputer, **Virtual LAN (VLAN), Wide Area Network (WAN), dan Local Area Network (LAN)** memiliki peran penting dalam meningkatkan efisiensi dan keamanan jaringan. Jika Anda menggunakan **Xiaomi Mi 4A yang menjalankan OpenWRT**, memahami pengaturan ketiga aspek ini akan membantu dalam mengoptimalkan konektivitas dan kontrol jaringan.

Artikel ini akan membahas konfigurasi **VLAN, WAN, dan LAN** pada OpenWRT Xiaomi Mi 4A secara lengkap, mulai dari teori hingga langkah praktis.

## **1. Mengenal OpenWRT dan Xiaomi Mi 4A**

### **Apa Itu OpenWRT?**

OpenWRT adalah sistem operasi berbasis Linux yang dirancang untuk perangkat jaringan seperti router. Dengan OpenWRT, pengguna mendapatkan kontrol penuh atas konfigurasi dan optimalisasi jaringan.

### **Spesifikasi Xiaomi Mi 4A**

Xiaomi Mi 4A adalah router yang cukup populer dengan dukungan OpenWRT. Spesifikasinya meliputi:

- **CPU:** MediaTek MT7628DA
- **RAM:** 64MB DDR2
- **ROM:** 16MB SPI Flash
- **Port:** 2x LAN, 1x WAN
- **Wi-Fi:** Dual-band 2.4GHz & 5GHz

## **2. Pengertian VLAN, WAN, dan LAN**

### **VLAN (Virtual LAN)**

VLAN memungkinkan pengelompokan perangkat secara virtual dalam satu jaringan tanpa harus terhubung secara fisik, membantu mengisolasi lalu lintas dan meningkatkan keamanan.

### **WAN (Wide Area Network)**

WAN digunakan untuk menghubungkan jaringan lokal ke internet atau ke jaringan yang lebih luas.

### **LAN (Local Area Network)**

LAN berfungsi menghubungkan perangkat dalam area terbatas seperti rumah atau kantor untuk komunikasi internal yang cepat.

## **3. Persiapan Konfigurasi OpenWRT**

Sebelum mulai konfigurasi VLAN, WAN, dan LAN, pastikan langkah-langkah berikut telah dilakukan:

### **Instalasi OpenWRT**

1. **Unduh firmware OpenWRT** yang sesuai dengan Xiaomi Mi 4A dari situs resmi.
2. **Flash firmware** menggunakan metode TFTP atau Web GUI.
3. Pastikan router sudah berjalan dengan OpenWRT sebelum lanjut ke konfigurasi.

## **4. Konfigurasi VLAN pada OpenWRT**

### **Langkah-langkah konfigurasi VLAN**

1. **Masuk ke LuCI Web Interface**
   - Buka browser dan akses **192.168.1.1**
   - Masukkan kredensial login (default: root, tanpa password)

2. **Masuk ke menu Network > Switch**
3. **Tambahkan VLAN baru**
   - Setel VLAN ID sesuai kebutuhan, misalnya VLAN 10 untuk guest network.
   - Pilih port yang akan digunakan dan atur **Tagged/Untagged**.
   - Simpan dan terapkan perubahan.

4. **Cek konfigurasi VLAN dengan perintah**:

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}swconfig dev switch0 show{% endhighlight %}
</div>

## **5. Konfigurasi WAN pada OpenWRT**

### **Menghubungkan Router ke Internet**

1. Masuk ke **Network > Interfaces**.
2. Edit interface **WAN**.
3. Pilih protokol yang sesuai:
   - **PPPoE** untuk koneksi Fiber/DSL.
   - **DHCP Client** jika router terhubung ke modem utama.
4. Masukkan username & password dari ISP (jika menggunakan PPPoE).
5. Simpan dan terapkan.

## **6. Konfigurasi LAN pada OpenWRT**

### **Mengatur IP Address LAN**

1. Masuk ke **Network > Interfaces**.
2. Edit interface **LAN**.
3. Tetapkan IP statis, misalnya **192.168.10.1**.
4. Pastikan **DHCP Server** aktif agar perangkat lain mendapatkan IP otomatis.
5. Simpan dan terapkan.

## **7. Meningkatkan Keamanan dan Performa Jaringan**

Beberapa langkah tambahan untuk meningkatkan keamanan dan performa:
- **Aktifkan firewall OpenWRT**.
- **Gunakan WPA3 untuk keamanan Wi-Fi**.
- **Batasi bandwidth dengan QoS atau SQM**.
- **Monitor jaringan dengan OpenWRT status page**.

## **Catatan**

Dengan konfigurasi **VLAN, WAN, dan LAN** yang tepat pada OpenWRT Xiaomi Mi 4A, Anda bisa mendapatkan jaringan yang lebih aman, efisien, dan cepat. OpenWRT memberikan fleksibilitas tinggi untuk optimalisasi jaringan sesuai kebutuhan.
