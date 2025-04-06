---
layout: post
title: "Setting MacVLAN STB OpenWRT"
date: 2024-11-01 05:46:00 +0800
categories: [openwrt]
---

Berikut adalah langkah-langkah untuk melakukan *setup Macvlan di STB dengan OpenWRT ke modem Orbit Star 2* agar STB bisa mendapatkan IP langsung dari modem (bukan NAT oleh router utama), cocok untuk kebutuhan bypass atau bridge IP publik:

---

### Syarat dan Persiapan

- STB sudah di-flash OpenWRT.
- Akses ke LuCI (Web UI) atau SSH di OpenWRT.
- Modem Orbit Star 2 mendukung IP publik langsung via DHCP.
- Sambungan LAN dari modem Orbit ke STB.

---

### Cek Nama Interface

Login ke STB via SSH dan jalankan:

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}ip link show{% endhighlight %}
</div>

Identifikasi interface yang terhubung ke modem (biasanya `eth0`).


### Install Paket macvlan (kalau belum ada)

Jalankan:

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}opkg update
opkg install kmod-macvlan ip-full{% endhighlight %}
</div>

### Buat Interface Macvlan

Edit `/etc/config/network`:

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}config device
    option name 'macvlan0'
    option type 'macvlan'
    option ifname 'eth0'
    option macvlan_mode 'bridge'

config interface 'wan_macvlan'
    option proto 'dhcp'
    option device 'macvlan0'{% endhighlight %}
</div>

**Catatan:**

- `macvlan_mode` bisa juga pakai `private` kalau bridge tidak bekerja.
- Pastikan `eth0` tidak digunakan sebagai WAN biasa lagi.

### Nonaktifkan WAN Lama (Opsional)

Di `/etc/config/network`, cari:

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}config interface 'wan'{% endhighlight %}
</div>

dan ubah:

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}option auto '0'{% endhighlight %}
</div>

Atau hapus saja config-nya jika tidak dipakai lagi.

### Restart Jaringan

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}/etc/init.d/network restart{% endhighlight %}
</div>

### Cek IP

Cek apakah `macvlan0` dapat IP dari modem Orbit:

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}ip addr show macvlan0{% endhighlight %}
</div>

Kalau dapat IP lokal Orbit atau IP publik (jika dial langsung), berarti berhasil.

### Tambahan (opsional untuk routing/policy)

Jika ingin route khusus ke IP tertentu via macvlan, bisa buat rule dan route table terpisah.

Dibawah ini juga **langkah-langkah lengkap setup Macvlan via LuCI (Web UI) OpenWRT** agar STB kamu bisa dapat IP langsung dari modem Orbit Star 2:

## **Langkah Setup Macvlan via LuCI**

### Akses LuCI

- Buka browser ke: *http://192.168.1.1* (alamat OpenWRT STB kamu)
- Login sebagai **root**

### Install Paket yang Dibutuhkan

(Langkah ini tetap perlu dilakukan via SSH sekali saja)

1. Login ke STB via SSH:

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}ssh root@192.168.1.1{% endhighlight %}
</div>

2. Jalankan:

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}opkg update
opkg install kmod-macvlan ip-full{% endhighlight %}
</div>

### **3. Buat Perangkat (Device) Macvlan**

1. Masuk ke **Network > Devices**
2. Klik **"Add device configuration"**
3. Isi:
   - **Name**: `macvlan0`
   - **Type**: `Macvlan`
   - **Base device**: `eth0` *(atau yang mengarah ke modem Orbit, bisa juga `eth1` tergantung STB-mu)*
   - **Mode**: `bridge` *(bisa coba `private` jika bridge gagal)*

4. Klik **Save**

### Buat Interface Baru untuk DHCP

1. Masuk ke **Network > Interfaces**
2. Klik **"Add new interface..."**
3. Isi:

   - **Name**: `wan_macvlan`
   - **Protocol**: `DHCP client`
   - **Device**: pilih `macvlan0`

4. Klik **Create interface**
5. Klik **Save & Apply**

### Nonaktifkan WAN Lama (Opsional)

1. Di menu **Network > Interfaces**
2. Klik **Edit** pada interface `wan`
3. Ubah **"Bring up on boot"** jadi **unchecked (nonaktif)**
4. Klik **Save & Apply**

### Cek IP

1. Setelah konfigurasi disimpan, klik **Status > Overview**
2. Scroll ke bagian **Interfaces**
3. Lihat apakah `wan_macvlan` sudah mendapat IP dari modem Orbit (biasanya `192.168.8.x` atau IP publik jika Orbit memberikan langsung)

### Tambahan Tips

- Kalau IP belum muncul, coba **reboot STB** atau cabut-colok kabel LAN sebentar lalu cek ulang.
- Pastikan **modem Orbit tidak memfilter MAC address**. Kadang perlu spoof MAC address STB ke MAC HP/laptop yang sebelumnya dipakai.


Kalau kamu sebutkan jenis STB-nya, saya bisa sesuaikan panduan dan cek nama interface default-nya. Silahkan isikan saja di kolom komentar.
