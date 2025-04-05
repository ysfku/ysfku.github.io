---
layout: post
title: "Setting VLAN TP Link WR840N ke STB Openwrt dan Modem Orbit"
date: 2024-12-04
categories: [routers]
image: 
---

Untuk menghubungkan TP-Link WR840N ke STB (dengan OpenWRT) dan Modem Orbit Star 2 menggunakan **Bridge VLAN**, ada beberapa hal yang perlu diketahui terlebih dahulu:

### 1. **Kemampuan Perangkat**

- **TP-Link WR840N**: Secara default firmware TP-Link **tidak mendukung VLAN atau bridge VLAN secara fleksibel**. Kamu mungkin perlu menggunakan firmware custom seperti **OpenWRT** jika mau VLAN tagging/untagging.
- **STB OpenWRT**: Harusnya mendukung VLAN jika OpenWRT terpasang dengan benar.
- **Modem Orbit Star 2**: Biasanya bekerja sebagai router dengan IP NAT. Beberapa model punya mode bridge, tapi umumnya terbatas.

---

### **Skenario Umum: Internet dari Orbit Star 2 dibagi ke STB via TP-Link WR840N (Bridge VLAN)**

Mari kita asumsikan kamu mau:

- Internet dari Orbit Star 2
- Ditransmisikan lewat WR840N (via bridge VLAN)
- Sampai ke STB dengan OpenWRT untuk penggunaan IPTV / Internet langsung

---

### **Langkah-Langkah (Jika WR840N pakai OpenWRT)**

**1. Konfigurasi VLAN di TP-Link WR840N (OpenWRT)**

- Masuk ke LuCI (`192.168.1.1`)
- Masuk ke **Network > Switch**
- Tambahkan VLAN ID sesuai kebutuhan, misalnya:
  - VLAN ID 10 untuk internet
- Tandai port yang menuju ke modem Orbit sebagai `tagged`
- Port ke STB sebagai `untagged`
- CPU port (`eth0` atau `eth1`) sebagai `tagged`

**2. Atur Interface VLAN di TP-Link WR840N**

- Buat interface baru di **Network > Interfaces**
- Interface `eth0.10` (atau sesuai port dan VLAN ID)
- Atur protokolnya ke DHCP client kalau mau dapet IP dari modem Orbit

**3. Atur STB OpenWRT**

- Pastikan port LAN yang dipakai menerima VLAN 10
- Cek interface `eth0.10` atau `eth1.10`
- Bisa set jadi DHCP client juga kalau mau dapat IP dari Orbit

**4. Modem Orbit**

- Pastikan modem Orbit membagikan IP ke perangkat downstream (TP-Link dan STB)
- Atau jika mau full bridge, harus diatur (kalau memungkinkan)

---

### **Kalau WR840N Tidak Pakai OpenWRT**

- VLAN tidak bisa diatur fleksibel.
- Solusinya: Pasang OpenWRT di WR840N (kalau modelnya kompatibel)
  - Cek di: [https://openwrt.org/toh/tp-link/tl-wr840n](https://openwrt.org/toh/tp-link/tl-wr840n)
  - Versi v4, v5, v6, dan v9 umumnya didukung, tergantung chipset

---

Kalau kamu bisa kasih:

- Versi WR840N kamu
- Topologi jaringan yang ingin kamu buat
- Tujuan akhir (misal: akses internet dari STB atau IPTV)

Jika masih bengong atau ingin bertanya. Silahkan ke kolom komentar.