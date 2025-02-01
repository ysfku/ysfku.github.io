---
layout: post
title: "Daftar Command di Linux yang Wajib Diketahui"
date: 2025-02-01
categories: [linux]
image: /assets/images/command-linux.jpg
---

Linux adalah sistem operasi yang sangat populer di kalangan pengembang, administrator sistem, dan pengguna teknologi. Salah satu alasan utama popularitasnya adalah kekuatan command-line interface (CLI) yang memungkinkan pengguna untuk melakukan berbagai tugas dengan cepat dan efisien. Dalam postingan ini, kita akan membahas daftar command Linux yang wajib diketahui, lengkap dengan penjelasan dan contoh penggunaannya.

## 1. ls - List Directory Contents

Perintah **ls** digunakan untuk menampilkan daftar file dan direktori dalam direktori saat ini.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
ls
ls -l  # Menampilkan daftar dalam format panjang
ls -a  # Menampilkan file tersembunyi{% endhighlight %}
</div>

## 2. cd - Change Directory

Perintah **cd** digunakan untuk berpindah direktori.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
cd /home/user/Documents  # Pindah ke direktori Documents
cd ..  # Kembali ke direktori parent
cd ~   # Kembali ke direktori home
{% endhighlight %}
</div>

## 3. pwd - Print Working Directory

Perintah **pwd** menampilkan direktori saat ini.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
pwd
{% endhighlight %}
</div>

## 4. mkdir - Make Directory

Perintah **mkdir** digunakan untuk membuat direktori baru.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
mkdir new_folder  # Membuat direktori baru bernama new_folder
mkdir -p parent/child  # Membuat direktori beserta parent-nya
{% endhighlight %}
</div>

## 5. rm - Remove

Perintah **rm** digunakan untuk menghapus file atau direktori.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
rm file.txt  # Menghapus file
rm -r folder  # Menghapus direktori secara rekursif
{% endhighlight %}
</div>

## 6. cp - Copy

Perintah **cp** digunakan untuk menyalin file atau direktori.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
cp file.txt /backup/  # Menyalin file ke direktori backup
cp -r folder /backup/  # Menyalin direktori secara rekursif
{% endhighlight %}
</div>

## 7. mv - Move

Perintah **mv** digunakan untuk memindahkan atau mengganti nama file/direktori.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
mv file.txt /backup/  # Memindahkan file ke direktori backup
mv old_name.txt new_name.txt  # Mengganti nama file
{% endhighlight %}
</div>

## 8. touch - Create Empty File

Perintah **touch** digunakan untuk membuat file kosong atau memperbarui timestamp file.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
touch new_file.txt  # Membuat file baru
{% endhighlight %}
</div>

## 9. cat - Concatenate and Display File Content

Perintah **cat** digunakan untuk menampilkan isi file.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
cat file.txt  # Menampilkan isi file
cat file1.txt file2.txt > combined.txt  # Menggabungkan dua file
{% endhighlight %}
</div>

## 10. more dan less - Paging File Content

Perintah **more** dan **less** digunakan untuk menampilkan isi file per halaman.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
more long_file.txt  # Menampilkan isi file per halaman
less long_file.txt  # Menampilkan isi file dengan navigasi yang lebih fleksibel
{% endhighlight %}
</div>

## 11. grep - Global Regular Expression Print

Perintah **grep** digunakan untuk mencari teks dalam file.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
grep "keyword" file.txt  # Mencari kata "keyword" dalam file
grep -i "keyword" file.txt  # Mencari tanpa memperhatikan huruf besar/kecil
{% endhighlight %}
</div>

## 12. find - Search for Files

Perintah **find** digunakan untuk mencari file atau direktori berdasarkan kriteria tertentu.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
find /home/user -name "*.txt"  # Mencari file .txt di direktori /home/user
find . -type d  # Mencari semua direktori di lokasi saat ini
{% endhighlight %}
</div>

## 13. chmod - Change File Mode

Perintah **chmod** digunakan untuk mengubah izin file atau direktori.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
chmod 755 script.sh  # Mengubah izin file menjadi rwxr-xr-x
chmod +x script.sh  # Menambahkan izin eksekusi
{% endhighlight %}
</div>

## 14. chown - Change File Owner

Perintah **chown** digunakan untuk mengubah pemilik file atau direktori.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
chown user:group file.txt  # Mengubah pemilik dan grup file
{% endhighlight %}
</div>

## 15. ps - Process Status

Perintah **ps** digunakan untuk menampilkan proses yang sedang berjalan.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
ps aux  # Menampilkan semua proses
{% endhighlight %}
</div>

## 16. kill - Terminate Processes

Perintah **kill** digunakan untuk menghentikan proses.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
kill 1234  # Menghentikan proses dengan PID 1234
kill -9 1234  # Memaksa menghentikan proses
{% endhighlight %}
</div>

## 17. top - Display Linux Processes

Perintah **top** digunakan untuk menampilkan proses secara real-time.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
top
{% endhighlight %}
</div>

## 18. df - Disk Free

Perintah **df** digunakan untuk menampilkan penggunaan ruang disk.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
df -h  # Menampilkan penggunaan disk dalam format yang mudah dibaca
{% endhighlight %}
</div>

## 19. du - Disk Usage

Perintah **du** digunakan untuk menampilkan penggunaan ruang disk oleh file dan direktori.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
du -sh /home/user  # Menampilkan total penggunaan ruang di direktori
{% endhighlight %}
</div>

## 20. tar - Archive Files

Perintah **tar** digunakan untuk membuat atau mengekstrak arsip.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
tar -cvf archive.tar folder/  # Membuat arsip
tar -xvf archive.tar  # Mengekstrak arsip
{% endhighlight %}
</div>

## 21. wget dan curl - Download Files

Perintah **wget** dan **curl** digunakan untuk mengunduh file dari internet.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
wget https://example.com/file.zip  # Mengunduh file
curl -O https://example.com/file.zip  # Mengunduh file dengan curl
{% endhighlight %}
</div>

## 22. ssh - Secure Shell

Perintah **ssh** digunakan untuk terhubung ke server remote.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
ssh user@remote_host  # Terhubung ke server remote
{% endhighlight %}
</div>

## 23. scp - Secure Copy

Perintah **scp** digunakan untuk menyalin file antara lokal dan remote.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
scp file.txt user@remote_host:/path/to/destination  # Menyalin file ke remote
scp user@remote_host:/path/to/file.txt .  # Menyalin file dari remote
{% endhighlight %}
</div>

## 24. rsync - Remote Sync

Perintah **rsync** digunakan untuk menyinkronkan file dan direktori.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
rsync -avz /local/folder/ user@remote_host:/remote/folder/  # Sinkronisasi folder
{% endhighlight %}
</div>

## 25. history - Command History

Perintah **history** digunakan untuk menampilkan riwayat perintah yang telah dijalankan.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
history
{% endhighlight %}
</div>

## 26. man - Manual Pages

Perintah **man** digunakan untuk menampilkan dokumentasi perintah.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
man ls  # Menampilkan manual untuk perintah ls
{% endhighlight %}
</div>

## 27. alias - Create Command Aliases

Perintah **alias** digunakan untuk membuat alias perintah.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
alias ll='ls -la'  # Membuat alias ll untuk ls -la
{% endhighlight %}
</div>

## 28. echo - Display Message

Perintah **echo** digunakan untuk menampilkan pesan atau variabel.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
echo "Hello, World!"
echo $HOME  # Menampilkan nilai variabel HOME
{% endhighlight %}
</div>

## 29. export - Set Environment Variables

Perintah **export** digunakan untuk menetapkan variabel lingkungan.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
export PATH=$PATH:/new/path  # Menambahkan direktori ke PATH
{% endhighlight %}
</div>

## 30. uname - System Information

Perintah **uname** digunakan untuk menampilkan informasi sistem.

**Contoh:**

<div class="code-block">Bash
  <button class="copy-button" onclick="copyCode(this)">Copy</button>
{% highlight bash linenos %}
uname -a  # Menampilkan semua informasi sistem
{% endhighlight %}
</div>

Ini hanyalah sebagian kecil dari perintah Linux yang tersedia. Linux memiliki ratusan perintah yang dapat membantu Anda dalam berbagai tugas, mulai dari manajemen file hingga administrasi sistem. Dengan mempelajari dan menguasai perintah-perintah ini, Anda dapat meningkatkan produktivitas dan efisiensi Anda dalam menggunakan Linux.

Jika Anda ingin mempelajari lebih lanjut, jangan ragu untuk menjelajahi dokumentasi resmi atau menggunakan perintah **man** untuk melihat panduan lengkap tentang perintah tertentu.
