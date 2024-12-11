---
layout: dokuments
title: "Vless"
date: 2024-12-10
categories: [clash]
---

## Vless

#### Vless Dasar

{% include coding.html language="yaml" code="
- name: 'vless'
  type: vless
  server: server
  port: 443
  uuid: uuid
  alterId: 32
  cipher: auto
  # udp: true
  # tls: true
  # skip-cert-verify: true
  # servername: example.com # priority over wss host
  # network: ws
  # ws-opts:
  #   path: /path
  #   headers:
  #     Host: v2ray.com
  #   max-early-data: 2048
  #   early-data-header-name: Sec-WebSocket-Protocol
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Vless HTTP

{% include coding.html language="yaml" code="
- name: 'vless-http'
  type: vless
  server: server
  port: 443
  uuid: uuid
  alterId: 32
  cipher: auto
  # udp: true
  # network: http
  # http-opts:
  #   # method: 'GET'
  #   # path:
  #   #   - '/'
  #   #   - '/video'
  #   # headers:
  #   #   Connection:
  #   #     - keep-alive
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Vless H2

{% include coding.html language="yaml" code="
- name: 'vless-h2'
  type: vless
  server: server
  port: 443
  uuid: uuid
  alterId: 32
  cipher: auto
  network: h2
  tls: true
  h2-opts:
    host:
      - http.example.com
      - http-alt.example.com
    path: /
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Vless GRPc

{% include coding.html language="yaml" code="
- name: 'vless-grpc'
  type: vless
  server: server
  port: 443
  uuid: uuid
  alterId: 32
  cipher: auto
  network: grpc
  tls: true
  servername: example.com
  # skip-cert-verify: true
  grpc-opts:
    grpc-service-name: 'example'
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Vless Websocket

{% include coding.html language="yaml" code="
- name: 'vless-websocket'
  type: vless
  server: akun-servermu.com
  port: 443
  uuid: xxxx-xxxx-xxxx-xxxxxxxx
  alterId: 32
  cipher: auto
  udp: true
  tls: true
  skip-cert-verify: true
  servername: bugmu.com
  network: ws
  ws-opts:
    path: /path
    headers:
      Host: bugmu.com
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Vless Websocket CDN

{% include coding.html language="yaml" code="
- name: 'vless-websocket-cdn'
  type: vless
  server: ip/bugmu.com
  port: 443
  uuid: xxxx-xxxx-xxxx-xxxxxxxx
  alterId: 32
  cipher: auto
  udp: true
  tls: true
  skip-cert-verify: true
  servername: akun-servermu.com
  network: ws
  ws-opts:
    path: /path
    headers:
      Host: akun-servermu.com
  # interface-name: eth0
  # routing-mark: 1234
" %}
