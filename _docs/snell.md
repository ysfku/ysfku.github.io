---
layout: dokuments
title: "Snell"
date: 2024-12-10
categories: [clash]
---

## Snell

{% include coding.html language="yaml" code="
# No UDP support yet
- name: 'snell'
  type: snell
  server: server
  port: 44046
  psk: yourpsk
  # version: 2
  # obfs-opts:
    # mode: http # or tls
    # host: bing.com
  # interface-name: eth0
  # routing-mark: 1234
" %}
