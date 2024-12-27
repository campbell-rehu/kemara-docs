---
title: Upgrading Ubuntu after end of life support
---

# Background

I have a number of virtual machines running in my homelab that were created using Ubuntu 23.04 (Lunar).
There isn't a direct upgrade path from Ubuntu 23.04 to the latest version of Ubuntu so I needed to manually upgrade the OS.
This document is to save me some googling so I can remember how to do it in the future.

# 1. Download version-specific upgrade tool

First, download the version-specific upgrade tool for the version of Ubuntu you are upgrading to from the [Ubuntu Change Logs](https://changelogs.ubuntu.com/meta-release).

```bash

wget http://archive.ubuntu.com/ubuntu/dists/mantic-updates/main/dist-upgrader-all/current/mantic.tar.gz

```

Note: in some instances, you may need to upgrade to an interim version before upgrading to the latest version.
In my case, I needed to upgrade from 23.04 to 23.10 before upgrading to 24.04.

Note: if you receive a `404 Not Found` error, you may need to change the URL to use the `old-releases` subdomain instead of `archive`.

# 2. Extract the upgrade tool and run the executable with the name of the new version

```bash

tar -xaf mantic.tar.gz
sudo ./mantic

```
