---
layout: dokuments
title:  "Dokumentasi Clash"
date: 2024-12-10
categories: [clash]
---

## Instalasi

Untuk menginstal Openclash, ikuti langkah-langkah berikut:

- Kunjungi [situs resmi Openclash](https://github.com/vernesong/OpenClash) untuk mengunduh versi terbaru dari Openclash.
- Kemudian download ipk dan taruh di folder `tmp` dan berikan perintah di terminal.

{% include coding.html language="Bash" code="cd /tmp
opkg update && opkg install *.ipk" %}

## Setup DNS Config

{% include coding.html language="yaml" code="
dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  listen: 0.0.0.0:7874
  default-nameserver:
    - 8.8.8.8
    - 8.8.4.4
    - 1.1.1.1
    - 1.0.0.1
  nameserver:
    - 8.8.8.8
    - 8.8.4.4
    - https://dns.google/dns-query
    - https://dns.cloudflare.com/dns-query
    - tls://dns.google
    - tls://dns.cloudflare
  fallback:
    - https://dns.google/dns-query
    - https://cloudflare-dns.com/dns-query
    - https://1.1.1.1/dns-query
    - tls://8.8.8.8:853
    - tls://1.1.1.1:853
    - tls://dns.cloudflare.com
    - https://1.1.1.1/dns-query
  fallback-filter:
    geoip: true
    geoip-code: ID
    ipcidr:
      - 240.0.0.0/4
      - 103.0.0.0/8
      - 114.0.0.0/8
      - 202.0.0.0/7
      - 203.0.0.0/7
    domain:
      - '+.google.com'
      - '+.facebook.com'
      - '+.youtube.com'
      - '+.githubusercontent.com'
      - '+.kompas.com'
      - '+.detik.com'
      - '+.liputan6.com'
      - '+.tempo.co'
  fake-ip-filter:
    - '*.lan'
    - time.windows.com
    - time.apple.com
    - pool.ntp.org
    - ntp.aliyun.com
    - '*.local'
    - '*.localdomain'
    - '*.example'
    - '*.invalid'
  fake-ip-range: 198.18.0.1/16
" %}

## Akun

#### Trojan SNI

{% include coding.html language="yaml" code="
proxies:
- name: 'trojan_sni'
  type: trojan
  server: your_server_address
  port: 443
  password: your_password
  udp: true
  sni: your_sni
  alpn: http/1.1
  skip-cert-verify: true
" %}

#### Vmess WS CDN

{% include coding.html language="yaml" code="
proxies:
- name: 'vmess_ws_cdn'
  type: vmess
  server: your_server_address
  port: 443
  uuid: your_uuid
  alterId: 0
  cipher: auto
  udp: true
  tls: true
  skip-cert-verify: false
  network: ws
  ws-opts:
    path: /iptunnelscom
    headers:
      Host: domainservermu.com
    max-early-data: 2048
    early-data-header-name: Sec-WebSocket-Protocol
    cdn: true
" %}

#### Vmess gRPC

{% include coding.html language="yaml" code="
proxies:
- name: 'vmess_grpc'
  type: vmess
  server: your_server_address
  port: 443
  uuid: your_uuid
  alterId: 0
  cipher: auto
  network: grpc
  grpc-opts:
    grpc-service-name: iptunnelsvgrpc
  tls: true
  skip-cert-verify: true
" %}

#### Trojan WS CDN

{% include coding.html language="yaml" code="
proxies:
- name: 'trojan_ws_cdn'
  type: trojan
  server: your_server_address
  port: 443
  password: your_password
  network: ws
  ws-opts:
    path: /iptunnelstrgo
    headers:
      Host: domainservermu.com
    cdn: true
  udp: true
  skip-cert-verify: false
" %}

#### Vmess H2

{% include coding.html language="yaml" code="
proxies:
- name: 'vmess_h2'
  type: vmess
  server: your_server_address
  port: 443
  uuid: your_uuid
  alterId: 0
  cipher: auto
  network: h2
  tls: true
  skip-cert-verify: true
" %}

#### Shadowsocks

{% include coding.html language="yaml" code="
proxies:
- name: 'shadowsocks_proxy'
  type: ss
  server: your_server_address
  port: 8388
  cipher: aes-256-gcm
  password: your_password
  udp: true
" %}

#### ShadowsocksR

{% include coding.html language="yaml" code="
proxies:
- name: 'shadowsocksr_proxy'
  type: ssr
  server: your_server_address
  port: 8388
  cipher: aes-256-gcm
  password: your_password
  udp: true
  level: fast
" %}

#### Snell

{% include coding.html language="yaml" code="
proxies:
- name: 'snell_proxy'
  type: snell
  server: your_server_address
  port: 443
  uuid: your_uuid
  cipher: auto
  udp: true
  tls: true
  skip-cert-verify: true
  network: ws
  ws-opts:
    path: /snell
    headers:
      Host: your_host
" %}

#### HTTP

{% include coding.html language="yaml" code="
proxies:
- name: 'http_proxy'
  type: http
  server: your_server_address
  port: 8080
  tls: true
  skip-cert-verify: true
  network: ws
  ws-opts:
    path: /http
    headers:
      Host: your_host
" %}
