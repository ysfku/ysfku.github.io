---
layout: document
title: Proxies
date: 2024-10-30
permalink: /openclash-proxies/
author: Muhammad Yusuf
categories: openclash
tags: proxies
---

* content
{:toc}

Saya rangkumkan beberapa type script akun yang sudah saya kumpulkan untuk bisa anda gunakan ke dalam pengaturan konfigurasi openclash.

Namun sebelum itu silahkan di lihat terlebih dahulu apa saja yang perlu kita lihat.

Keterangan:

- `CDN` : Mode Bolak Balik
- `SNI` : Mode non-bolak balik/SSL
- `BUGSNI.COM` : Bug untuk metode SNI/SSL
- `BUGCDN.COM` : Bug Websoket berbentuk Host untuk metode Bolak balik (CDN)
- `IPCDN.COM` : Bug Webscoket berbentuk IP untuk metode bolak balik (CDN)
- `SERVER.COM` : Host/IP server dari akun yang kamu gunakan

Jadi silahkan untuk mengubah semua kata/text `BERKAPITAL` atau huruf besar:

- `PASSWORD`
- `PATH`
- `UUID`
- `SERVICE NAME`
- `SERVER`
- `HOST`
- `SNI`
- dan lainnya sesuai dengan akun kalian

## TROJAN
### Trojan GFW (SNI)

```yaml
- name: Trojan GFW (SNI)
  type: trojan
  server: SERVER.COM
  port: 443
  password: PASSWORD
  udp: true
  sni: BUGSNI.COM
  skip-cert-verify: true
```

### Trojan WS (SNI)

```yaml
- name: Trojan WS (SNI)
  server: SERVER.COM
  port: 443
  type: trojan
  password: PASSWORD
  skip-cert-verify: true
  sni: BUGSNI.COM
  network: ws
  ws-opts:
    path: /PATH
    headers:
      Host: BUGSNI.COM
  udp: true
```

### Trojan GO/WS (CDN)

```yaml
- name: Trojan GO/WS (CDN)
  server: IPCDN/BUGCDN.COM
  port: 443
  type: trojan
  password: PASSWORD
  network: ws
  sni: SERVER.COM
  skip-cert-verify: true
  udp: true
  ws-opts:
    path: /PATH
    headers:
        Host: SERVER.COM
```

### Trojan XTLS (SNI)

```yaml
- name: Trojan XTLS (SNI)
  server: SERVER.COM
  port: 443
  type: trojan
  password: PASSWORD
  flow: xtls-rprx-direct
  skip-cert-verify: true
  sni: BUGSNI.COM
  udp: true
```

### Trojan GRPC (SNI)

```yaml
- name: Trojan GRPC (SNI)
  type: trojan
  server: SERVER.COM
  port: 443
  password: PASSWORD
  udp: true
  sni: BUGSNI.COM
  skip-cert-verify: true
  network: grpc
  grpc-opts:
    grpc-service-name: NAMAGRPC
```

## VMESS
### Vmess WS (SNI)

```yaml
- name: Vmess WS (SNI)
  type: vmess
  server: SERVER.COM
  port: 443
  uuid: UUID
  alterId: 0
  cipher: auto
  udp: true
  tls: true
  skip-cert-verify: true
  servername: BUGSNI.COM
  network: ws
  ws-opts:
    path: /PATH
    headers:
      Host: BUGSNI.COM
```

### Vmess WS (CDN)

```yaml
- name: Vmess WS (CDN)
  type: vmess
  server: IPCDN/BUGCDN.COM
  port: 443
  uuid: UUID
  alterId: 0
  cipher: auto
  udp: true
  tls: true
  skip-cert-verify: true
  servername: SERVER.COM
  network: ws
  ws-opts:
    path: /PATH
    headers:
      Host: SERVER.COM
```

### Vmess WS (CDN) Non TLS

```yaml
- name: Vmess WS (CDN) Non TLS
  type: vmess
  server: IPCDN/BUGCDN.COM
  port: 80
  uuid: UUID
  alterId: 0
  cipher: auto
  udp: true
  tls: false
  skip-cert-verify: false
  servername: SERVER.COM
  network: ws
  ws-opts:
    path: /PATH
    headers:
      Host: SERVER.COM
```

### Vmess GRPC (SNI)

```yaml
- name: Vmess GRPC (SNI)
  server: SERVER.COM
  port: 443
  type: vmess
  uuid: UUID
  alterId: 0
  cipher: auto
  network: grpc
  tls: true
  servername: BUGSNI.COM
  skip-cert-verify: true
  grpc-opts:
    grpc-service-name: NAMAGRPC
```

## VLESS
### Vless WS (SNI)

```yaml
- name: Vless WS (SNI)
  server: SERVER.COM
  port: 443
  type: vless
  uuid: UUID
  cipher: auto
  tls: true
  skip-cert-verify: true
  servername: BUGSNI.COM
  network: ws
  ws-opts:
    path: /PATH
    headers:
      Host: BUGSNI.COM
```

### Vless WS (CDN)

```yaml
- name: Vless WS (CDN)
  server: IPCDN/BUGCDN.COM
  port: 443
  type: vless
  uuid: UUID
  cipher: auto
  tls: true
  skip-cert-verify: true
  servername: SERVER.COM
  network: ws
  ws-opts:
    path: /PATH
    headers:
      Host: SERVER.COM
```

### Vless WS (CDN) Non TLS

```yaml
- name: Vless WS (CDN) Non TLS
  server: IPCDN/BUGCDN.COM
  port: 80
  type: vless
  uuid: 81f1f510-3ca7-4734-8956-0f4fce670af5
  cipher: auto
  tls: false
  skip-cert-verify: false
  servername: SERVER.COM
  network: ws
  ws-opts:
    path: /PATH
    headers:
      Host: SERVER.COM
  udp: true
```

### Vless XTLS (SNI)

```yaml
- name: Vless XTLS (SNI)
  server: SERVER.COM
  port: 443
  type: vless
  uuid: UUID
  cipher: auto
  tls: true
  flow: xtls-rprx-direct
  skip-cert-verify: true
  servername: BUGSNI.COM
```

### Vless GRPC (SNI)

```yaml
- name: Vless GRPC (SNI)
  server: SERVER.COM
  port: 443
  type: vless
  uuid: UUID
  cipher: auto
  tls: true
  skip-cert-verify: true
  servername: BUGSNI.COM
  network: grpc
  grpc-opts:
  grpc-mode: gun
  grpc-service-name: NAMAGRPC
  udp: true
```

## SOCKS5
### Socks5 (SNI)

```yaml
- name: Socks5 (SNI)
  type: socks5
  server: SERVER.COM
  port: 443
  username: USERNAME
  password: PASSWORD
  tls: true
  skip-cert-verify: true
  udp: true
  sni: BUGSNI.COM
```

## SHADOWSOCKS
### Shadowsocks Tanpa Plugin

```yaml
- name: Shadowsocks Tanpa Plugin
  type: ss
  server: SERVER.COM
  port: 34963
  cipher: chacha20-ietf-poly1305
  password: PASSWORD
  udp: true
```

### Shadowsocks Plugin Obfs

```yaml
- name: Shadowsocks Plugin Obfs
  type: ss
  server: SERVER.COM
  port: 32033
  cipher: chacha20-ietf-poly1305
  password: PASSWORD
  plugin: obfs
  plugin-opts:
    mode: tls
    host: BUGSNI.COM
```

### ShadowsocksR (SNI)

```yaml
- name: ShadowsocksR (SNI)
  server: SERVER.COM
  port: 1235
  type: ssr
  cipher: AES-256-CTR
  password: PASSWORD
  protocol: origin
  obfs: tls1.2_ticket_auth
  protocol-param: "#"
  obfs-param: BUGSNI.COM
  udp: true
```

## SNELL
### Snell V3

```yaml
- name: Snell V3
  type: snell
  server: SERVER.COM
  port: 33223
  psk: PASSWORD
  version: 3
  udp: true
  obfs-opts:
    mode: tls
    host: BUGSNI.COM
```

Jadi, jika anda punya akun anda tinggal menyalin script ini ke openclash dan ubah dengan akun openclash yang anda miliki.