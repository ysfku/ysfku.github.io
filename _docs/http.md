---
layout: dokuments
title:  "Http"
date: 2024-12-10
categories: [clash]
---

## HTTPS

{% include coding.html language="yaml" code="
- name: 'http'
  type: http
  server: server
  port: 443
  tls: true
  # skip-cert-verify: true
  # sni: custom.com
  # username: username
  # password: password
  # interface-name: eth0
  # routing-mark: 1234
" %}

## HTTP

{% include coding.html language="yaml" code="
- name: 'http'
  type: http
  server: server
  port: 443
  # username: username
  # password: password
  # interface-name: eth0
  # routing-mark: 1234
" %}

