---
title: Configuration
tags: [openclash]
keywords: configruation, konfigurasi
summary: "Langkah pengaturan konfigurasi openclash."
sidebar: openclash
permalink: configuration-openclash.html
folder: openclash
---

Berikut adalah contoh konfigurasi dasar OpenClash yang bersumber dari Master WiFi Network Solution:

```yaml
# Script Konfigurasi OpenClash
# Bersumber dari Master WiFi Network Solution

# 官方配置模板：https://github.com/Dreamacro/clash/wiki/Configuration
# Meta配置模板：https://github.com/MetaCubeX/Clash.Meta/blob/Alpha/docs/config.yaml
# 接管：部分参数不支持在此页面直接修改，请到全局设置页面进行修改

# Port of HTTP(S) proxy server on the local end
port: 7890

# Port of SOCKS5 proxy server on the local end
socks-port: 7891

# Transparent proxy server port for Linux and macOS (Redirect TCP and TProxy UDP)
redir-port: 7892

# Transparent proxy server port for Linux (TProxy TCP and TProxy UDP)
tproxy-port: 7893

# HTTP(S) and SOCKS4(A)/SOCKS5 server on the same port
mixed-port: 7893

# authentication of local SOCKS5/HTTP(S) server
# authentication:
#  - "user1:pass1"
#  - "user2:pass2"

# Set to true to allow connections to the local-end server from
# other LAN IP addresses
allow-lan: true

# This is only applicable when `allow-lan` is `true`
# '*': bind all IP addresses
# 192.168.122.11: bind a single IPv4 address
# "[aaaa::a8aa:ff:fe09:57d8]": bind a single IPv6 address
bind-address: '*'

# Clash router working mode
# rule: rule-based packet routing
# global: all packets will be forwarded to a single endpoint
# direct: directly forward the packets to the Internet
mode: rule

# Clash by default prints logs to STDOUT
# info / warning / error / debug / silent
# log-level: info

# When set to false, resolver won't translate hostnames to IPv6 addresses
# ipv6: false

# RESTful web API listening address
external-controller: 127.0.0.1:9090

# A relative path to the configuration directory or an absolute path to a
# directory in which you put some static web resource. Clash core will then
# serve it at `http://{{external-controller}}/ui`.
# external-ui: folder

# Secret for the RESTful API (optional)
# Authenticate by spedifying HTTP header `Authorization: Bearer ${secret}`
# ALWAYS set a secret if RESTful API is listening on 0.0.0.0
# secret: ""

# Outbound interface name
# interface-name: en0

# fwmark on Linux only
# routing-mark: 6666

# Static hosts for DNS server and connection establishment (like /etc/hosts)
#
# Wildcard hostnames are supported (e.g. *.clash.dev, *.foo.*.example.com)
# Non-wildcard domain names have a higher priority than wildcard domain names
# e.g. foo.example.com > *.example.com > .example.com
# P.S. +.foo.com equals to .foo.com and foo.com
hosts:
  # '*.clash.dev': 127.0.0.1
  # '.dev': 127.0.0.1
  # 'alpha.clash.dev': '::1'

profile:
  # Store the `select` results in $HOME/.config/clash/.cache
  # set false If you don't want this behavior
  # when two different configurations have groups with the same name, the selected values are shared
  store-selected: true

  # persistence fakeip
  store-fake-ip: true

# DNS server settings
# This section is optional. When not present, the DNS server will be disabled.
dns:
  enable: true
  listen: 0.0.0.0:53
  # ipv6: false # when the false, response to AAAA questions will be empty

  # These nameservers are used to resolve the DNS nameserver hostnames below.
  # Specify IP addresses only
  default-nameserver:
    - 114.114.114.114
    - 8.8.8.8
  enhanced-mode: fake-ip # or redir-host (not recommended)
  fake-ip-range: 198.18.0.1/16 # Fake IP addresses pool CIDR
  # use-hosts: true # lookup hosts and return IP record
  
  # Hostnames in this list will not be resolved with fake IPs
  # i.e. questions to these domain names will always be answered with their
  # real IP addresses
  # fake-ip-filter:
  #   - '*.lan'
  #   - localhost.ptlogin2.qq.com

  # The matching mode of fake-ip-filter is set to a blacklist by default.
  # That is, fake-ip is not returned if the matching succeeds
  # It can be set to whitelist, that is, fake-ip is returned only after the match is successful
  fake-ip-filter-mode: blacklist
  
  # Supports UDP, TCP, DoT, DoH. You can specify the port to connect to.
  # All DNS questions are sent directly to the nameserver, without proxies
  # involved. Clash answers the DNS question with the first result gathered.
  nameserver:
    - 114.114.114.114 # default value
    #- 8.8.8.8 # default value
    #- tls://dns.rubyfish.cn:853 # DNS over TLS
    #- https://1.1.1.1/dns-query # DNS over HTTPS
    #- dhcp://en0 # dns from dhcp
    # - '8.8.8.8#en0'

  # When `fallback` is present, the DNS server will send concurrent requests
  # to the servers in this section along with servers in `nameservers`.
  # The answers from fallback servers are used when the GEOIP country
  # is not `CN`.
  # fallback:
  #   - tcp://1.1.1.1
  #   - 'tcp://1.1.1.1#en0'

  # If IP addresses resolved with servers in `nameservers` are in the specified
  # subnets below, they are considered invalid and results from `fallback`
  # servers are used instead.
  #
  # IP address resolved with servers in `nameserver` is used when
  # `fallback-filter.geoip` is true and when GEOIP of the IP address is `CN`.
  #
  # If `fallback-filter.geoip` is false, results from `nameserver` nameservers
  # are always used if not match `fallback-filter.ipcidr`.
  #
  # This is a countermeasure against DNS pollution attacks.
  # fallback-filter:
  #   geoip: true
  #   geoip-code: CN
  #   ipcidr:
  #     - 240.0.0.0/4
  #   domain:
  #     - '+.google.com'
  #     - '+.facebook.com'
  #     - '+.youtube.com'
  
  # Lookup domains via specific nameservers
  # nameserver-policy:
  #   'www.baidu.com': '114.114.114.114'
  #   '+.internal.crop.com': '10.0.0.1'

proxies:
  # Shadowsocks
  # The supported ciphers (encryption methods):
  #   aes-128-gcm aes-192-gcm aes-256-gcm
  #   aes-128-cfb aes-192-cfb aes-256-cfb
  #   aes-128-ctr aes-192-ctr aes-256-ctr
  #   rc4-md5 chacha20-ietf xchacha20
  #   chacha20-ietf-poly1305 xchacha20-ietf-poly1305
  - name: "ss1"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    # udp: true

  - name: "ss2"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    plugin: obfs
    plugin-opts:
      mode: tls # or http
      # host: bing.com

  - name: "ss3"
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: "password"
    plugin: v2ray-plugin
    plugin-opts:
      mode: websocket # no QUIC now
      # tls: true # wss
      # skip-cert-verify: true
      # host: bing.com
      # path: "/"
      # mux: true
      # headers:
      #   custom: value

  # vmess
  # cipher support auto/aes-128-gcm/chacha20-poly1305/none
  - name: "vmess"
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

  - name: "vmess-h2"
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
  
  - name: "vmess-http"
    type: vmess
    server: server
    port: 443
    uuid: uuid
    alterId: 32
    cipher: auto
    # udp: true
    # network: http
    # http-opts:
    #   # method: "GET"
    #   # path:
    #   #   - '/'
    #   #   - '/video'
    #   # headers:
    #   #   Connection:
    #   #     - keep-alive

  - name: vmess-grpc
    server: server
    port: 443
    type: vmess
    uuid: uuid
    alterId: 32
    cipher: auto
    network: grpc
    tls: true
    servername: example.com
    # skip-cert-verify: true
    grpc-opts:
      grpc-service-name: "example"

  # socks5
  - name: "socks"
    type: socks5
    server: server
    port: 443
    # username: username
    # password: password
    # tls: true
    # skip-cert-verify: true
    # udp: true

  # http
  - name: "http"
    type: http
    server: server
    port: 443
    # username: username
    # password: password
    # tls: true # https
    # skip-cert-verify: true
    # sni: custom.com

  # Snell
  # Beware that there's currently no UDP support yet
  - name: "snell"
    type: snell
    server: server
    port: 44046
    psk: yourpsk
    # version: 2
    # obfs-opts:
      # mode: http # or tls
      # host: bing.com

  # Trojan
  - name: "trojan"
    type: trojan
    server: server
    port: 443
    password: yourpsk
    # udp: true
    # sni: example.com # aka server name
    # alpn:
    #   - h2
    #   - http/1.1
    # skip-cert-verify: true

  - name: trojan-grpc
    server: server
    port: 443
    type: trojan
    password: "example"
    network: grpc
    sni: example.com
    # skip-cert-verify: true
    udp: true
    grpc-opts:
      grpc-service-name: "example"

  - name: trojan-ws
    server: server
    port: 443
    type: trojan
    password: "example"
    network: ws
    sni: example.com
    # skip-cert-verify: true
    udp: true
    # ws-opts:
      # path: /path
      # headers:
      #   Host: example.com

  # ShadowsocksR
  # The supported ciphers (encryption methods): all stream ciphers in ss
  # The supported obfses:
  #   plain http_simple http_post
  #   random_head tls1.2_ticket_auth tls1.2_ticket_fastauth
  # The supported supported protocols:
  #   origin auth_sha1_v4 auth_aes128_md5
  #   auth_aes128_sha1 auth_chain_a auth_chain_b  
  - name: "ssr"
    type: ssr
    server: server
    port: 443
    cipher: chacha20-ietf
    password: "password"
    obfs: tls1.2_ticket_auth
    protocol: auth_sha1_v4
    # obfs-param: domain.tld
    # protocol-param: "#"
    # udp: true

proxy-groups:
  # relay chains the proxies. proxies shall not contain a relay. No UDP support.
  # Traffic: clash <-> http <-> vmess <-> ss1 <-> ss2 <-> Internet
  - name: "relay"
    type: relay
    proxies:
      - http
      - vmess
      - ss1
      - ss2

  # url-test select which proxy will be used by benchmarking speed to a URL.
  - name: "auto"
    type: url-test
    proxies:
      - ss1
      - ss2
      - vmess1
    # tolerance: 150
    # lazy: true
    url: 'http://www.gstatic.com/generate_204'
    interval: 300

  # fallback selects an available policy by priority. The availability is tested by accessing an URL, just like an auto url-test group.
  - name: "fallback-auto"
    type: fallback
    proxies:
      - ss1
      - ss2
      - vmess1
    url: 'http://www.gstatic.com/generate_204'
    interval: 300

  # load-balance: The request of the same eTLD+1 will be dial to the same proxy.
  - name: "load-balance"
    type: load-balance
    proxies:
      - ss1
      - ss2
      - vmess1
    url: 'http://www.gstatic.com/generate_204'
    interval: 300
    # strategy: consistent-hashing # or round-robin

  # select is used for selecting proxy or proxy group
  # you can use RESTful API to switch proxy is recommended for use in GUI.
  - name: Proxy
    type: select
    # disable-udp: true
    proxies:
      - ss1
      - ss2
      - vmess1
      - auto
 
  # direct to another infacename or fwmark, also supported on proxy
  - name: en1
    type: select
    interface-name: en1
    routing-mark: 6667
    proxies:
      - DIRECT 

  - name: UseProvider
    type: select
    use:
      - provider1
    proxies:
      - Proxy
      - DIRECT

proxy-providers:
  provider1:
    type: http
    url: "url"
    interval: 3600
    path: ./provider1.yaml
    health-check:
      enable: true
      interval: 600
      # lazy: true
      url: http://www.gstatic.com/generate_204
  test:
    type: file
    path: /test.yaml
    health-check:
      enable: true
      interval: 36000
      url: http://www.gstatic.com/generate_204

tunnels:
  # one line config
  #- tcp/udp,127.0.0.1:6553,114.114.114.114:53,proxy
  #- tcp,127.0.0.1:6666,rds.mysql.com:3306,vpn
  # full yaml config
  #- network: [tcp, udp]
  #  address: 127.0.0.1:7777
  #  target: target.com
  #  proxy: proxy

rules:
  - DOMAIN-SUFFIX,google.com,auto
  - DOMAIN-KEYWORD,google,auto
  - DOMAIN,google.com,auto
  - DOMAIN-SUFFIX,ad.com,REJECT
  - SRC-IP-CIDR,192.168.1.201/32,DIRECT
  # optional param "no-resolve" for IP rules (GEOIP, IP-CIDR, IP-CIDR6)
  - IP-CIDR,127.0.0.0/8,DIRECT
  - GEOIP,CN,DIRECT
  - DST-PORT,80,DIRECT
  - SRC-PORT,7777,DIRECT
  - RULE-SET,apple,REJECT # Premium only
  - MATCH,auto
```

Dan saya sertakan juga contoh untuk pengguna mode script

```yaml
rules:
- RULE-SET, Reject, AdBlock
- RULE-SET, Special, DIRECT
- RULE-SET, Netflix, Netflix
- RULE-SET, Disney Plus, Disney
- RULE-SET, YouTube, YouTube
- RULE-SET, Spotify, Spotify
- RULE-SET, Bilibili, Asian TV
- RULE-SET, IQ, Asian TV
- RULE-SET, IQIYI, Asian TV
- RULE-SET, Letv, Asian TV
- RULE-SET, Netease Music, Asian TV
- RULE-SET, Tencent Video, Asian TV
- RULE-SET, Youku, Asian TV
- RULE-SET, WeTV, Asian TV
- RULE-SET, ABC, Global TV
- RULE-SET, Abema TV, Global TV
- RULE-SET, Amazon, Global TV
- RULE-SET, Bahamut, Global TV
- RULE-SET, BBC iPlayer, Global TV
- RULE-SET, DAZN, Global TV
- RULE-SET, Discovery Plus, Global TV
- RULE-SET, encoreTVB, Global TV
- RULE-SET, F1 TV, Global TV
- RULE-SET, Fox Now, Global TV
- RULE-SET, Fox+, Global TV
- RULE-SET, HBO Go, Global TV
- RULE-SET, HBO Max, Global TV
- RULE-SET, Hulu Japan, Global TV
- RULE-SET, Hulu, Global TV
- RULE-SET, Japonx, Global TV
- RULE-SET, JOOX, Global TV
- RULE-SET, KKBOX, Global TV
- RULE-SET, KKTV, Global TV
- RULE-SET, Line TV, Global TV
- RULE-SET, myTV SUPER, Global TV
- RULE-SET, Niconico, Global TV
- RULE-SET, Pandora, Global TV
- RULE-SET, PBS, Global TV
- RULE-SET, Pornhub, Global TV
- RULE-SET, Soundcloud, Global TV
- RULE-SET, ViuTV, Global TV
- RULE-SET, Apple Music, Apple TV
- RULE-SET, Apple News, Apple TV
- RULE-SET, Apple TV, Apple TV
- RULE-SET, Apple, Apple
- RULE-SET, Telegram, Telegram
- RULE-SET, Crypto, Crypto
- RULE-SET, Discord, Discord
- RULE-SET, Google FCM, Google FCM
- RULE-SET, Microsoft, Microsoft
- RULE-SET, OpenAI, OpenAI
- RULE-SET, PayPal, PayPal
- RULE-SET, Scholar, Scholar
- RULE-SET, Speedtest, Speedtest
- RULE-SET, Steam, Steam
- RULE-SET, miHoYo, miHoYo
- RULE-SET, PROXY, Proxy
- RULE-SET, Domestic, Domestic
- RULE-SET, Domestic IPs, Domestic
- RULE-SET, LAN, DIRECT
- GEOIP, CN, Domestic
- MATCH, Others
script:
  code: |
    def main(ctx, metadata):
        ruleset_action = {
            'Reject': 'AdBlock',
            'Special': 'DIRECT',
            'Netflix': 'Netflix',
            'Disney Plus': 'Disney',
            'YouTube': 'YouTube',
            'Spotify': 'Spotify',
            'Bilibili': 'Asian TV',
            'IQ': 'Asian TV',
            'IQIYI': 'Asian TV',
            'Letv': 'Asian TV',
            'Netease Music': 'Asian TV',
            'Tencent Video': 'Asian TV',
            'Youku': 'Asian TV',
            'WeTV': 'Asian TV',
            'ABC': 'Global TV',
            'Abema TV': 'Global TV',
            'Amazon': 'Global TV',
            'Bahamut': 'Global TV',
            'BBC iPlayer': 'Global TV',
            'DAZN': 'Global TV',
            'Discovery Plus': 'Global TV',
            'encoreTVB': 'Global TV',
            'F1 TV': 'Global TV',
            'Fox Now': 'Global TV',
            'Fox+': 'Global TV',
            'HBO Go': 'Global TV',
            'HBO Max': 'Global TV',
            'Hulu Japan': 'Global TV',
            'Hulu': 'Global TV',
            'Japonx': 'Global TV',
            'JOOX': 'Global TV',
            'KKBOX': 'Global TV',
            'KKTV': 'Global TV',
            'Line TV': 'Global TV',
            'myTV SUPER': 'Global TV',
            'Niconico': 'Global TV',
            'Pandora': 'Global TV',
            'PBS': 'Global TV',
            'Pornhub': 'Global TV',
            'Soundcloud': 'Global TV',
            'ViuTV': 'Global TV',
            'Apple Music': 'Apple TV',
            'Apple News': 'Apple TV',
            'Apple TV': 'Apple TV',
            'Apple': 'Apple',
            'Telegram': 'Telegram',
            'Crypto': 'Crypto',
            'Discord': 'Discord',
            'Google FCM': 'Google FCM',
            'Microsoft': 'Microsoft',
            'OpenAI': 'OpenAI',
            'PayPal': 'PayPal',
            'Scholar': 'Scholar',
            'Speedtest': 'Speedtest',
            'Steam': 'Steam',
            'miHoYo': 'miHoYo',
            'PROXY': 'Proxy',
            'Domestic': 'Domestic',
            'Domestic IPs': 'Domestic',
            'LAN': 'DIRECT'
          }

        port = int(metadata['dst_port'])

        if metadata['network'] == 'UDP' and port == 443:
            ctx.log('[Script] matched QUIC traffic use reject')
            return 'REJECT'

        port_list = [21, 22, 23, 53, 80, 123, 143, 194, 443, 465, 587, 853, 993, 995, 998, 2052, 2053, 2082, 2083, 2086, 2095, 2096, 3389, 5222, 5228, 5229, 5230, 8080, 8443, 8880, 8888, 8889]
        if port not in port_list:
            ctx.log('[Script] not common port use direct')
            return 'DIRECT'

        if metadata['dst_ip'] == '':
            metadata['dst_ip'] = ctx.resolve_ip(metadata['host'])

        for ruleset in ruleset_action:
            if ctx.rule_providers[ruleset].match(metadata):
                return ruleset_action[ruleset]

        if metadata['dst_ip'] != '':
            code = ctx.geoip(metadata['dst_ip'])
            if code == 'CN':
                ctx.log('[Script] Geoip CN')
                return 'Domestic'

        ctx.log('[Script] FINAL')
        return 'Others'
rule-providers:
  Reject:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Reject.yaml
    path: "./Rules/Reject"
    interval: 86400
  Special:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Special.yaml
    path: "./Rules/Special"
    interval: 86400
  PROXY:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Proxy.yaml
    path: "./Rules/Proxy"
    interval: 86400
  Domestic:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Domestic.yaml
    path: "./Rules/Domestic"
    interval: 86400
  Domestic IPs:
    type: http
    behavior: ipcidr
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Domestic%20IPs.yaml
    path: "./Rules/Domestic_IPs"
    interval: 86400
  LAN:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/LAN.yaml
    path: "./Rules/LAN"
    interval: 86400
  Netflix:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Netflix.yaml
    path: "./Rules/Media/Netflix"
    interval: 86400
  Spotify:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Spotify.yaml
    path: "./Rules/Media/Spotify"
    interval: 86400
  YouTube:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/YouTube.yaml
    path: "./Rules/Media/YouTube"
    interval: 86400
  Bilibili:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Bilibili.yaml
    path: "./Rules/Media/Bilibili"
    interval: 86400
  IQ:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/IQ.yaml
    path: "./Rules/Media/IQI"
    interval: 86400
  IQIYI:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/IQIYI.yaml
    path: "./Rules/Media/IQYI"
    interval: 86400
  Letv:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Letv.yaml
    path: "./Rules/Media/Letv"
    interval: 86400
  Netease Music:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Netease%20Music.yaml
    path: "./Rules/Media/Netease_Music"
    interval: 86400
  Tencent Video:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Tencent%20Video.yaml
    path: "./Rules/Media/Tencent_Video"
    interval: 86400
  Youku:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Youku.yaml
    path: "./Rules/Media/Youku"
    interval: 86400
  WeTV:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/WeTV.yaml
    path: "./Rules/Media/WeTV"
    interval: 86400
  ABC:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/ABC.yaml
    path: "./Rules/Media/ABC"
    interval: 86400
  Abema TV:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Abema%20TV.yaml
    path: "./Rules/Media/Abema_TV"
    interval: 86400
  Amazon:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Amazon.yaml
    path: "./Rules/Media/Amazon"
    interval: 86400
  Apple Music:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Apple%20Music.yaml
    path: "./Rules/Media/Apple_Music"
    interval: 86400
  Apple News:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Apple%20News.yaml
    path: "./Rules/Media/Apple_News"
    interval: 86400
  Apple TV:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Apple%20TV.yaml
    path: "./Rules/Media/Apple_TV"
    interval: 86400
  Bahamut:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Bahamut.yaml
    path: "./Rules/Media/Bahamut"
    interval: 86400
  BBC iPlayer:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/BBC%20iPlayer.yaml
    path: "./Rules/Media/BBC_iPlayer"
    interval: 86400
  DAZN:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/DAZN.yaml
    path: "./Rules/Media/DAZN"
    interval: 86400
  Discovery Plus:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Discovery%20Plus.yaml
    path: "./Rules/Media/Discovery_Plus"
    interval: 86400
  Disney Plus:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Disney%20Plus.yaml
    path: "./Rules/Media/Disney_Plus"
    interval: 86400
  encoreTVB:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/encoreTVB.yaml
    path: "./Rules/Media/encoreTVB"
    interval: 86400
  F1 TV:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/F1%20TV.yaml
    path: "./Rules/Media/F1_TV"
    interval: 86400
  Fox Now:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Fox%20Now.yaml
    path: "./Rules/Media/Fox_Now"
    interval: 86400
  Fox+:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Fox%2B.yaml
    path: "./Rules/Media/Fox+"
    interval: 86400
  HBO Go:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/HBO%20Go.yaml
    path: "./Rules/Media/HBO_Go"
    interval: 86400
  HBO Max:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/HBO%20Max.yaml
    path: "./Rules/Media/HBO_Max"
    interval: 86400
  Hulu Japan:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Hulu%20Japan.yaml
    path: "./Rules/Media/Hulu_Japan"
    interval: 86400
  Hulu:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Hulu.yaml
    path: "./Rules/Media/Hulu"
    interval: 86400
  Japonx:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Japonx.yaml
    path: "./Rules/Media/Japonx"
    interval: 86400
  JOOX:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/JOOX.yaml
    path: "./Rules/Media/JOOX"
    interval: 86400
  KKBOX:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/KKBOX.yaml
    path: "./Rules/Media/KKBOX"
    interval: 86400
  KKTV:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/KKTV.yaml
    path: "./Rules/Media/KKTV"
    interval: 86400
  Line TV:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Line%20TV.yaml
    path: "./Rules/Media/Line_TV"
    interval: 86400
  myTV SUPER:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/myTV%20SUPER.yaml
    path: "./Rules/Media/myTV_SUPER"
    interval: 86400
  Niconico:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Niconico.yaml
    path: "./Rules/Media/Niconico"
    interval: 86400
  Pandora:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Pandora.yaml
    path: "./Rules/Media/Pandora"
    interval: 86400
  PBS:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/PBS.yaml
    path: "./Rules/Media/PBS"
    interval: 86400
  Pornhub:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Pornhub.yaml
    path: "./Rules/Media/Pornhub"
    interval: 86400
  Soundcloud:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/Soundcloud.yaml
    path: "./Rules/Media/Soundcloud"
    interval: 86400
  ViuTV:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Media/ViuTV.yaml
    path: "./Rules/Media/ViuTV"
    interval: 86400
  Telegram:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Telegram.yaml
    path: "./Rules/Telegram"
    interval: 86400
  Crypto:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Crypto.yaml
    path: "./Rules/Crypto"
    interval: 86400
  Discord:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Discord.yaml
    path: "./Rules/Discord"
    interval: 86400
  Steam:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Steam.yaml
    path: "./Rules/Steam"
    interval: 86400
  Speedtest:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Speedtest.yaml
    path: "./Rules/Speedtest"
    interval: 86400
  PayPal:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/PayPal.yaml
    path: "./Rules/PayPal"
    interval: 86400
  Microsoft:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Microsoft.yaml
    path: "./Rules/Microsoft"
    interval: 86400
  OpenAI:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/OpenAI.yaml
    path: "./Rules/OpenAI"
    interval: 86400
  Apple:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Apple.yaml
    path: "./Rules/Apple"
    interval: 86400
  Google FCM:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Google%20FCM.yaml
    path: "./Rules/Google FCM"
    interval: 86400
  Scholar:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/Scholar.yaml
    path: "./Rules/Scholar"
    interval: 86400
  miHoYo:
    type: http
    behavior: classical
    url: https://fastly.jsdelivr.net/gh/dler-io/Rules@main/Clash/Provider/miHoYo.yaml
    path: "./Rules/miHoYo"
    interval: 86400
```

{% include links.html %}