---
title: Updating an LXC container when a systemctl service is masked
---

# Background

I have a Proxmox LXC container running [Nginx Proxy Manager](https://nginxproxymanager.com/). I typically keep it up to date using the [Proxmox Helper Scripts](https://community-scripts.github.io/ProxmoxVE/) — running the same script that was used to install the container in the first place from within the container's console.

When I went to run the update script, it failed partway through. The script needs to build and restart [OpenResty](https://openresty.org/) as a `systemctl` service, but it was reporting that the OpenResty service was masked.

My first assumption was that the issue was related to the container being unprivileged, so I spent some time converting it to a privileged container — but the error persisted after doing so. The actual fix turned out to be unmasking the `openresty.service` directly.

# 1. (Optional) Convert the container from unprivileged to privileged

I tried this first but it didn't resolve the issue, so this step can be skipped. I've included it here for reference.

On the Proxmox host, stop the container and update its config:

```bash
pct stop <CTID>
```

Edit the container config file at `/etc/pve/lxc/<CTID>.conf` and change:

```
unprivileged: 1
```

to:

```
unprivileged: 0
```

Then start the container again:

```bash
pct start <CTID>
```

# 2. Find the masked service symlink

From within the LXC container's console, search for the service file in the `systemd` directories:

```bash
find /etc/systemd /lib/systemd -name "openresty.service"
```

This may return multiple results. A masked service will have a symlink pointing to `/dev/null`. To confirm which result is the symlink, inspect each path:

```bash
ls -la /path/to/openresty.service
```

A masked service will show something like:

```
lrwxrwxrwx 1 root root 9 ... /path/to/openresty.service -> /dev/null
```

# 3. Remove the symlink

Remove the symlink that is masking the service:

```bash
rm /path/to/openresty.service
```

# 4. Reload the systemd daemon

```bash
systemctl daemon-reload
```

This will pick up the change and unmask the service.

# 5. Re-run the update script

With the service unmasked, re-run the Proxmox helper update script from within the container's console. The script should now be able to build and restart OpenResty successfully.
