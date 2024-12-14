---
title: Mounting an SMB share in Ubuntu
---

# Background

I recently migrated my self hosted instance of [Immich](https://immich.app/) to a new machine but was having difficulties mounting the SMB share which contains all of the existing photo and video backups.
I had set it up successfully on the initial machine but couldn't remember how to do it again and so was just going off of the command history. I got stuck trying to get the share credentials
to be recognised and because it took me too long to figure out what the fix was, I'm documenting the process for future me when I need to mount an SMB share again.

# 1. Edit the `/etc/fstab` file

This is where the definition of share needs to go (along with a bunch of options that I don't fully understand).

Each share definition should be structured like this:

```
//[IP_ADDRESS]/path/to/share/on/source/machine /path/on/destination/machine/to/mount/the/share cifs
vers=3.0,credentials=/path/to/credentials/file,uid=[LOCAL_USER_ID],gid=[LOCAL_USER_GROUP_ID],noserverino 0 0
```

Including the definition in the `/etc/fstab` file means that the share will be remounted whenever the machine starts up.

# 2. Add credentials file

Add the credentials file at the path from the `/etc/fstab` file.

The contents should be structured like this:

```
username=[USERNAME]
password=[PASSWORD]
```

# 3. Install the `cifs-util` package

```bash
sudo apt install cifs-util
```

Apparently, in order for the credentials file to be considered when mounting, we need to have the `cifs-util` package installed.

# 4. Mount the share with one of the following commands

```bash
sudo mount -a # mounts all shares defined in the `/etc/fstab` file
```

```bash
sudo mount -t cifs # mounts only the "cifs" type shares defined in the `/etc/fstab` file
```

Note: the output of `sudo mount -t cifs` should look something like this:

```
//[IP_ADDRESS]/path/to/share/on/source/machine on /path/on/destination/machine/to/mount/the/share type cifs (...username=[USERNAME_FROM_CREDENTIALS_FILE],
uid=[LOCAL_USER_ID],forceuid,gid=[LOCAL_USER_GROUP_ID],forcegid,addr=[IP_ADDRESS]...)
```

The share should be visible at the path listed in the `/etc/fstab` file and have the appropriate read/write permissions as setup for the credentials. If it's not, try rebooting the machine.
