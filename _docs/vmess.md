---
layout: dokuments
title: "Vmess"
date: 2024-12-10
categories: [clash]
---

## Vmess

#### Vmess Dasar

{% include coding.html language="yaml" code="
- name: 'vmess'
  type: vmess
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

#### Vmess HTTP

{% include coding.html language="yaml" code="
- name: 'vmess-http'
  type: vmess
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

#### Vmess H2

{% include coding.html language="yaml" code="
- name: 'vmess-h2'
  type: vmess
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

#### Vmess GRPc

{% include coding.html language="yaml" code="
- name: 'vmess-grpc'
  type: vmess
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

#### Vmess Websocket

{% include coding.html language="yaml" code="
- name: 'vmess-websocket'
  type: vmess
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

#### Vmess Websocket CDN

{% include coding.html language="yaml" code="
- name: 'vmess-websocket-cdn'
  type: vmess
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
