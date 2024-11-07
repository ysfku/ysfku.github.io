---
title: Proxies
keywords: proxies-
summary: "Kumpulan format akun openclash."
sidebar: openclash
permalink: proxies-openclash.html
folder: openclash
---

**OpenClash** adalah salah satu alat yang populer digunakan untuk mengelola koneksi internet melalui berbagai protokol. Berikut ini adalah beberapa format akun yang dapat Anda gunakan dan sesuaikan sesuai kebutuhan Anda.

## Trojan

- **Trojan GFW (SNI)**

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

- **Trojan WS (SNI)**

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

## VMess

- **VMess WS (SNI)**

```yaml
- name: VMess WS (SNI)
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

## VLESS

- **VLESS WS (SNI)**

```yaml
- name: VLESS WS (SNI)
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

## Shadowsocks

- **Shadowsocks Tanpa Plugin**

```yaml
- name: Shadowsocks Tanpa Plugin
  type: ss
  server: SERVER.COM
  port: 34963
  cipher: chacha20-ietf-poly1305
  password: PASSWORD
  udp: true
```

Silakan sesuaikan parameter seperti `SERVER.COM`, `PASSWORD`, `UUID`, dan `PATH` sesuai dengan akun Anda.

{% include links.html %}