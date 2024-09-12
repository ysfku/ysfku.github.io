---
layout: post
title:  "Install Duino Coin in Termux"
categories: Linux
tags:  Mining
author: Muhammad Yusuf
---

* content
{:toc}

Dengan doino coin, kita bisa menambah cuan secara recehan. Akan tetapi kalau kita rutin mengerjakannya akan membuah hasil yang kita inginkan.

## Tahap install

Update termux

```
apt-get update && apt-get upgrade -y
```

Install wget, proot, git

```
apt-get install wget proot git -y
```

Ambil data ke folder cd ~

```
git clone https://github.com/MFDGaming/ubuntu-in-termux.git
```

Pergi ke script folder

```
cd ubuntu-in-termux
```

Berikan izin eksekusi

```
chmod +x ubuntu.sh
```

Install ubuntu

```
./ubuntu.sh -y
```

Jalankan ubuntu

```
./startubuntu.sh
```

bahan pelengkap doino coin

```
sudo apt install python3 python3-dev python3-pip
```

download file doino coin

```
wget https://github.com/revoxhere/duino-coin/archive/refs/tags/4.1.zip
```

ekstrak file

```
unzip 4.1.zip
```

masuk folder doino coin

```
cd duino-coin-4.1
```

jalankan miner

```
python3 PC_Miner.py
```

Ini di lakukan jika tidak bisa berjalan maka di perlukan pelengkap di bawah ini.


py-cpuinfo

```
python3 -m pip install py-cpuinfo
```
colorama

```
python3 -m pip install colorama
```

requests

```
python3 -m pip install requests
```

pyserial

```
python3 -m pip install pyserial
```

pypresence

```
python3 -m pip install pypresence
```

psutil

```
python3 -m pip install psutil
```

Begitulah cara installasi Doino Coin di Termux