---
layout: dokuments
title: "Proxy Provider"
date: 2024-12-10
categories: [clash]
---

## Type Http

{% include coding.html language="yaml" code="
proxy-providers:
  provider1:
    type: http
    url: 'url'
    interval: 3600
    path: ./provider1.yaml
    # filter: 'a|b' # golang regex string
    health-check:
      enable: true
      interval: 600
      # lazy: true
      url: http://www.gstatic.com/generate_204
" %}

## Type File

{% include coding.html language="yaml" code="
proxy-providers:
  test:
    type: file
    path: /test.yaml
    health-check:
      enable: true
      interval: 36000
      url: http://www.gstatic.com/generate_204
" %}
