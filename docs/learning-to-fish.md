---
title: Learning to fish
---

# Background

I was recently introduced to [fish shell](https://fishshell.com/) which, on the surface, appeared to just be another terminal shell. My main shell of choice has been [zsh](https://www.zsh.org/) for a while but I decided to give `fish` a go. The biggest feature of `fish` that I wanted to try out was the built-in autosuggestions. I'm sure there are plugins that can add autosuggestions to `zsh` but this is included in `fish` out of the box. The TL;DR is that I have adopted `fish` as my default shell in all the places and am enjoying figuring out the nuances of it. This doc aims to outline some of the challenges and pitfalls I faced in migrating from `zsh` to `fish`.

# Installation

The simplest part of this process. All I needed to do was go to [fish shell](https://fishshell.com) and follow one of the installation methods at the bottom of the page. (Since my main home machine has an Apple silicon chip, I used the installer package).

# Configuration

Once `fish` was installed, I went about trying to port my `zsh` aliases and configuration to `fish`.

`fish` looks for its main configuration from a file located at `~/.config/fish/config.fish`. I found that I could just copy my aliases from my `~/.zshrc` to the `config.fish` file.

There is also a web-based UI that you can use to change the configuration by typing the command `fish_config`:

<img alt="fish config web-based UI: theme customisation" src="/img/fish-theme-customisation.png" />
<img alt="fish config web-based UI: prompt customisation" src="/img/fish-prompt-customisation.png" />

# The fish language

`fish` has its own scripting language with some differences to the `bash` scripting language.
One such difference I have come across is in the setting of environment variables:

```sh
# in bash
HOMEBREW_PREFIX=/usr/local/bin/brew

# in fish
set HOMEBREW_PREFIX "/usr/local/bin/brew"
```

# Custom Functions

I learned that you can add custom function files in the `~/.config/fish/functions` directory which map directly to commands you can run from the command line.
For example, I created a function to run the command-line Markdown renderer [glow](https://github.com/charmbracelet/glow):

```fish
function glow
	~/go/bin/glow $argv
end
```

This allowed me to run the command `glow` which would run the `glow` executable in the `~/go/bin/glow` directory. The `$argv` is a special variable that appends any additional arguments that are passed in the command-line.

# Running bash scripts

There were instances where I needed to source some `bash` scripts for different commands to work. One such command was [nvm](https://github.com/nvm-sh/nvm).

To get `nvm` to work, I found that I could use a plugin called [bass](https://github.com/edc/bass). I decided to install a plugin manager called [fisher](https://github.com/jorgebucaran/fisher) in order to install `bass`.

With `fisher` and `bass` installed, I was then able to create a new functions file called `nvm.fish` with the following contents:

```fish
function nvm
	bass source ~/.nvm/nvm.sh -- no-use ';' nvm $argv
end
```

Then I would be able to run the `nvm` command as normal.

Note: I just found that someone created a `fish` shell port of `nvm` called [nvim.fish](https://github.com/jorgebucaran/nvm.fish) which is written in native `fish` and can be installed with `fisher`. So you should probably just use that instead :sweat_smile:

# fish script built-ins

`fish` has a lot of built-in commands that can be run in a `.fish` script. One such built-in is [argparse](https://fishshell.com/docs/current/cmds/argparse.html). I was able to use this built-in to create a custom function that would allow me to pass optional arguments along with a command to adjust the output:

```fish
function doThing
	argparse 'o/opt' 'a/another' -- $argv
	if set -q _flag_opt
		# do something
	end
	if set -q _flag_another
		# do something else
	end
end
```

The above function `doThing` accepts two optional arguments:

1. `o/opt`
2. `a/another'
The character before the `/`is the short option and the string after the`/`is the long option i.e you could use`-o`or`--option`

`argparse` parses the optional arguments from the `$argv` variable and gives them names in the format `_flag_[LONG_OPTION_NAME]. Then you can verify that the flags exist using `if set -q \_flag_opt`.

# Conclusion

These are just some of the things that I have learned so far in moving to `fish` and there's so much more to learn which feels exciting. Maybe I'll write a continuation of my learnings in the future but so far, the transition has been smooth and interesting.
