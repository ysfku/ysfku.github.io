---
layout: dokuments
title: "Shadowsocks"
date: 2024-12-10
categories: [clash]
---

## Shadowsocks

#### Shadowsocks Dasar

{% include coding.html language="yaml" code="
- name: 'ss1'
  type: ss
  server: server
  port: 443
  cipher: chacha20-ietf-poly1305
  password: 'password'
  # udp: true
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Shadowsocks OBFS

{% include coding.html language="yaml" code="
- name: 'ss2'
  type: ss
  server: server
  port: 443
  cipher: chacha20-ietf-poly1305
  password: 'password'
  plugin: obfs
  plugin-opts:
    mode: tls # or http
    # host: bing.com
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Shadowsocks Websocket

{% include coding.html language="yaml" code="
- name: 'ss3'
  type: ss
  server: server
  port: 443
  cipher: chacha20-ietf-poly1305
  password: 'password'
  plugin: v2ray-plugin
  plugin-opts:
    mode: websocket # no QUIC now
    # tls: true # wss
    # skip-cert-verify: true
    # host: bing.com
    # path: '/'
    # mux: true
    # headers:
    #   custom: value
  # interface-name: eth0
  # routing-mark: 1234
" %}

#### Shadowsocks R

{% include coding.html language="yaml" code="
- name: 'ssr'
  type: ssr
  server: server
  port: 443
  cipher: chacha20-ietf
  password: 'password'
  obfs: tls1.2_ticket_auth
  protocol: auth_sha1_v4
  # obfs-param: domain.tld
  # protocol-param: '#'
  # udp: true
  # interface-name: eth0
  # routing-mark: 1234
" %}
