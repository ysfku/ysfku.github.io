---
layout: post
title:  "Backup Openclash Simaster"
categories: Clash
tags:  Backup
author: Muhammad Yusuf
---

* content
{:toc}

Tutorial backup `clash` file `simaster` di `openwrt` ini sangat sederhana dan cocok untuk `openwrt` versi `23.05.0`.

Dengan backup ini anda sangat mudah untuk menggunakan dengan memasang `file backup` di `config manager`.

Dan berikut tampilan file yang sudah saya siapkan untuk anda.

## Configuration

```
---
port: 7890
socks-port: 7891
redir-port: 7892
tproxy-port: 7895
mixed-port: 7893
allow-lan: true
mode: script
log-level: info
ipv6: false
external-controller: 0.0.0.0:9090
external-ui: "/usr/share/openclash/ui"
dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  listen: 0.0.0.0:7874
  fallback-filter:
    geoip: true
    geoip-code: ID
    ipcidr:
    - 0.0.0.0/8
    - 10.0.0.0/8
    - 100.64.0.0/10
    - 127.0.0.0/8
    - 169.254.0.0/16
    - 172.24.0.0/16
    - 172.16.0.0/12
    - 192.0.0.0/24
    - 192.0.2.0/24
    - 192.88.99.0/24
    - 192.168.0.0/16
    - 198.18.0.0/15
    - 198.51.100.0/24
    - 203.0.113.0/24
    - 224.0.0.0/4
    - 240.0.0.0/4
    - 255.255.255.255/32
    domain:
    - "+.google.com"
    - "+.netflix.com"
    - "+.facebook.com"
    - "+.youtube.com"
    - "+.githubusercontent.com"
    - "+.googlevideo.com"
    - "+.msftconnecttest.com"
    - "+.msftncsi.com"
    - msftconnecttest.com
    - msftncsi.com
  fake-ip-filter:
  - "+.pool.ntp.org"
  - ntp7.*.com
  - ntp6.*.com
  - ntp5.*.com
  - ntp4.*.com
  - ntp3.*.com
  - ntp2.*.com
  - ntp1.*.com
  - ntp.*.com
  - time7.*.com
  - time6.*.com
  - time5.*.com
  - time4.*.com
  - time3.*.com
  - time2.*.com
  - time1.*.com
  - time.*.apple.com
  - time.*.edu.cn
  - time.*.gov
  - time.*.com
  - "*.home.arpa"
  - "*.local"
  - "*.test"
  - "*.localhost"
  - "*.invalid"
  - "*.example"
  - "*.localdomain"
  - time1.cloud.tencent.com
  - "*.ntp.org"
  - "*.time.edu"
  - "*.lan"
  - "*.ntp.org.cn"
  - "*.time.edu.cn"
  - "+.*"
  default-nameserver:
  - 8.8.8.8
  - 8.8.4.4
  - 1.1.1.1
  - 1.0.0.1
  - 192.168.42.129
  nameserver:
  - 8.8.8.8
  - 8.8.4.4
  - 1.1.1.1
  - 1.0.0.1
  - https://dns.google/dns-query
  - tls://dns.google
  - https://dns.cloudflare.com/dns-query
  - tls://dns.google:853
  - https://1.1.1.1/dns-query
  - tls://1.1.1.1:853
  - https://dns.adguard-dns.com:3000/dns-query
  - tls://dns.adguard-dns.com:3000
  fake-ip-range: 198.18.0.1/16
proxy-providers:
  AKUN1 GSM:
    type: file
    path: "./proxy_provider/account-master1.yaml"
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 99
  AKUN2 GSM:
    type: file
    path: "./proxy_provider/account-master2.yaml"
    health-check:
      enable: true
      url: http://www.gstatic.com/generate_204
      interval: 99
proxy-groups:
- name: SIMASTER V2
  type: select
  disable-udp: false
  proxies:
  - LB GSM
  - BESTPING GSM
  - FAILOVER GSM
  - SELECT GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB GSM
  type: load-balance
  strategy: round-robin
  disable-udp: false
  proxies:
  - LB AKUN1
  - LB AKUN2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB AKUN1
  type: select
  disable-udp: false
  proxies:
  - BESTPING AKUN1
  - FAILOVER AKUN1
  - PILIH AKUN1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: LB AKUN2
  type: select
  disable-udp: false
  proxies:
  - BESTPING AKUN2
  - FAILOVER AKUN2
  - PILIH AKUN1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: BESTPING GSM
  type: url-test
  disable-udp: false
  proxies:
  - BESTPING AKUN1
  - BESTPING AKUN2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: BESTPING AKUN1
  type: url-test
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: BESTPING AKUN2
  type: url-test
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: FAILOVER GSM
  type: fallback
  disable-udp: false
  proxies:
  - FAILOVER AKUN1
  - FAILOVER AKUN2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: FAILOVER AKUN1
  type: fallback
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: FAILOVER AKUN2
  type: fallback
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: SELECT GSM
  type: select
  disable-udp: false
  proxies:
  - PILIH AKUN1
  - PILIH AKUN2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: PILIH AKUN1
  type: select
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH AKUN2
  type: select
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: "GAME \U0001F4E1"
  type: select
  disable-udp: false
  proxies:
  - LB GAME
  - BESTPING GAME
  - FAILOVER GAME
  - PILIH GAME
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB GAME
  type: load-balance
  strategy: round-robin
  disable-udp: false
  proxies:
  - LB GAME1
  - LB GAME2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB GAME1
  type: select
  disable-udp: false
  proxies:
  - BESTPING GAME1
  - FAILOVER GAME1
  - PILIH GAME1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: LB GAME2
  type: select
  disable-udp: false
  proxies:
  - BESTPING GAME2
  - FAILOVER GAME2
  - PILIH GAME1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: BESTPING GAME
  type: url-test
  disable-udp: false
  proxies:
  - BESTPING GAME1
  - BESTPING GAME2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: BESTPING GAME1
  type: url-test
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: BESTPING GAME2
  type: url-test
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: FAILOVER GAME
  type: fallback
  disable-udp: false
  proxies:
  - FAILOVER GAME1
  - FAILOVER GAME2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: FAILOVER GAME1
  type: fallback
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: FAILOVER GAME2
  type: fallback
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH GAME
  type: select
  disable-udp: false
  proxies:
  - PILIH GAME1
  - PILIH GAME2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: PILIH GAME1
  type: select
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH GAME2
  type: select
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: "WHATSAPP \U0001F4E1"
  type: select
  disable-udp: false
  proxies:
  - LB WHATSAPP
  - BESTPING WHATSAPP
  - FAILOVER WHATSAPP
  - PILIH WHATSAPP
  - DIRECT
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB WHATSAPP
  type: load-balance
  strategy: round-robin
  disable-udp: false
  proxies:
  - LB WHATSAPP1
  - LB WHATSAPP2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB WHATSAPP1
  type: select
  disable-udp: false
  proxies:
  - BESTPING WHATSAPP1
  - FAILOVER WHATSAPP1
  - PILIH WHATSAPP1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: LB WHATSAPP2
  type: select
  disable-udp: false
  proxies:
  - BESTPING WHATSAPP2
  - FAILOVER WHATSAPP2
  - PILIH WHATSAPP1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: BESTPING WHATSAPP
  type: url-test
  disable-udp: false
  proxies:
  - BESTPING WHATSAPP1
  - BESTPING WHATSAPP2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: BESTPING WHATSAPP1
  type: url-test
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: BESTPING WHATSAPP2
  type: url-test
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: FAILOVER WHATSAPP
  type: fallback
  disable-udp: false
  proxies:
  - FAILOVER WHATSAPP1
  - FAILOVER WHATSAPP2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: FAILOVER WHATSAPP1
  type: fallback
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: FAILOVER WHATSAPP2
  type: fallback
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH WHATSAPP
  type: select
  disable-udp: false
  proxies:
  - PILIH WHATSAPP1
  - PILIH WHATSAPP2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: PILIH WHATSAPP1
  type: select
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH WHATSAPP2
  type: select
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: "SOSMED \U0001F4E1"
  type: select
  disable-udp: false
  proxies:
  - LB SOSMED
  - BESTPING SOSMED
  - FAILOVER SOSMED
  - PILIH SOSMED
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB SOSMED
  type: load-balance
  strategy: round-robin
  disable-udp: false
  proxies:
  - LB SOSMED1
  - LB SOSMED2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB SOSMED1
  type: select
  disable-udp: false
  proxies:
  - BESTPING SOSMED1
  - FAILOVER SOSMED1
  - PILIH SOSMED1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: LB SOSMED2
  type: select
  disable-udp: false
  proxies:
  - BESTPING SOSMED2
  - FAILOVER SOSMED2
  - PILIH SOSMED1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: BESTPING SOSMED
  type: url-test
  disable-udp: false
  proxies:
  - BESTPING SOSMED1
  - BESTPING SOSMED2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: BESTPING SOSMED1
  type: url-test
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: BESTPING SOSMED2
  type: url-test
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: FAILOVER SOSMED
  type: fallback
  disable-udp: false
  proxies:
  - FAILOVER SOSMED1
  - FAILOVER SOSMED2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: FAILOVER SOSMED1
  type: fallback
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: FAILOVER SOSMED2
  type: fallback
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH SOSMED
  type: select
  disable-udp: false
  proxies:
  - PILIH SOSMED1
  - PILIH SOSMED2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: PILIH SOSMED1
  type: select
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH SOSMED2
  type: select
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: "STREAM \U0001F4E1"
  type: select
  disable-udp: false
  proxies:
  - LB STREAM
  - BESTPING STREAM
  - FAILOVER STREAM
  - PILIH STREAM
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB STREAM
  type: load-balance
  strategy: round-robin
  disable-udp: false
  proxies:
  - LB STREAM1
  - LB STREAM2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB STREAM1
  type: select
  disable-udp: false
  proxies:
  - BESTPING STREAM1
  - FAILOVER STREAM1
  - PILIH STREAM1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: LB STREAM2
  type: select
  disable-udp: false
  proxies:
  - BESTPING STREAM2
  - FAILOVER STREAM2
  - PILIH STREAM1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: BESTPING STREAM
  type: url-test
  disable-udp: false
  proxies:
  - BESTPING STREAM1
  - BESTPING STREAM2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: BESTPING STREAM1
  type: url-test
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: BESTPING STREAM2
  type: url-test
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: FAILOVER STREAM
  type: fallback
  disable-udp: false
  proxies:
  - FAILOVER STREAM1
  - FAILOVER STREAM2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: FAILOVER STREAM1
  type: fallback
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: FAILOVER STREAM2
  type: fallback
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH STREAM
  type: select
  disable-udp: false
  proxies:
  - PILIH STREAM1
  - PILIH STREAM2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: PILIH STREAM1
  type: select
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH STREAM2
  type: select
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: "BANK \U0001F4E1"
  type: select
  disable-udp: false
  proxies:
  - LB BANK
  - BESTPING BANK
  - FAILOVER BANK
  - PILIH BANK
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB BANK
  type: load-balance
  strategy: round-robin
  disable-udp: false
  proxies:
  - LB BANK1
  - LB BANK2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB BANK1
  type: select
  disable-udp: false
  proxies:
  - BESTPING BANK1
  - FAILOVER BANK1
  - PILIH BANK1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: LB BANK2
  type: select
  disable-udp: false
  proxies:
  - BESTPING BANK2
  - FAILOVER BANK2
  - PILIH BANK1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: BESTPING BANK
  type: url-test
  disable-udp: false
  proxies:
  - BESTPING BANK1
  - BESTPING BANK2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: BESTPING BANK1
  type: url-test
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: BESTPING BANK2
  type: url-test
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: FAILOVER BANK
  type: fallback
  disable-udp: false
  proxies:
  - FAILOVER BANK1
  - FAILOVER BANK2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: FAILOVER BANK1
  type: fallback
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: FAILOVER BANK2
  type: fallback
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH BANK
  type: select
  disable-udp: false
  proxies:
  - PILIH BANK1
  - PILIH BANK2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: PILIH BANK1
  type: select
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH BANK2
  type: select
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: "OLSHOP \U0001F4E1"
  type: select
  disable-udp: false
  proxies:
  - LB OLSHOP
  - BESTPING OLSHOP
  - FAILOVER OLSHOP
  - PILIH OLSHOP
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB OLSHOP
  type: load-balance
  strategy: round-robin
  disable-udp: false
  proxies:
  - LB OLSHOP1
  - LB OLSHOP2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: LB OLSHOP1
  type: select
  disable-udp: false
  proxies:
  - BESTPING OLSHOP1
  - FAILOVER OLSHOP1
  - PILIH OLSHOP1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: LB OLSHOP2
  type: select
  disable-udp: false
  proxies:
  - BESTPING OLSHOP2
  - FAILOVER OLSHOP2
  - PILIH OLSHOP1
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: BESTPING OLSHOP
  type: url-test
  disable-udp: false
  proxies:
  - BESTPING OLSHOP1
  - BESTPING OLSHOP2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: BESTPING OLSHOP1
  type: url-test
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: BESTPING OLSHOP2
  type: url-test
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  tolerance: '150'
  interface-name: usb0
- name: FAILOVER OLSHOP
  type: fallback
  disable-udp: false
  proxies:
  - FAILOVER OLSHOP1
  - FAILOVER OLSHOP2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: FAILOVER OLSHOP1
  type: fallback
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: FAILOVER OLSHOP2
  type: fallback
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH OLSHOP
  type: select
  disable-udp: false
  proxies:
  - PILIH OLSHOP1
  - PILIH OLSHOP2
  url: http://www.gstatic.com/generate_204
  interval: '99'
- name: PILIH OLSHOP1
  type: select
  disable-udp: false
  use:
  - AKUN1 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
- name: PILIH OLSHOP2
  type: select
  disable-udp: false
  use:
  - AKUN2 GSM
  url: http://www.gstatic.com/generate_204
  interval: '99'
  interface-name: usb0
rule-providers:
  Gamemaster:
    type: file
    behavior: classical
    path: "./rule_provider/rule-port-game.yaml"
  Sosmedmaster:
    type: file
    behavior: classical
    path: "./rule_provider/rule-port-sosmed.yaml"
  Streammaster:
    type: file
    behavior: classical
    path: "./rule_provider/rule-port-stream.yaml"
  Olshopmaster:
    type: file
    behavior: classical
    path: "./rule_provider/rule-port-olshop.yaml"
  Bankmaster:
    type: file
    behavior: classical
    path: "./rule_provider/rule-port-bank.yaml"
  Whatsappmaster:
    type: file
    behavior: classical
    path: "./rule_provider/rule-port-whatsapp.yaml"
script:
  code: "def main(ctx, metadata):\n    ruleset_action = {\"Gamemaster\": \"GAME \U0001F4E1\",\n
    \       \"Sosmedmaster\": \"SOSMED \U0001F4E1\",\n        \"Streammaster\": \"STREAM
    \U0001F4E1\",\n        \"Olshopmaster\": \"OLSHOP \U0001F4E1\",\n        \"Bankmaster\":
    \"BANK \U0001F4E1\",\n        \"Whatsappmaster\": \"WHATSAPP \U0001F4E1\"\n      }\n\n
    \   port = int(metadata[\"dst_port\"])\n\n    if metadata[\"network\"] == \"UDP\":\n
    \       if port == [21,22,23,53,80,123,143,194,443,465,587,853,993,995,998,2052,2053,2082,2083,2086,2095,2096,5222,5228,5229,5230,8080,8443,8880,8888,8889]:\n
    \           ctx.log('[Script] matched QUIC traffic use SIMASTER V2')\n            return
    \"SIMASTER V2\"\n\n    port_list = [21, 22, 23, 53, 80, 123, 143, 194, 443, 465,
    587, 853, 993, 995, 998, 2052, 2053, 2082, 2083, 2086, 2095, 2096, 5222, 5228,
    5229, 5230, 8080, 8443, 8880, 8888, 8889]\n    if port not in port_list:\n        ctx.log('[Script]
    not common port use GAME')\n        return \"GAME \U0001F4E1\"\n\n    if metadata[\"dst_ip\"]
    == \"\":\n        metadata[\"dst_ip\"] = ctx.resolve_ip(metadata[\"host\"])\n\n
    \   for ruleset in ruleset_action:\n        if ctx.rule_providers[ruleset].match(metadata):\n
    \           return ruleset_action[ruleset]\n\n    if metadata[\"dst_ip\"] == \"\":\n
    \       return \"DIRECT\"\n\n    code = ctx.geoip(metadata[\"dst_ip\"])\n    if
    code == \"ID\":\n        ctx.log('[Script] Geoip ID')\n        return \"SIMASTER
    V2\"\n\n    ctx.log('[Script] SIMASTER V2')\n    return \"SIMASTER V2\"\n"
rules:
- IP-CIDR,198.18.0.1/16,REJECT,no-resolve
- "RULE-SET,Gamemaster,GAME \U0001F4E1"
- "RULE-SET,Sosmedmaster,SOSMED \U0001F4E1"
- "RULE-SET,Streammaster,STREAM \U0001F4E1"
- "RULE-SET,Olshopmaster,OLSHOP \U0001F4E1"
- "RULE-SET,Bankmaster,BANK \U0001F4E1"
- "RULE-SET,Whatsappmaster,WHATSAPP \U0001F4E1"
- GEOIP,ID,SIMASTER V2
- MATCH,SIMASTER V2
tun:
  enable: true
  stack: system
  auto-route: false
  auto-detect-interface: false
  dns-hijack:
  - tcp://any:53
profile:
  store-selected: true
  store-fake-ip: true
bind-address: "*"
secret: '123456'
experimental:
  sniff-tls-sni: true
authentication:
- Clash:hckUjOup
```

## Proxy Provider

Saya sudah membagikan menjadi 2 bagian untuk loadbalance dalam pisah trafik.

### Modem WAN

```
proxies:
- name: Vmess WS1
  type: vmess
  server: bug.com
  port: 80
  uuid: a9a2acc8-648b-434f-8b16-6d5e9fff22f2
  alterId: 0
  cipher: auto
  udp: true
  tls: false
  skip-cert-verify: false
  network: ws
  ws-opts:
    path: /v2ray
    headers:
      Host: ip/domain-akun
```

### Modem WANB

```
proxies:
- name: Vmess WS2
  type: vmess
  server: bug.com
  port: 80
  uuid: a9a2acc8-648b-434f-8b16-6d5e9fff22f2
  alterId: 0
  cipher: auto
  udp: true
  tls: false
  skip-cert-verify: false
  network: ws
  ws-opts:
    path: /v2ray
    headers:
      Host: ip/domain-akun
```

## Rule Provider

Ini adalah khusus buat pisah trafik dari berbagai domain dan juga suffix.

### Game

```
payload:

  # > MOBILE LEGENDS
  - DOMAIN-KEYWORD,ml
  - DOMAIN-KEYWORD,mobilelegends
  - DOMAIN-KEYWORD,aihelp
  - DOMAIN-KEYWORD,yuanzapp

  # > GARENA
  - DOMAIN-KEYWORD,freefire
  - DOMAIN-KEYWORD,aov
  - DOMAIN-KEYWORD,cod
  - DOMAIN-KEYWORD,callofduty
  - DOMAIN-KEYWORD,garena
  - DOMAIN-KEYWORD,avatargarenanow-a
  - DOMAIN-KEYWORD,cdngarenanow-a
  - DOMAIN-KEYWORD,dlmobilegarena-a
  - DOMAIN-KEYWORD,garena
  - DOMAIN-KEYWORD,garenanow
  - DOMAIN-KEYWORD,seagroup
  
  # > PUBG
  - DOMAIN-KEYWORD,pubgmobile  
  - DOMAIN-KEYWORD,igamecj
  - DOMAIN-KEYWORD,file-igamecj
  - DOMAIN-KEYWORD,krafton
  - DOMAIN-KEYWORD,pubg
  - DOMAIN-KEYWORD,anticheatexpert
  
  # > Roblox
  - DOMAIN-KEYWORD,rbxcdn
  - DOMAIN-KEYWORD,roblox
  
  # > Game
  - DOMAIN-KEYWORD,logincdn
  - DOMAIN-KEYWORD,100classicbooks
  - DOMAIN-KEYWORD,ac-pocketcamp
  - DOMAIN-KEYWORD,amiibo
  - DOMAIN-KEYWORD,anthemgame
  - DOMAIN-KEYWORD,anthemthegame
  - DOMAIN-KEYWORD,apexlegends
  - DOMAIN-KEYWORD,cygames
  - DOMAIN-KEYWORD,avatargarenanow-a
  - DOMAIN-KEYWORD,awayoutgame
  - DOMAIN-KEYWORD,ayudanintendo
  - DOMAIN-KEYWORD,battle
  - DOMAIN-KEYWORD,battlebreakers
  - DOMAIN-KEYWORD,battlefield
  - DOMAIN-KEYWORD,battlefield1943
  - DOMAIN-KEYWORD,battlefield3
  - DOMAIN-KEYWORD,battlefield4
  - DOMAIN-KEYWORD,battlefield5
  - DOMAIN-KEYWORD,battlefieldbapany2
  - DOMAIN-KEYWORD,battlefieldheroes
  - DOMAIN-KEYWORD,battlefieldv
  - DOMAIN-KEYWORD,battlefront2
  - DOMAIN-KEYWORD,battlefrontii
  - DOMAIN-KEYWORD,battlelog
  - DOMAIN-KEYWORD,battl
  - DOMAIN-KEYWORD,bejeweledstars
  - DOMAIN-KEYWORD,bejewled-stars
  - DOMAIN-KEYWORD,beth.games
  - DOMAIN-KEYWORD,bethesda
  - DOMAIN-KEYWORD,bethesdagamestudios
  - DOMAIN-KEYWORD,bethsoft
  - DOMAIN-KEYWORD,bioware
  - DOMAIN-KEYWORD,biowarestore
  - DOMAIN-KEYWORD,blackboxgames
  - DOMAIN-KEYWORD,blizzard
  - DOMAIN-KEYWORD,blizzardgames
  - DOMAIN-KEYWORD,blizzardgearstore
  - DOMAIN-KEYWORD,blizzcon-a
  - DOMAIN-KEYWORD,blz-contentstack
  - DOMAIN-KEYWORD,blzddist1-a
  - DOMAIN-KEYWORD,blzddistkr1-a
  - DOMAIN-KEYWORD,blzmedia-a
  - DOMAIN-KEYWORD,blznav
  - DOMAIN-KEYWORD,blzstatic
  - DOMAIN-KEYWORD,163
  - DOMAIN-KEYWORD,cmsus-a
  - DOMAIN-KEYWORD,product-a
  - DOMAIN-KEYWORD,shopus
  - DOMAIN-KEYWORD,bowsersinsidestory
  - DOMAIN-KEYWORD,brawlstars
  - DOMAIN-KEYWORD,brawlstarsgame
  - DOMAIN-KEYWORD,callersbane
  - DOMAIN-KEYWORD,camelot-europe
  - DOMAIN-KEYWORD,camelotherald
  - DOMAIN-KEYWORD,capitalgames
  - DOMAIN-KEYWORD,cdngarenanow-a
  - DOMAIN-KEYWORD,unity3d
  - DOMAIN-KEYWORD,championshipseriesleague
  - DOMAIN-KEYWORD,chillingo
  - DOMAIN-KEYWORD,cloudsync-prod
  - DOMAIN-KEYWORD,cncrivals
  - DOMAIN-KEYWORD,mandandconquer
  - DOMAIN-KEYWORD,conquerwithcharacter
  - DOMAIN-KEYWORD,convrgencegame
  - DOMAIN-KEYWORD,crysis
  - DOMAIN-KEYWORD,wmsj
  - DOMAIN-KEYWORD,daoc
  - DOMAIN-KEYWORD,darkageofcamelot
  - DOMAIN-KEYWORD,darkness-risen
  - DOMAIN-KEYWORD,dawngate
  - DOMAIN-KEYWORD,dawngatechronicles
  - DOMAIN-KEYWORD,deadspacegame
  - DOMAIN-KEYWORD,resease
  - DOMAIN-KEYWORD,diablo3
  - DOMAIN-KEYWORD,diabloimmortal
  - DOMAIN-KEYWORD,dialga
  - DOMAIN-KEYWORD,dice.se
  - DOMAIN-KEYWORD,dicela
  - DOMAIN-KEYWORD,dicela
  - DOMAIN-KEYWORD,diddykongracing
  - DOMAIN-KEYWORD,dkr
  - DOMAIN-KEYWORD,steam
  - DOMAIN-KEYWORD,dlmobilegarena-a
  - DOMAIN-KEYWORD,donkeykongcountryreturns
  - DOMAIN-KEYWORD,dota2
  - DOMAIN-KEYWORD,dragonage
  - DOMAIN-KEYWORD,dragonagekeep
  - DOMAIN-KEYWORD,dragonagemovie
  - DOMAIN-KEYWORD,drmario-world
  - DOMAIN-KEYWORD,dungeonkeeper
  - DOMAIN-KEYWORD,ea-anz-press
  - DOMAIN-KEYWORD,ea
  - DOMAIN-KEYWORD,omtrdc
  - DOMAIN-KEYWORD,eaaccess
  - DOMAIN-KEYWORD,eaassets-a
  - DOMAIN-KEYWORD,eablackbox
  - DOMAIN-KEYWORD,eac-cdn
  - DOMAIN-KEYWORD,eacashcard
  - DOMAIN-KEYWORD,eacodigos
  - DOMAIN-KEYWORD,eafootballworld
  - DOMAIN-KEYWORD,eakorea
  - DOMAIN-KEYWORD,eamirrorsedge
  - DOMAIN-KEYWORD,eamobile
  - DOMAIN-KEYWORD,eamythic
  - DOMAIN-KEYWORD,eaplay
  - DOMAIN-KEYWORD,easports
  - DOMAIN-KEYWORD,easportsactive
  - DOMAIN-KEYWORD,easportsactiveonline
  - DOMAIN-KEYWORD,easportsfootball
  - DOMAIN-KEYWORD,easportsfootballclub
  - DOMAIN-KEYWORD,easportsmma
  - DOMAIN-KEYWORD,easportsworld
  - DOMAIN-KEYWORD,eastore
  - DOMAIN-KEYWORD,easy
  - DOMAIN-KEYWORD,easyanticheat
  - DOMAIN-KEYWORD,electronicarts
  - DOMAIN-KEYWORD,epicgames
  - DOMAIN-KEYWORD,excitebots
  - DOMAIN-KEYWORD,fanatical
  - DOMAIN-KEYWORD,fifastreet
  - DOMAIN-KEYWORD,fifastreet3
  - DOMAIN-KEYWORD,fire-emblem-heroes
  - DOMAIN-KEYWORD,fireemblemawakening
  - DOMAIN-KEYWORD,firesidegatherings
  - DOMAIN-KEYWORD,flipnotestudio
  - DOMAIN-KEYWORD,fortnite
  - DOMAIN-KEYWORD,forzamotorsport
  - DOMAIN-KEYWORD,forzaracingchampionship
  - DOMAIN-KEYWORD,forzarc
  - DOMAIN-KEYWORD,frostbite
  - DOMAIN-KEYWORD,futpromos
  - DOMAIN-KEYWORD,futunited
  - DOMAIN-KEYWORD,gamedownloads-rockstargames
  - DOMAIN-KEYWORD,gamepass
  - DOMAIN-KEYWORD,garena
  - DOMAIN-KEYWORD,garenanow
  - DOMAIN-KEYWORD,ghostgames
  - DOMAIN-KEYWORD,giratina
  - DOMAIN-KEYWORD,gloryofheracles
  - DOMAIN-KEYWORD,gog-statics
  - DOMAIN-KEYWORD,gog
  - DOMAIN-KEYWORD,qtlglb
  - DOMAIN-KEYWORD,hackyourconsole
  - DOMAIN-KEYWORD,helpshift
  - DOMAIN-KEYWORD,nosease
  - DOMAIN-KEYWORD,heroesofdragonage
  - DOMAIN-KEYWORD,heroesofthestorm
  - DOMAIN-KEYWORD,historyofdota
  - DOMAIN-KEYWORD,humblebundle
  - DOMAIN-KEYWORD,hutpromos
  - DOMAIN-KEYWORD,industrialtoys
  - DOMAIN-KEYWORD,instituteofwar
  - DOMAIN-KEYWORD,kirbysepicyarn
  - DOMAIN-KEYWORD,kirbysuperstarultra
  - DOMAIN-KEYWORD,kyurem
  - DOMAIN-KEYWORD,lcsmerch
  - DOMAIN-KEYWORD,leaguehighschool
  - DOMAIN-KEYWORD,leagueoflegends
  - DOMAIN-KEYWORD,leagueoflegendsscripts
  - DOMAIN-KEYWORD,leaguesharp
  - DOMAIN-KEYWORD,leaguoflegends
  - DOMAIN-KEYWORD,learnwithleague
  - DOMAIN-KEYWORD,legendofzelda
  - DOMAIN-KEYWORD,lol-europe
  - DOMAIN-KEYWORD,lolclub
  - DOMAIN-KEYWORD,lolespor
  - DOMAIN-KEYWORD,lolesports
  - DOMAIN-KEYWORD,lolfanart
  - DOMAIN-KEYWORD,lolpcs
  - DOMAIN-KEYWORD,lolshop
  - DOMAIN-KEYWORD,lolstatic-a
  - DOMAIN-KEYWORD,lolstatic
  - DOMAIN-KEYWORD,lolusercontent
  - DOMAIN-KEYWORD,lordofultima
  - DOMAIN-KEYWORD,lpl
  - DOMAIN-KEYWORD,maddenchampionship
  - DOMAIN-KEYWORD,maddenrewards
  - DOMAIN-KEYWORD,maddenseason
  - DOMAIN-KEYWORD,marioandluigidreamteam
  - DOMAIN-KEYWORD,mariobroswii
  - DOMAIN-KEYWORD,mariokart
  - DOMAIN-KEYWORD,mariokart7
  - DOMAIN-KEYWORD,mariokart8
  - DOMAIN-KEYWORD,mariosupersluggers
  - DOMAIN-KEYWORD,masseffect
  - DOMAIN-KEYWORD,masseffectarchives
  - DOMAIN-KEYWORD,maxis
  - DOMAIN-KEYWORD,media-rockstargames
  - DOMAIN-KEYWORD,miitomo
  - DOMAIN-KEYWORD,miiverse
  - DOMAIN-KEYWORD,minecraft
  - DOMAIN-KEYWORD,minecraftshop
  - DOMAIN-KEYWORD,mirrorsedge
  - DOMAIN-KEYWORD,mirrorsedge2
  - DOMAIN-KEYWORD,mirrorsedge2d
  - DOMAIN-KEYWORD,mojang
  - DOMAIN-KEYWORD,molesports
  - DOMAIN-KEYWORD,msgamestudios
  - DOMAIN-KEYWORD,mysims
  - DOMAIN-KEYWORD,mysimsracing
  - DOMAIN-KEYWORD,mythicentertainment
  - DOMAIN-KEYWORD,mythicentertainment
  - DOMAIN-KEYWORD,mythicgames
  - DOMAIN-KEYWORD,needforspeed
  - DOMAIN-KEYWORD,needforspeedboost
  - DOMAIN-KEYWORD,needforspeeddriftkings
  - DOMAIN-KEYWORD,needforspeedeliminator
  - DOMAIN-KEYWORD,needforspeedlightning
  - DOMAIN-KEYWORD,needforspeedoverdrive
  - DOMAIN-KEYWORD,needforspeedproven
  - DOMAIN-KEYWORD,needforspeedredline
  - DOMAIN-KEYWORD,needforspeedshowdown
  - DOMAIN-KEYWORD,needforspeedstreetkings
  - DOMAIN-KEYWORD,needforspeedtakedown
  - DOMAIN-KEYWORD,needforspeedtherun
  - DOMAIN-KEYWORD,needforspeedtimeattack
  - DOMAIN-KEYWORD,needforspeedundergroundeast
  - DOMAIN-KEYWORD,newsupermariobrosu
  - DOMAIN-KEYWORD,nfsworld
  - DOMAIN-KEYWORD,nintendo-europe-sales
  - DOMAIN-KEYWORD,nintendo-europe
  - DOMAIN-KEYWORD,nintendo
  - DOMAIN-KEYWORD,nintendo3ds
  - DOMAIN-KEYWORD,nintendodsi
  - DOMAIN-KEYWORD,nintendoeurope
  - DOMAIN-KEYWORD,nintendolabo.cn
  - DOMAIN-KEYWORD,nintendwork
  - DOMAIN-KEYWORD,nintendonyc
  - DOMAIN-KEYWORD,nintendostore
  - DOMAIN-KEYWORD,nintendoswitch
  - DOMAIN-KEYWORD,nintendoswitch
  - DOMAIN-KEYWORD,nintendoswitchtogether
  - DOMAIN-KEYWORD,nintendowii
  - DOMAIN-KEYWORD,cygames
  - DOMAIN-KEYWORD,op.gg
  - DOMAIN-KEYWORD,opgg-static
  - DOMAIN-KEYWORD,origin-a
  - DOMAIN-KEYWORD,origin
  - DOMAIN-KEYWORD,origin
  - DOMAIN-KEYWORD,orithegame
  - DOMAIN-KEYWORD,paragon
  - DOMAIN-KEYWORD,personaltrainermath
  - DOMAIN-KEYWORD,plantsvszombies2
  - DOMAIN-KEYWORD,play4free
  - DOMAIN-KEYWORD,playapex
  - DOMAIN-KEYWORD,playartifact
  - DOMAIN-KEYWORD,playhearthstone
  - DOMAIN-KEYWORD,playnintendo
  - DOMAIN-KEYWORD,playoverwatch
  - DOMAIN-KEYWORD,playparagon
  - DOMAIN-KEYWORD,playstation
  - DOMAIN-KEYWORD,playstation
  - DOMAIN-KEYWORD,playstatiowork
  - DOMAIN-KEYWORD,playvalorant
  - DOMAIN-KEYWORD,playwarcraft3
  - DOMAIN-KEYWORD,pogo
  - DOMAIN-KEYWORD,pogobeta
  - DOMAIN-KEYWORD,pokedex3d
  - DOMAIN-KEYWORD,pokemon-moon
  - DOMAIN-KEYWORD,pokemon-sun
  - DOMAIN-KEYWORD,pokemon-sunmoon
  - DOMAIN-KEYWORD,pokemon
  - DOMAIN-KEYWORD,pokemonbank
  - DOMAIN-KEYWORD,pokemonblackwhite
  - DOMAIN-KEYWORD,pokemonbw
  - DOMAIN-KEYWORD,pokemonchampionships
  - DOMAIN-KEYWORD,pokemongoldsilver
  - DOMAIN-KEYWORD,pokemonhome
  - DOMAIN-KEYWORD,pokemonletsgoeevee
  - DOMAIN-KEYWORD,pokemonletsgopikachu
  - DOMAIN-KEYWORD,pokemonmysterydungeon
  - DOMAIN-KEYWORD,pokemonpicross
  - DOMAIN-KEYWORD,pokemonplatinum
  - DOMAIN-KEYWORD,pokemonrubysapphire
  - DOMAIN-KEYWORD,pokemonsunmoon
  - DOMAIN-KEYWORD,pokemonswordshield
  - DOMAIN-KEYWORD,pokemonultrasunmoon
  - DOMAIN-KEYWORD,pokemonvgc
  - DOMAIN-KEYWORD,pokemonwifi
  - DOMAIN-KEYWORD,popcap
  - DOMAIN-KEYWORD,prd-priconne-redive
  - DOMAIN-KEYWORD,projectapex
  - DOMAIN-KEYWORD,pvzgw2
  - DOMAIN-KEYWORD,pvzheroes
  - DOMAIN-KEYWORD,renovacionxboxlive
  - DOMAIN-KEYWORD,rgpub
  - DOMAIN-KEYWORD,riotpin
  - DOMAIN-KEYWORD,riotpoints
  - DOMAIN-KEYWORD,roborecall
  - DOMAIN-KEYWORD,rockstargames
  - DOMAIN-KEYWORD,rsg
  - DOMAIN-KEYWORD,rstatic
  - DOMAIN-KEYWORD,ruinedking
  - DOMAIN-KEYWORD,nosdn
  - DOMAIN-KEYWORD,seagroup
  - DOMAIN-KEYWORD,seaofsolitude
  - DOMAIN-KEYWORD,shadoplex
  - DOMAIN-KEYWORD,simcity-buildit
  - DOMAIN-KEYWORD,simcity
  - DOMAIN-KEYWORD,skate2
  - DOMAIN-KEYWORD,sony
  - DOMAIN-KEYWORD,sonyentertainmenwork
  - DOMAIN-KEYWORD,spearhead
  - DOMAIN-KEYWORD,speedhunters
  - DOMAIN-KEYWORD,splatoon2tournament
  - DOMAIN-KEYWORD,spore
  - DOMAIN-KEYWORD,spyjinx
  - DOMAIN-KEYWORD,ssx3
  - DOMAIN-KEYWORD,bscstorage
  - DOMAIN-KEYWORD,eccdnx
  - DOMAIN-KEYWORD,pinyuncloud
  - DOMAIN-KEYWORD,starcraft
  - DOMAIN-KEYWORD,starcraft2
  - DOMAIN-KEYWORD,starfox
  - DOMAIN-KEYWORD,starwarsbattlefront
  - DOMAIN-KEYWORD,starwarsbattlefront2
  - DOMAIN-KEYWORD,starwarsfallenorder
  - DOMAIN-KEYWORD,starwarsjedifallenorder
  - DOMAIN-KEYWORD,starwarstheoldrepublic
  - DOMAIN-KEYWORD,steam-chat
  - DOMAIN-KEYWORD,steambroadcast
  - DOMAIN-KEYWORD,steamcdn-a
  - DOMAIN-KEYWORD,steamunity-a
  - DOMAIN-KEYWORD,steamunity
  - DOMAIN-KEYWORD,steamcontent
  - DOMAIN-KEYWORD,steamgames
  - DOMAIN-KEYWORD,steampowered
  - DOMAIN-KEYWORD,steamstat
  - DOMAIN-KEYWORD,steamstatic
  - DOMAIN-KEYWORD,steamstore-a
  - DOMAIN-KEYWORD,steamunlocked
  - DOMAIN-KEYWORD,steamusercontent-a
  - DOMAIN-KEYWORD,steamusercontent
  - DOMAIN-KEYWORD,steamuserimages-a
  - DOMAIN-KEYWORD,steamvideo-a
  - DOMAIN-KEYWORD,supermario
  - DOMAIN-KEYWORD,supermario3dworld
  - DOMAIN-KEYWORD,supermariobros
  - DOMAIN-KEYWORD,supermariogalaxy
  - DOMAIN-KEYWORD,supermariorun
  - DOMAIN-KEYWORD,superpapermario
  - DOMAIN-KEYWORD,supersmashbros
  - DOMAIN-KEYWORD,supremacy
  - DOMAIN-KEYWORD,supremacy
  - DOMAIN-KEYWORD,swjedifallenorder
  - DOMAIN-KEYWORD,swjfo
  - DOMAIN-KEYWORD,swtor
  - DOMAIN-KEYWORD,swtor
  - DOMAIN-KEYWORD,teamneedforspeed
  - DOMAIN-KEYWORD,tellmewhygame
  - DOMAIN-KEYWORD,thedreadwolfrises
  - DOMAIN-KEYWORD,thelegendarystarfy
  - DOMAIN-KEYWORD,thesims
  - DOMAIN-KEYWORD,thesims3
  - DOMAIN-KEYWORD,thesims4
  - DOMAIN-KEYWORD,thesimssocial
  - DOMAIN-KEYWORD,thewonderful101
  - DOMAIN-KEYWORD,tiberiumalliances
  - DOMAIN-KEYWORD,tiburon
  - DOMAIN-KEYWORD,titanfall
  - DOMAIN-KEYWORD,tnt-ea
  - DOMAIN-KEYWORD,ubi
  - DOMAIN-KEYWORD,ubisoft-uplay-savegames
  - DOMAIN-KEYWORD,ubisoft
  - DOMAIN-KEYWORD,ulol
  - DOMAIN-KEYWORD,ultimaforever
  - DOMAIN-KEYWORD,ultimaonline
  - DOMAIN-KEYWORD,underlords
  - DOMAIN-KEYWORD,unravel2
  - DOMAIN-KEYWORD,unraveltwo
  - DOMAIN-KEYWORD,unrealengine
  - DOMAIN-KEYWORD,unrealtournament
  - DOMAIN-KEYWORD,uo
  - DOMAIN-KEYWORD,uoherald
  - DOMAIN-KEYWORD,uplay
  - DOMAIN-KEYWORD,valvesoftware
  - DOMAIN-KEYWORD,videos-rockstargames
  - DOMAIN-KEYWORD,visceralgames
  - DOMAIN-KEYWORD,wariolandshakeit
  - DOMAIN-KEYWORD,wariowarediy
  - DOMAIN-KEYWORD,wii-u
  - DOMAIN-KEYWORD,wiifit
  - DOMAIN-KEYWORD,wiifitu
  - DOMAIN-KEYWORD,wiipartyu
  - DOMAIN-KEYWORD,wiisports
  - DOMAIN-KEYWORD,wiisportsresort
  - DOMAIN-KEYWORD,wiiugamepad
  - DOMAIN-KEYWORD,wiivc
  - DOMAIN-KEYWORD,worldofwarcraft
  - DOMAIN-KEYWORD,nosdn
  - DOMAIN-KEYWORD,wowchina
  - DOMAIN-KEYWORD,xbox
  - DOMAIN-KEYWORD,xbox360
  - DOMAIN-KEYWORD,xboxab
  - DOMAIN-KEYWORD,xboxgamepass
  - DOMAIN-KEYWORD,xboxgamestudios
  - DOMAIN-KEYWORD,xboxlive
  - DOMAIN-KEYWORD,xboxone
  - DOMAIN-KEYWORD,xboxplayanywhere
  - DOMAIN-KEYWORD,xboxservices
  - DOMAIN-KEYWORD,xboxstudios
  - DOMAIN-KEYWORD,xbx
  - DOMAIN-KEYWORD,xdsummit
  - DOMAIN-KEYWORD,xenoblade
  - DOMAIN-KEYWORD,xn--mts47c3w9b1qr
  - DOMAIN-KEYWORD,yogify
  - DOMAIN-KEYWORD,yoshisnewisland
  - DOMAIN-KEYWORD,epicgames
  - DOMAIN-KEYWORD,steambroadcast
  - DOMAIN-KEYWORD,steamstore
  - DOMAIN-KEYWORD,steamuserimages
  
  # > Plants VS Zombies
  - DOMAIN-KEYWORD,plantsvszombies2
  - DOMAIN-KEYWORD,pvzgw2
  - DOMAIN-KEYWORD,pvzheroes
  
  # > Riot
  - DOMAIN-KEYWORD,historyofdota
  - DOMAIN-KEYWORD,instituteofwar
  - DOMAIN-KEYWORD,molesports
  - DOMAIN-KEYWORD,rgpub
  - DOMAIN-KEYWORD,riot-games
  - DOMAIN-KEYWORD,riot
  - DOMAIN-KEYWORD,riotcdn
  - DOMAIN-KEYWORD,riotgames
  - DOMAIN-KEYWORD,riotpin
  - DOMAIN-KEYWORD,riotpoints
  - DOMAIN-KEYWORD,rstatic
  - DOMAIN-KEYWORD,supremacy=
  
  # > League of Lengends
  - DOMAIN-KEYWORD,championshipseriesleague
  - DOMAIN-KEYWORD,lcsmerch
  - DOMAIN-KEYWORD,leaguehighschool
  - DOMAIN-KEYWORD,leagueoflegends
  - DOMAIN-KEYWORD,leagueoflegendsscripts
  - DOMAIN-KEYWORD,leaguesharp
  - DOMAIN-KEYWORD,leaguoflegends
  - DOMAIN-KEYWORD,learnwithleague
  - DOMAIN-KEYWORD,lol-europe
  - DOMAIN-KEYWORD,lolclub
  - DOMAIN-KEYWORD,lolespor
  - DOMAIN-KEYWORD,lolesports
  - DOMAIN-KEYWORD,lolfanart
  - DOMAIN-KEYWORD,lolpcs
  - DOMAIN-KEYWORD,lolshop
  - DOMAIN-KEYWORD,lolstatic
  - DOMAIN-KEYWORD,lolusercontent
  - DOMAIN-KEYWORD,lpl
  - DOMAIN-KEYWORD,pvp
  - DOMAIN-KEYWORD,ulol
  
  # > Valorant
  - DOMAIN-KEYWORD,playvalorant
  
  # > Riot e
  - DOMAIN-KEYWORD,convrgencegame
  - DOMAIN-KEYWORD,riotegames
  - DOMAIN-KEYWORD,ruinedking
```

### Sosmed

```
payload:

  # > INSTAGRAM
  - DOMAIN-KEYWORD,cdninstagram
  - DOMAIN-KEYWORD,instagram

  # > FACEBOOK
  - DOMAIN-KEYWORD,messenger
  - DOMAIN-KEYWORD,facebook
  - DOMAIN-KEYWORD,fb
  - DOMAIN-KEYWORD,fbaddins
  - DOMAIN-KEYWORD,fbcdn
  - DOMAIN-KEYWORD,fbsbx
  - DOMAIN-KEYWORD,fbworkmail
  - DOMAIN-KEYWORD,facebookmail
  - DOMAIN-KEYWORD,m.me
  - DOMAIN-KEYWORD,oculus
  - DOMAIN-KEYWORD,oculuscdn
  - DOMAIN-KEYWORD,rocksdb
  
  # > LINE
  - DOMAIN-KEYWORD,lin
  - DOMAIN-KEYWORD,line
  - DOMAIN-KEYWORD,line-apps
  - DOMAIN-KEYWORD,line-cdn
  - DOMAIN-KEYWORD,line-scdn
  - DOMAIN-KEYWORD,nhncorp
  - DOMAIN-KEYWORD,naver.jp
  
  # > TELEGRAM
  - DOMAIN-KEYWORD,telegra
  - DOMAIN-KEYWORD,telegram
  - DOMAIN-KEYWORD,t.me
  - DOMAIN-KEYWORD,tdesktop
  - DOMAIN-KEYWORD,telesco
  - IP-CIDR,91.108.4.0/22
  - IP-CIDR,91.108.8.0/22
  - IP-CIDR,91.108.12.0/22
  - IP-CIDR,91.108.16.0/22
  - IP-CIDR,91.108.20.0/22
  - IP-CIDR,91.108.56.0/22
  - IP-CIDR,149.154.160.0/20

  # > TWITTER
  - DOMAIN-KEYWORD,tiktok
  - DOMAIN-KEYWORD,tiktokv
  - DOMAIN-KEYWORD,tiktokcdn
  
  # > TWITTER
  - DOMAIN-KEYWORD,pscp
  - DOMAIN-KEYWORD,periscope
  - DOMAIN-KEYWORD,t.co
  - DOMAIN-KEYWORD,twimg
  - DOMAIN-KEYWORD,twimg
  - DOMAIN-KEYWORD,twitpic
  - DOMAIN-KEYWORD,twitter
  - DOMAIN-KEYWORD,vine
  - DOMAIN-KEYWORD,twitter
  - DOMAIN-KEYWORD,twttr
  - DOMAIN-KEYWORD,twttr
  - DOMAIN-KEYWORD,twitter
  
  # > SNACKVIDEO
  - DOMAIN-KEYWORD,snackvideo
  
  # > TIKTOK
  - DOMAIN-KEYWORD,tiktok
  - DOMAIN-KEYWORD,tiktokv
  - DOMAIN-KEYWORD,tiktokcdn
```

### Stream

```
payload:

  # > Himalaya
  - DOMAIN-KEYWORD,himalaya

  # > Deezer
  - DOMAIN-KEYWORD,deezer
  - DOMAIN-KEYWORD,dzcdn
  
  # > JOOX
  - DOMAIN-KEYWORD,joox
  - DOMAIN-KEYWORD,jooxweb-api
  
  # > KKBOX
  - DOMAIN-KEYWORD,kkbox
  - DOMAIN-KEYWORD,kfs
  
  # > Pandora
  - DOMAIN-KEYWORD,pandora
  
  # > SoundCloud
  - DOMAIN-KEYWORD,p-cdn
  - DOMAIN-KEYWORD,sndcdn
  - DOMAIN-KEYWORD,soundcloud
  
  # > Spotify
  - DOMAIN-KEYWORD,pscdn
  - DOMAIN-KEYWORD,scdn
  - DOMAIN-KEYWORD,spotify
  - DOMAIN-KEYWORD,spoti
  - DOMAIN-KEYWORD,spotify
  - DOMAIN-KEYWORD,-spotify-com
  
  # > TIDAL
  - DOMAIN-KEYWORD,tidal
  
  # > AbemaTV
  - DOMAIN-KEYWORD,abema
  - DOMAIN-KEYWORD,hayabusa
  - DOMAIN-KEYWORD,abematv
  
  # > All 4
  - DOMAIN-KEYWORD,c4assets
  - DOMAIN-KEYWORD,channel4
  
  # > Amazon Prime Video
  - DOMAIN-KEYWORD,aiv-cdn
  - DOMAIN-KEYWORD,aiv-delivery
  - DOMAIN-KEYWORD,amazonvideo
  - DOMAIN-KEYWORD,primevideo
  - DOMAIN,avodmp4s3ww-a
  - DOMAIN,d25xi40x97liuc
  - DOMAIN,dmqdd6hw24ucf
  - DOMAIN,dmqdd6hw24ucf
  - DOMAIN,d22qjgkvxw22r6
  - DOMAIN,d1v5ir2lpwr8os
  - DOMAIN-KEYWORD,avoddashs
  
  # > Apple TV
  - DOMAIN-KEYWORD,apple
  
  # > Bahamut
  - DOMAIN-KEYWORD,bahamut
  - DOMAIN-KEYWORD,gamer
  - DOMAIN,gamer-cds
  - DOMAIN,gamer2-cds
  
  # > BBC iPlayer
  - DOMAIN-KEYWORD,bbc
  - DOMAIN-KEYWORD,bbci
  - DOMAIN-KEYWORD,bbcfmt
  - DOMAIN-KEYWORD,uk-live
  
  # > DAZN
  - DOMAIN-KEYWORD,dazn
  - DOMAIN-KEYWORD,dazn-api
  - DOMAIN,d151l6v8er5bdm
  - DOMAIN-KEYWORD,voddazn
  
  # > Disney+
  - DOMAIN-KEYWORD,disney-plus
  - DOMAIN-KEYWORD,disneyplus
  - DOMAIN-KEYWORD,dssott
  - DOMAIN,registerdisney
  - DOMAIN,bamgrid
  
  # > DMM
  - DOMAIN-KEYWORD,dmm
  - DOMAIN-KEYWORD,dmm-extension
  
  # > encoreTVB
  - DOMAIN-KEYWORD,encoretvb
  - DOMAIN-KEYWORD,brightcove
  - DOMAIN-KEYWORD,bcbolt446c5271-a
  
  # > FOX NOW
  - DOMAIN-KEYWORD,fox
  - DOMAIN-KEYWORD,foxdcg
  - DOMAIN-KEYWORD,theplatform
  - DOMAIN-KEYWORD,uplynk
  
  # > FOX+
  - DOMAIN-KEYWORD,foxplus
  - DOMAIN-KEYWORD,theplatform
  - DOMAIN-KEYWORD,cdn-fox-networks-group-green
  - DOMAIN-KEYWORD,d3cv4a9a9wh0bt
  - DOMAIN-KEYWORD,foxsports01-i
  - DOMAIN-KEYWORD,foxsports02-i
  - DOMAIN-KEYWORD,foxsports03-i
  - DOMAIN-KEYWORD,staticasiafox
  
  # > HBO NOW & Max
  - DOMAIN-KEYWORD,hbo
  - DOMAIN-KEYWORD,hbogo
  - DOMAIN-KEYWORD,hbonow
  - DOMAIN-KEYWORD,hbomax
  
  # > HBO GO HKG
  - DOMAIN-KEYWORD,hbogoasia
  - DOMAIN-KEYWORD,bcbolthboa-a
  - DOMAIN-KEYWORD,players.brightcove
  - DOMAIN-KEYWORD,s3-ap-southeast-1
  - DOMAIN-KEYWORD,dai3fd1oh325y
  - DOMAIN-KEYWORD,44wilhpljf.execute-api.ap-southeast-1
  - DOMAIN-KEYWORD,hboasia1-i
  - DOMAIN-KEYWORD,hboasia2-i
  - DOMAIN-KEYWORD,hboasia3-i
  - DOMAIN-KEYWORD,hboasia4-i
  - DOMAIN-KEYWORD,hboasia5-i
  - DOMAIN-KEYWORD,cf-images.ap-southeast-1
  
  # > 华文电视
  - DOMAIN-KEYWORD,5itv.tv
  - DOMAIN-KEYWORD,ocnttv
  
  # > Hulu
  - DOMAIN-KEYWORD,hulu
  - DOMAIN-KEYWORD,huluim
  - DOMAIN-KEYWORD,hulustream
  
  # > Hulu / フールー
  - DOMAIN-KEYWORD,happyon
  - DOMAIN-KEYWORD,hjholdings
  - DOMAIN-KEYWORD,hulu
  
  # > ITV
  - DOMAIN-KEYWORD,itv
  - DOMAIN-KEYWORD,itvstatic
  - DOMAIN,itvpnpmobile-a
  
  # > KKTV
  - DOMAIN-KEYWORD,kktv
  - DOMAIN-KEYWORD,kktv-theater
  
  # > LINE TV
  - DOMAIN-KEYWORD,linetv
  - DOMAIN-KEYWORD,d3c7rimkq79yfu
  
  # > LiTV
  - DOMAIN-KEYWORD,litv
  - DOMAIN-KEYWORD,litvfreemobile-hichannel
  
  # > My5
  # USER-AGENT,My5*
  - DOMAIN-KEYWORD,channel5
  - DOMAIN-KEYWORD,my5.tv
  - DOMAIN-KEYWORD,d349g9zuie06uo
  
  # > myTV SUPER
  - DOMAIN-KEYWORD,mytvsuper
  - DOMAIN-KEYWORD,tvb
  
  # > Netflix
  - DOMAIN-KEYWORD,netflix
  - DOMAIN-KEYWORD,nflxext
  - DOMAIN-KEYWORD,nflximg
  - DOMAIN-KEYWORD,nflxso
  - DOMAIN-KEYWORD,nflxvideo
  - DOMAIN-KEYWORD,netflixdnstest0
  - DOMAIN-KEYWORD,netflixdnstest1
  - DOMAIN-KEYWORD,netflixdnstest2
  - DOMAIN-KEYWORD,netflixdnstest3
  - DOMAIN-KEYWORD,netflixdnstest4
  - DOMAIN-KEYWORD,netflixdnstest5
  - DOMAIN-KEYWORD,netflixdnstest6
  - DOMAIN-KEYWORD,netflixdnstest7
  - DOMAIN-KEYWORD,netflixdnstest8
  - DOMAIN-KEYWORD,netflixdnstest9
  - IP-CIDR,23.246.0.0/18,no-resolve
  - IP-CIDR,37.77.184.0/21,no-resolve
  - IP-CIDR,45.57.0.0/17,no-resolve
  - IP-CIDR,64.120.128.0/17,no-resolve
  - IP-CIDR,66.197.128.0/17,no-resolve
  - IP-CIDR,108.175.32.0/20,no-resolve
  - IP-CIDR,192.173.64.0/18,no-resolve
  - IP-CIDR,198.38.96.0/19,no-resolve
  - IP-CIDR,198.45.48.0/20,no-resolve
  
  # > niconico
  - DOMAIN-KEYWORD,dmc.nico
  - DOMAIN-KEYWORD,nicovideo
  - DOMAIN-KEYWORD,nimg
  - DOMAIN-KEYWORD,socdm
  
  # > Now E
  - DOMAIN-KEYWORD,nowe
  - DOMAIN-KEYWORD,nowestatic
  
  # > PBS
  - DOMAIN-KEYWORD,pbs

  # > 台湾好
  - DOMAIN-KEYWORD,skyking
  - DOMAIN-KEYWORD,hamifans
  
  # > TikTok
  - DOMAIN-KEYWORD,byteoversea
  - DOMAIN-KEYWORD,ibytedtos
  - DOMAIN-KEYWORD,ipstatp
  - DOMAIN-KEYWORD,muscdn
  - DOMAIN-KEYWORD,musical
  - DOMAIN-KEYWORD,tiktok
  - DOMAIN-KEYWORD,tiktokcdn
  - DOMAIN-KEYWORD,tiktokv
  - DOMAIN-KEYWORD,-tiktokcdn-com
  
  # > Twitch
  - DOMAIN-KEYWORD,jtvnw
  - DOMAIN-KEYWORD,ttvnw
  - DOMAIN-KEYWORD,twitch
  - DOMAIN-KEYWORD,twitchcdn
  
  # > ViuTV
  - DOMAIN-KEYWORD,viu
  - DOMAIN-KEYWORD,d1k2us671qcoau
  - DOMAIN-KEYWORD,d2anahhhmp1ffz
  - DOMAIN-KEYWORD,dfp6rglgjqszk
  
  # > Semua berisikan tentang Youtube
  - DOMAIN,www.youtube.com
  - DOMAIN-SUFFIX,i.ytimg.com
  - DOMAIN-SUFFIX,i9.ytimg.com
  - DOMAIN-SUFFIX,s.youtube.com
  - DOMAIN-SUFFIX,yt3.ggpht.com
  - DOMAIN-SUFFIX,yt4.ggpht.com
  - DOMAIN-SUFFIX,youtubei.googleapis.com
  - DOMAIN-SUFFIX,beacons.gcp.gvt2.com
  - DOMAIN-SUFFIX,suggestqueries.google.com
  - DOMAIN-SUFFIX,redirector.googlevideo.com
  - DOMAIN-SUFFIX,rr1---sn-npoeenll.googlevideo.com
  - DOMAIN-SUFFIX,rr1---sn-npoe7nsr.googlevideo.com
  - DOMAIN-SUFFIX,rr2---sn-npoe7nsk.googlevideo.com
  - DOMAIN-SUFFIX,rr2---sn-npoeener.googlevideo.com
  - DOMAIN-SUFFIX,rr2---sn-npoldne7.googlevideo.com
  - DOMAIN-SUFFIX,rr2---sn-npoldn7y.googlevideo.com
  - DOMAIN-SUFFIX,rr3---sn-npoldn7l.googlevideo.com
  - DOMAIN-SUFFIX,rr3---sn-npoe7nes.googlevideo.com
  - DOMAIN-SUFFIX,rr4---sn-npoe7nss.googlevideo.com
  - DOMAIN-SUFFIX,rr4---sn-npoe7nl6.googlevideo.com
  - DOMAIN-SUFFIX,rr4---sn-npoe7ns6.googlevideo.com
  - DOMAIN-SUFFIX,rr5---sn-npoeenle.googlevideo.com
  - DOMAIN-SUFFIX,rr5---sn-npoe7nsy.googlevideo.com
  - DOMAIN-SUFFIX,rr5---sn-npoldn7z.googlevideo.com
  - DOMAIN-SUFFIX,rr2---sn-npoldn7s.googlevideo.com
  - DOMAIN-SUFFIX,rr2---sn-npoeeney.googlevideo.com
  - DOMAIN-SUFFIX,rr3---sn-npoeenlk.googlevideo.com
  - DOMAIN-SUFFIX,rr3---sn-npoldn7z.googlevideo.com
  - DOMAIN-SUFFIX,rr5---sn-npoldn7e.googlevideo.com
  - DOMAIN-SUFFIX,rr3---sn-npoeenl7.googlevideo.com
  - DOMAIN-SUFFIX,rr1---sn-npoeeney.googlevideo.com
  - DOMAIN-SUFFIX,rr5---sn-npoeenll.googlevideo.com
  - DOMAIN-SUFFIX,rr3---sn-npoe7nds.googlevideo.com
  - DOMAIN-SUFFIX,rr5---sn-npoldne7.googlevideo.com
  - DOMAIN-SUFFIX,rr4---sn-npoeener.googlevideo.com
  - DOMAIN-SUFFIX,rr5---sn-npoeenlk.googlevideo.com
  - DOMAIN-SUFFIX,rr2---sn-npoeenle.googlevideo.com
  - DOMAIN-SUFFIX,rr3---sn-npoeene6.googlevideo.com
  - DOMAIN-SUFFIX,r2---sn-un57sn7y.googlevideo.com
  - DOMAIN-SUFFIX,rr2---sn-npoe7ndl.googlevideo.com
  - DOMAIN-SUFFIX,r5---sn-npoe7nes.googlevideo.com
  - DOMAIN-SUFFIX,rr4---sn-npoldn7z.googlevideo.com
  - DOMAIN-SUFFIX,rr3---sn-npoeener.googlevideo.com
  - DOMAIN-SUFFIX,rr1---sn-npoeens7.googlevideo.com
  - DOMAIN-SUFFIX,rr4---sn-npoldne7.googlevideo.com
  - DOMAIN-SUFFIX,rr2---sn-npoldn7z.googlevideo.com
```

### Online Shop

```
payload:

  # > SHOPEE
  - DOMAIN-KEYWORD,shopee
  - DOMAIN-KEYWORD,shopemobile
  
  # > LAZADA
  - DOMAIN-KEYWORD,lazada
  
  # > BUKALAPAK
  - DOMAIN-KEYWORD,bukalapak
  
  # > TOKOPEDIA
  - DOMAIN-KEYWORD,tokopedia
  
  # > ALIDNS
  - DOMAIN-KEYWORD,alicdn
  - DOMAIN-KEYWORD,alibaba
  
  # > AMAZON
  - DOMAIN-KEYWORD,amazon
  
  # > GOJEK dan GRAB
  - DOMAIN-KEYWORD,gojek
  - DOMAIN-KEYWORD,grab
```

### Bank

```
payload:

  # > BRI
  - DOMAIN-KEYWORD,bri
  
  # > BNI
  - DOMAIN-KEYWORD,bni

  # > BCA
  - DOMAIN-KEYWORD,bca
  - DOMAIN-KEYWORD,klikbca

  # > MANDIRI
  - DOMAIN-KEYWORD,mandiri

  # > LINKAJA
  - DOMAIN-KEYWORD,linkaja

  # > PAYPAL
  - DOMAIN-KEYWORD,paypal

  # > DANA
  - DOMAIN-KEYWORD,dana
  
  # > GOPAY
  - DOMAIN-KEYWORD,gopay
  
  # > INDODAX
  - DOMAIN-KEYWORD,indodax

  # > BITCOIN
  - DOMAIN-KEYWORD,bitcoin
  - DOMAIN-KEYWORD,etherium
```

### Port Simaster

```
payload:
  
  # > GLOBAL
  - DOMAIN-KEYWORD,akamai
  - DOMAIN-KEYWORD,aex
  - DOMAIN-KEYWORD,bibox
  - DOMAIN-KEYWORD,binance
  - DOMAIN-KEYWORD,bitcointalk
  - DOMAIN-KEYWORD,bitfinex
  - DOMAIN-KEYWORD,bithumb
  - DOMAIN-KEYWORD,bitmex
  - DOMAIN-KEYWORD,bitstamp
  - DOMAIN-KEYWORD,bittrex
  - DOMAIN-KEYWORD,bybit
  - DOMAIN-KEYWORD,coinbase
  - DOMAIN-KEYWORD,coincheck
  - DOMAIN-KEYWORD,coingecko
  - DOMAIN-KEYWORD,coinmarketcap
  - DOMAIN-KEYWORD,coinone
  - DOMAIN-KEYWORD,ftx
  - DOMAIN-KEYWORD,gate
  - DOMAIN-KEYWORD,gemini
  - DOMAIN-KEYWORD,huobi
  - DOMAIN-KEYWORD,korbit
  - DOMAIN-KEYWORD,kraken
  - DOMAIN-KEYWORD,kucoin
  - DOMAIN-KEYWORD,liquid
  - DOMAIN-KEYWORD,okex
  - DOMAIN-KEYWORD,poloniex
  - DOMAIN-KEYWORD,uniswap
  - DOMAIN-KEYWORD,zb
  - DOMAIN-KEYWORD,discord
  - DOMAIN-KEYWORD,discordapp
  - DOMAIN-KEYWORD,dropbox
  - DOMAIN-KEYWORD,dropboxapi
  - DOMAIN-KEYWORD,dropboxusercontent
  - DOMAIN-KEYWORD,github
  - DOMAIN-KEYWORD,githubusercontent
  - DOMAIN-KEYWORD,appspot
  - DOMAIN-KEYWORD,blogger
  - DOMAIN-KEYWORD,getoutline
  - DOMAIN-KEYWORD,xn--ngstr-lra8j
  - DOMAIN-KEYWORD,google
  - DOMAIN-KEYWORD,blogspot
  - DOMAIN-KEYWORD,aka
  - DOMAIN-KEYWORD,onedrive
  - DOMAIN-KEYWORD,mediaservices
  - DOMAIN-KEYWORD,xboxlive
  - DOMAIN-KEYWORD,msecnd
  - DOMAIN-KEYWORD,nyt
  - DOMAIN-KEYWORD,nytchina
  - DOMAIN-KEYWORD,nytcn
  - DOMAIN-KEYWORD,nytco
  - DOMAIN-KEYWORD,nytimes
  - DOMAIN-KEYWORD,nytimg
  - DOMAIN-KEYWORD,nytlog
  - DOMAIN-KEYWORD,nytstyle
  - DOMAIN-KEYWORD,pinterest
  - DOMAIN-KEYWORD,pixiv
  - DOMAIN-KEYWORD,pximg
  - DOMAIN-KEYWORD,redd
  - DOMAIN-KEYWORD,reddit
  - DOMAIN-KEYWORD,redditmedia
  - DOMAIN-KEYWORD,wikileaks
  - DOMAIN-KEYWORD,wikimapia
  - DOMAIN-KEYWORD,wikimedia
  - DOMAIN-KEYWORD,wikinews
  - DOMAIN-KEYWORD,wikipedia
  - DOMAIN-KEYWORD,wikiquote
  - DOMAIN-KEYWORD,4shared
  - DOMAIN-KEYWORD,9cache
  - DOMAIN-KEYWORD,9gag
  - DOMAIN-KEYWORD,abc
  - DOMAIN-KEYWORD,abebooks
  - DOMAIN-KEYWORD,ao3
  - DOMAIN-KEYWORD,apigee
  - DOMAIN-KEYWORD,apbo
  - DOMAIN-KEYWORD,apk-dl
  - DOMAIN-KEYWORD,apkfind
  - DOMAIN-KEYWORD,apkmirror
  - DOMAIN-KEYWORD,apkmonk
  - DOMAIN-KEYWORD,apkpure
  - DOMAIN-KEYWORD,aptoide
  - DOMAIN-KEYWORD,archive
  - DOMAIN-KEYWORD,archiveofourown
  - DOMAIN-KEYWORD,arte
  - DOMAIN-KEYWORD,artstan
  - DOMAIN-KEYWORD,arukas
  - DOMAIN-KEYWORD,ask
  - DOMAIN-KEYWORD,avg
  - DOMAIN-KEYWORD,avgle
  - DOMAIN-KEYWORD,badoo
  - DOMAIN-KEYWORD,bandcamp
  - DOMAIN-KEYWORD,bandwagonhost
  - DOMAIN-KEYWORD,bangkokpost
  - DOMAIN-KEYWORD,bbc
  - DOMAIN-KEYWORD,behance
  - DOMAIN-KEYWORD,biggo
  - DOMAIN-KEYWORD,bit
  - DOMAIN-KEYWORD,bloglovin
  - DOMAIN-KEYWORD,bloomberg
  - DOMAIN-KEYWORD,blubrry
  - DOMAIN-KEYWORD,book
  - DOMAIN-KEYWORD,booklive
  - DOMAIN-KEYWORD,books
  - DOMAIN-KEYWORD,boslife
  - DOMAIN-KEYWORD,box
  - DOMAIN-KEYWORD,brave
  - DOMAIN-KEYWORD,businessinsider
  - DOMAIN-KEYWORD,buzzfeed
  - DOMAIN-KEYWORD,bwh1
  - DOMAIN-KEYWORD,castbox
  - DOMAIN-KEYWORD,cbc
  - DOMAIN-KEYWORD,cdw
  - DOMAIN-KEYWORD,change
  - DOMAIN-KEYWORD,channelnewsasia
  - DOMAIN-KEYWORD,ck101
  - DOMAIN-KEYWORD,clanproject
  - DOMAIN-KEYWORD,cloudcone
  - DOMAIN-KEYWORD,clubhouseapi
  - DOMAIN-KEYWORD,clyp
  - DOMAIN-KEYWORD,cna
  - DOMAIN-KEYWORD,paritech
  - DOMAIN-KEYWORD,conoha
  - DOMAIN-KEYWORD,crucial
  - DOMAIN-KEYWORD,cts
  - DOMAIN-KEYWORD,cw
  - DOMAIN-KEYWORD,cyberctm
  - DOMAIN-KEYWORD,cyclingnews
  - DOMAIN-KEYWORD,dailymon
  - DOMAIN-KEYWORD,dailyview
  - DOMAIN-KEYWORD,dandanzan
  - DOMAIN-KEYWORD,daum
  - DOMAIN-KEYWORD,daumcdn
  - DOMAIN-KEYWORD,dcard
  - DOMAIN-KEYWORD,deadline
  - DOMAIN-KEYWORD,deepdiscount
  - DOMAIN-KEYWORD,depositphotos
  - DOMAIN-KEYWORD,deviantart
  - DOMAIN-KEYWORD,disconnect
  - DOMAIN-KEYWORD,disqus
  - DOMAIN-KEYWORD,dlercloud
  - DOMAIN-KEYWORD,dmhy
  - DOMAIN-KEYWORD,dns2go
  - DOMAIN-KEYWORD,dowjones
  - DOMAIN-KEYWORD,duckduckgo
  - DOMAIN-KEYWORD,duyaoss
  - DOMAIN-KEYWORD,dw
  - DOMAIN-KEYWORD,dynu
  - DOMAIN-KEYWORD,earthcam
  - DOMAIN-KEYWORD,ebookservice
  - DOMAIN-KEYWORD,economist
  - DOMAIN-KEYWORD,edgecastcdn
  - DOMAIN-KEYWORD,edx-cdn
  - DOMAIN-KEYWORD,elpais
  - DOMAIN-KEYWORD,enanyang
  - DOMAIN-KEYWORD,encyclopedia
  - DOMAIN-KEYWORD,esoir
  - DOMAIN-KEYWORD,etherscan
  - DOMAIN-KEYWORD,euronews
  - DOMAIN-KEYWORD,evozi
  - DOMAIN-KEYWORD,exblog
  - DOMAIN-KEYWORD,feeder
  - DOMAIN-KEYWORD,feedly
  - DOMAIN-KEYWORD,feedx
  - DOMAIN-KEYWORD,firech
  - DOMAIN-KEYWORD,flickr
  - DOMAIN-KEYWORD,flipboard
  - DOMAIN-KEYWORD,flitto
  - DOMAIN-KEYWORD,foreignpolicy
  - DOMAIN-KEYWORD,fortawesome
  - DOMAIN-KEYWORD,freetls
  - DOMAIN-KEYWORD,friday
  - DOMAIN-KEYWORD,ft
  - DOMAIN-KEYWORD,ftchinese
  - DOMAIN-KEYWORD,ftimg
  - DOMAIN-KEYWORD,genius
  - DOMAIN-KEYWORD,getlantern
  - DOMAIN-KEYWORD,getsync
  - DOMAIN-KEYWORD,globalvoices
  - DOMAIN-KEYWORD,goo
  - DOMAIN-KEYWORD,goodreads
  - DOMAIN-KEYWORD,gravatar
  - DOMAIN-KEYWORD,greatfire
  - DOMAIN-KEYWORD,gumroad
  - DOMAIN-KEYWORD,heroku
  - DOMAIN-KEYWORD,hightail
  - DOMAIN-KEYWORD,hk01
  - DOMAIN-KEYWORD,hkbf
  - DOMAIN-KEYWORD,hkbookcity
  - DOMAIN-KEYWORD,hkej
  - DOMAIN-KEYWORD,hket
  - DOMAIN-KEYWORD,hootsuite
  - DOMAIN-KEYWORD,hudson
  - DOMAIN-KEYWORD,huffpost
  - DOMAIN-KEYWORD,hyread
  - DOMAIN-KEYWORD,ibtimes
  - DOMAIN-KEYWORD,i-cable
  - DOMAIN-KEYWORD,icij
  - DOMAIN-KEYWORD,icoco
  - DOMAIN-KEYWORD,imgur
  - DOMAIN-KEYWORD,independent
  - DOMAIN-KEYWORD,initiummall
  - DOMAIN-KEYWORD,inoreader
  - DOMAIN-KEYWORD,insecam
  - DOMAIN-KEYWORD,ipfs
  - DOMAIN-KEYWORD,issuu
  - DOMAIN-KEYWORD,istockphoto
  - DOMAIN-KEYWORD,japantimes
  - DOMAIN-KEYWORD,jiji
  - DOMAIN-KEYWORD,jinx
  - DOMAIN-KEYWORD,jkforum
  - DOMAIN-KEYWORD,joinclubhouse
  - DOMAIN-KEYWORD,joinmastodon
  - DOMAIN-KEYWORD,justmysocks
  - DOMAIN-KEYWORD,justpaste
  - DOMAIN-KEYWORD,kadokawa
  - DOMAIN-KEYWORD,kakao
  - DOMAIN-KEYWORD,kakaocorp
  - DOMAIN-KEYWORD,kik
  - DOMAIN-KEYWORD,kingkong
  - DOMAIN-KEYWORD,knowyourmeme
  - DOMAIN-KEYWORD,kobo
  - DOMAIN-KEYWORD,kobobooks
  - DOMAIN-KEYWORD,kodingen
  - DOMAIN-KEYWORD,lemonde
  - DOMAIN-KEYWORD,lepoint
  - DOMAIN-KEYWORD,lihkg
  - DOMAIN-KEYWORD,limbopro
  - DOMAIN-KEYWORD,listennotes
  - DOMAIN-KEYWORD,livestream
  - DOMAIN-KEYWORD,logimg
  - DOMAIN-KEYWORD,logmein
  - DOMAIN-KEYWORD,mail
  - DOMAIN-KEYWORD,mailchimp
  - DOMAIN-KEYWORD,marc
  - DOMAIN-KEYWORD,matters
  - DOMAIN-KEYWORD,maying
  - DOMAIN-KEYWORD,medium
  - DOMAIN-KEYWORD,mega
  - DOMAIN-KEYWORD,mergersandinquisins
  - DOMAIN-KEYWORD,mingpao
  - DOMAIN-KEYWORD,mixi
  - DOMAIN-KEYWORD,mixlr
  - DOMAIN-KEYWORD,mobile01
  - DOMAIN-KEYWORD,mubi
  - DOMAIN-KEYWORD,myspace
  - DOMAIN-KEYWORD,myspacecdn
  - DOMAIN-KEYWORD,nanyang
  - DOMAIN-KEYWORD,nanalinterest
  - DOMAIN-KEYWORD,naver
  - DOMAIN-KEYWORD,nbcnews
  - DOMAIN-KEYWORD,ndr
  - DOMAIN-KEYWORD,neowin
  - DOMAIN-KEYWORD,newstapa
  - DOMAIN-KEYWORD,nexitally
  - DOMAIN-KEYWORD,nhk
  - DOMAIN-KEYWORD,nii
  - DOMAIN-KEYWORD,nikkei
  - DOMAIN-KEYWORD,nitter
  - DOMAIN-KEYWORD,nofile
  - DOMAIN-KEYWORD,non
  - DOMAIN-KEYWORD,now
  - DOMAIN-KEYWORD,nrk
  - DOMAIN-KEYWORD,nuget
  - DOMAIN-KEYWORD,nyaa
  - DOMAIN-KEYWORD,ok
  - DOMAIN-KEYWORD,on
  - DOMAIN-KEYWORD,orientaldaily
  - DOMAIN-KEYWORD,overcast
  - DOMAIN-KEYWORD,paltalk
  - DOMAIN-KEYWORD,parsevideo
  - DOMAIN-KEYWORD,pawoo
  - DOMAIN-KEYWORD,pbxes
  - DOMAIN-KEYWORD,pcdvd
  - DOMAIN-KEYWORD,pchome
  - DOMAIN-KEYWORD,pcloud
  - DOMAIN-KEYWORD,peing
  - DOMAIN-KEYWORD,picic
  - DOMAIN-KEYWORD,pinimg
  - DOMAIN-KEYWORD,player
  - DOMAIN-KEYWORD,plurk
  - DOMAIN-KEYWORD,po18
  - DOMAIN-KEYWORD,potato
  - DOMAIN-KEYWORD,potatso
  - DOMAIN-KEYWORD,prism-break
  - DOMAIN-KEYWORD,proxifier
  - DOMAIN-KEYWORD,pt
  - DOMAIN-KEYWORD,pts
  - DOMAIN-KEYWORD,pubu
  - DOMAIN-KEYWORD,pubu
  - DOMAIN-KEYWORD,pureapk
  - DOMAIN-KEYWORD,quora
  - DOMAIN-KEYWORD,quoracdn
  - DOMAIN-KEYWORD,qz
  - DOMAIN-KEYWORD,garden
  - DOMAIN-KEYWORD,rakuten
  - DOMAIN-KEYWORD,rarbgprx
  - DOMAIN-KEYWORD,reabble
  - DOMAIN-KEYWORD,readingtimes
  - DOMAIN-KEYWORD,readmoo
  - DOMAIN-KEYWORD,redbubble
  - DOMAIN-KEYWORD,resi
  - DOMAIN-KEYWORD,reuters
  - DOMAIN-KEYWORD,reutersmedia
  - DOMAIN-KEYWORD,rfi
  - DOMAIN-KEYWORD,roadshow
  - DOMAIN-KEYWORD,rsshub
  - DOMAIN-KEYWORD,scmp
  - DOMAIN-KEYWORD,scribd
  - DOMAIN-KEYWORD,seatguru
  - DOMAIN-KEYWORD,shadowsocks
  - DOMAIN-KEYWORD,shindanmaker
  - DOMAIN-KEYWORD,signal
  - DOMAIN-KEYWORD,sina
  - DOMAIN-KEYWORD,slideshare
  - DOMAIN-KEYWORD,softfamous
  - DOMAIN-KEYWORD,spiegel
  - DOMAIN-KEYWORD,startpage
  - DOMAIN-KEYWORD,steamunity
  - DOMAIN-KEYWORD,steemit
  - DOMAIN-KEYWORD,steemitwallet
  - DOMAIN-KEYWORD,straitstimes
  - DOMAIN-KEYWORD,streamable
  - DOMAIN-KEYWORD,streema
  - DOMAIN-KEYWORD,substack
  - DOMAIN-KEYWORD,t66y
  - DOMAIN-KEYWORD,tapatalk
  - DOMAIN-KEYWORD,teco-hk
  - DOMAIN-KEYWORD,teco-mo
  - DOMAIN-KEYWORD,teddysun
  - DOMAIN-KEYWORD,textnow
  - DOMAIN-KEYWORD,theguardian
  - DOMAIN-KEYWORD,theinitium
  - DOMAIN-KEYWORD,themoviedb
  - DOMAIN-KEYWORD,thetvdb
  - DOMAIN-KEYWORD,time
  - DOMAIN-KEYWORD,tineye
  - DOMAIN-KEYWORD,tiny
  - DOMAIN-KEYWORD,tinyurl
  - DOMAIN-KEYWORD,torproject
  - DOMAIN-KEYWORD,tradingview
  - DOMAIN-KEYWORD,tumblr
  - DOMAIN-KEYWORD,turbobit
  - DOMAIN-KEYWORD,tutanota
  - DOMAIN-KEYWORD,tvboxnow
  - DOMAIN-KEYWORD,udn
  - DOMAIN-KEYWORD,unseen
  - DOMAIN-KEYWORD,upmedia
  - DOMAIN-KEYWORD,uptodown
  - DOMAIN-KEYWORD,urbandicnary
  - DOMAIN-KEYWORD,ustream
  - DOMAIN-KEYWORD,uwants
  - DOMAIN-KEYWORD,v2ex
  - DOMAIN-KEYWORD,v2fly
  - DOMAIN-KEYWORD,v2ray
  - DOMAIN-KEYWORD,viber
  - DOMAIN-KEYWORD,videopress
  - DOMAIN-KEYWORD,vimeo
  - DOMAIN-KEYWORD,voachinese
  - DOMAIN-KEYWORD,voanews
  - DOMAIN-KEYWORD,voxer
  - DOMAIN-KEYWORD,vzw
  - DOMAIN-KEYWORD,w3schools
  - DOMAIN-KEYWORD,washingtonpost
  - DOMAIN-KEYWORD,wattpad
  - DOMAIN-KEYWORD,whoer
  - DOMAIN-KEYWORD,wikiwand
  - DOMAIN-KEYWORD,winudf
  - DOMAIN-KEYWORD,wire
  - DOMAIN-KEYWORD,wn
  - DOMAIN-KEYWORD,wordpress
  - DOMAIN-KEYWORD,worldcat
  - DOMAIN-KEYWORD,wsj
  - DOMAIN-KEYWORD,wsj
  - DOMAIN-KEYWORD,xhamster
  - DOMAIN-KEYWORD,xn--90wwvt03e
  - DOMAIN-KEYWORD,xn--i2ru8q2qg
  - DOMAIN-KEYWORD,xnxx
  - DOMAIN-KEYWORD,xvideos
  - DOMAIN-KEYWORD,yadi
  - DOMAIN-KEYWORD,yahoo
  - DOMAIN-KEYWORD,yandex
  - DOMAIN-KEYWORD,binator
  - DOMAIN-KEYWORD,yesasia
  - DOMAIN-KEYWORD,yes-news
  - DOMAIN-KEYWORD,yomiuri
  - DOMAIN-KEYWORD,you-get
  - DOMAIN-KEYWORD,zaobao
  - DOMAIN-KEYWORD,zello
  - DOMAIN-KEYWORD,zer
  - DOMAIN-KEYWORD,z-lib
  - DOMAIN-KEYWORD,zoom
  - DOMAIN-KEYWORD,tvbs
  - DOMAIN-KEYWORD,pubnubapi
  - DOMAIN-KEYWORD,letsencrypt
  - DOMAIN-KEYWORD,weibo
  - DOMAIN-KEYWORD,edu
  - DOMAIN-KEYWORD,gov
  - DOMAIN-KEYWORD,mil
  - DOMAIN-KEYWORD,abc
  - DOMAIN-KEYWORD,advertisemunity
  - DOMAIN-KEYWORD,ampproject
  - DOMAIN-KEYWORD,android
  - DOMAIN-KEYWORD,androidify
  - DOMAIN-KEYWORD,autodraw
  - DOMAIN-KEYWORD,capitalg
  - DOMAIN-KEYWORD,certificate-transparency
  - DOMAIN-KEYWORD,chrome
  - DOMAIN-KEYWORD,chromeexperiments
  - DOMAIN-KEYWORD,chromestatus
  - DOMAIN-KEYWORD,chromium
  - DOMAIN-KEYWORD,creativelab5
  - DOMAIN-KEYWORD,debug
  - DOMAIN-KEYWORD,deepmind
  - DOMAIN-KEYWORD,dialogflow
  - DOMAIN-KEYWORD,firebase
  - DOMAIN-KEYWORD,getmdl
  - DOMAIN-KEYWORD,ggpht
  - DOMAIN-KEYWORD,gmail
  - DOMAIN-KEYWORD,gmodules
  - DOMAIN-KEYWORD,godoc
  - DOMAIN-KEYWORD,gstatic
  - DOMAIN-KEYWORD,gwtproject
  - DOMAIN-KEYWORD,itasoftware
  - DOMAIN-KEYWORD,madewithcode
  - DOMAIN-KEYWORD,material
  - DOMAIN-KEYWORD,page
  - DOMAIN-KEYWORD,polymer-project
  - DOMAIN-KEYWORD,recaptcha
  - DOMAIN-KEYWORD,shattered
  - DOMAIN-KEYWORD,synergyse
  - DOMAIN-KEYWORD,telephony
  - DOMAIN-KEYWORD,tensorflow
  - DOMAIN-KEYWORD,tfhub
  - DOMAIN-KEYWORD,tiltbrush
  - DOMAIN-KEYWORD,waveprotocol
  - DOMAIN-KEYWORD,waymo
  - DOMAIN-KEYWORD,webmproject
  - DOMAIN-KEYWORD,webrtc
  - DOMAIN-KEYWORD,whatbrowser
  - DOMAIN-KEYWORD,widevine
  - DOMAIN-KEYWORD,company
```

## Download File

Untuk mendapatkan file backup ini, anda bisa langsung menuju [disini](https://ouo.io/j6WdUJr).

## Cara Upload Backup

1. Login `openwrt`.
1. Masuk ke `Clash` di openwrt.
1. Menuju Tab `Config Manage`.
1. Pada kotak kecil pilih `Backup File`.
1. Lalu masukkan file `backup-simaster-25juli2024.gz`.
1. Tekan `Upload`.
1. Edit akun anda di menu `Config Editor` pada bagian folder `Proxy_Provider` dan edit file `account-master1.yaml` dan `account-master2.yaml`.
1. Untuk menentukan antar interface, anda edit di folder `Config` lalu edit file `Simaster-V2.yaml` pada bagian `proxy-group` lalu ubah `interface-name:` sesuai dengan interface modem yang anda miliki.