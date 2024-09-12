---
layout: post
title:  "Install Mining Verus ARM"
categories: Linux
tags:  Mining
author: Muhammad Yusuf
---

* content
{:toc}

![Ccminer Verus](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfdrIFY4c0FJHoy-IijdQ88inENufgm6kui8s3SiS2HVwv_By-xnfIE00&s=10)

Bacalah secara menyeluruh sebelum menggunakan

## Informasi Umum Penting

Panduan ini ditujukan untuk distribusi Linux berbasis Debian.

Jika Anda menggunakan jenis distribusi yang berbeda (misalnya berbasis RPM, seperti CentOS), Anda perlu menginstal dependensi menggunakan prosedur yang sesuai dengan distribusi spesifik Anda.

Ada 3 cabang aktif di repo ccminer github:

- `ARM` (untuk chip ARM 64bit dengan intrinsik AES).
- `Verus2.2` (untuk chip ARM 64bit dengan intrinsik AES).
- `Verus2.2gpu` (GPUs).

Ganti ARM pada baris **git clone** di bawah dengan nama cabang di atas yang ingin Anda gunakan.

## Prosedur:

Instal dependensi (khusus untuk distribusi berbasis Debian).

```
sudo apt-get install libcurl4-openssl-dev libssl-dev libjansson-dev automake autotools-dev build-essential git
```

Untuk kompilasi GPU-miner diperlukan sumber tambahan (Tidak diperlukan untuk CPU atau ARM):

```
wget http://developer.download.nvidia.com/compute/cuda/10.2/Prod/local_installers/cuda_10.2.89_440.33.01_linux.run
sudo sh cuda_10.2.89_440.33.01_linux.run
```

Unduh sumbernya dan kompilasi:

```
git clone --single-branch -b ARM https://github.com/monkins1010/ccminer.git
cd ccminer
chmod +x build.sh
chmod +x configure.sh
chmod +x autogen.sh
./build.sh
```

Buat perintah di luar dengan:

```
nano autorun.sh
```

Dan akhirnya memulai penambang (Ubah kumpulan, alamat & nama pekerja sesuai keinginan Anda:

```
/root/ccminer-ARM/ccminer -a verus -o stratum+tcp://pool.verus.io:9999 -u ewallet-verus-anda.namaperangkat -p x -t 4
```

Simpan dengan `CTRL` + `X` lalu `Enter`.

buat `crontab -e` lalu pilih `nano`

```
@reboot bash /root/ccminer/autorun.sh > /root/ccminer/miner.log 2>&1
```

Simpan dengan `CTRL` + `X` lalu `Enter`.

Sekarang anda hanya melakukan perintah `reboot`.