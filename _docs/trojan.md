---
layout: dokuments
title: "Trojan"
date: 2024-12-10
categories: [clash]
---

## Trojan

#### Trojan SNI

{% include coding.html language="yaml" code="
- name: 'trojan'
  type: trojan
  server: isikan-servermu.com
  port: 443
  password: xxxx-xxxx-xxxx-xxxxxxxxxxx
  sni: isikan-bugmu.com
  udp: true
  skip-cert-verify: true
  # alpn:
  #   - h2
  #   - http/1.1
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Trojan Websocket

{% include coding.html language="yaml" code="
- name: 'trojan-ws'
  type: trojan
  server: isikan-bugmu.com
  port: 443
  password: xxxx-xxxx-xxxx-xxxxxxxxxxx
  network: ws
  sni: isikan-servermu.com
  skip-cert-verify: true
  udp: true
  ws-opts:
    path: /path
    headers:
      Host: isikan-servermu.com
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Trojan GRPc

{% include coding.html language="yaml" code="
- name: 'trojan-grpc'
  type: trojan
  server: isikan-servermu.com
  port: 443
  password: xxxx-xxxx-xxxx-xxxxxxxxxxx
  network: grpc
  sni: isikan-bugmu.com
  skip-cert-verify: true
  udp: true
  grpc-opts:
    grpc-service-name: 'isikan-service-namemu'
  # interface-name: eth0
  # routing-mark: 1234
" %}
