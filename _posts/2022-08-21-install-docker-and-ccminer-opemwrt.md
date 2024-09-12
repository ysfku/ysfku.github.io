---
layout: post
title:  "Install Docker and CCminer Openwrt"
categories: Linux
tags:  Mining Docker
author: Muhammad Yusuf
---

* content
{:toc}

## step 1

go to terminal, copy and paste

```
opkg update && opkg install docker dockerd docker-compose luci-app-dockerman.
```

## step 2

got to interface and check interface docker to firewall docker check.

## step 3

go to docker hub and click search andarezta and go to tags to copy A53 pull command.

## step 4

go to terminal openwrt and paste pull command, please wait download and extract image to docker

## step 5

go to docker container and add. create name, port, image to andarezta and insert command:

```
docker run andarezta/andarezta-ccminer -a verus -o stratum+tcp://ap.luckpool.net:3956 -u (your wallet).(name rig) -p x -t 3
```

save configuration

## step 6

select container and start, go to edit and logs for watch proccess.

create ewallet [verus mobile](https://play.google.com/store/apps/details?id=org.autonomoussoftwarefoundation.verusmobile.android).