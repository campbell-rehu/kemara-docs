---
title: Generating SSH Keys to access a Proxmox node shell
---

# Background

I have a Proxmox node running in my homelab where I run some LXC containers.

I was learning how to create an Ubuntu virtual machine template through this [Learn Linux TV video](https://youtu.be/MJgIm03Jxdo?si=CvjUQqn7jetgp3Xk) and the presenter described being able to SSH into the Proxmox shell using SSH keys.

I wanted to figure out how to do it and so this is a quick doc outlining the steps I took to get it working.

# 1. Generate a new SSH key pair

First, I generated a new SSH key pair using the `ssh-keygen` command:

```bash
ssh-keygen -t ed25519 -C "root"
```

As part of the prompts, you can give the public and private key files a friendly name. I called mine `proxmox_root`.

Note: I originally thought that the `-C` flag and value needed to match the username that I wanted to login as in the Proxmox Shell i.e. `root` but I have since learned that the `-C` stands for `Comment` and can be any value.

# 2. Add the new SSH key info to the `~/.ssh/config` file

```
Host proxmox                        # give the host a friendly name so the ssh command is easier to remember
  HostName 192.111.1.111            # the IP address of the Proxmox node
  AddKeysToAgent yes                # whether to add the key to the ssh-agent
  User root                         # the user you wish to login as in the Proxmox node shell
  IdentityFile ~/.ssh/proxmox_root  # the key file to use as part of the ssh key exchange
```

# 3. Transfer the public key to the Proxmox node

```bash
ssh-copy-id -i ~/.ssh/proxmox_root root@192.111.1.111
```

This will copy the public key called `proxmox_root.pub` to the Proxmox node for the `root` user in this case.

# 4. SSH into the Proxmox node

```bash
ssh proxmox
```

If everything has gone to plan, this should log you into the Proxmox shell without needing to enter a password.
