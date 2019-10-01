```
  ____             _    _
 | __ ) _   _  ___| | _| | ___ _   _
 |  _ \| | | |/ __| |/ / |/ _ \ | | |
 | |_) | |_| | (__|   <| |  __/ |_| |
 |____/ \__,_|\___|_|\_\_|\___|\__, |
                               |___/
########################### Build CLI (bcli)
```
A Command Line Interface for Build Teams

# What is Buckley? 
Buckley is an opinionated CLI tool made to help Build Teams with rapid development. 
It automates the provisioning of workstations with a set of tools and configurations to minimize time spent onboarding new team members and share good practices via tooling. 

# Installation
To get started, run: 

`curl https://raw.githubusercontent.com/FooBarRaz/buckley/master/bootstrap.sh | bash`


Once `bcli` is installed, you can run `bcli --help` for a list of available commands.


# Features
## Workstation Setup (`bcli install`)
Buckley has a library of useful tools and packages that can be easily installed on your workstation via the command line.
### Usage
For a list of available packages run `bcli install --list`

To install all available packages, run `bcli install --all`

### Tags
Packages are organized by tags. To install all recommended packages, run `bcli install --tag recommended`

Tags can be combined for various purposes. E.g. If you're going to be doing full-stack development on an cloud-based project, you can do `bcli install --tag frontend,devops,cloud` to install relevant tools.

Teams can opt to bundle all of their packages under a tag. For example, if you're a developer on the Avalon team,you can install all the packages needed for development on that project by running `bcli install --tag avalon`

## Contributing
The CLI is built using Node.js. There is a large variety of powerful tools available for building CLIs in Node.js, and JS skills tend to be more ubiquitous on most teams than bash skills. Even if you're particularly good at bash scripting, you'll find that it's a lot easier to do things in JS that would otherwise be quite painful to accomplish in bash. 

This project, like most, is a perpetual work-in-progress and is intended to be maintained by the collective Build community. 
Please feel free to make enhancements and improvements as you see fit, and merge directly to master (for now). 

### References
Here are some useful libraries that are currently (or will soon be) in use in this project. 

- [Commander.js](https://github.com/tj/commander.js/) - a powerful tool for building out command-line interfaces. Provides useful functions for organizing commands, parsing arguments, and outputting help. 
- [Chalk](https://github.com/chalk/chalk) - A handy text-styling tool
- [JS Config Store](https://github.com/andrewhayward/js-config-store) - a tool for storing and reading local configs
- [Figlet](https://www.npmjs.com/package/figlet) - ASCII-based banners
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) - A tool for creating command-line prompts
- [Child Process](https://nodejs.org/api/child_process.html) - A node.js module that provides the ability to execute shell commands and spawn child processes


## Coming Soon
- Bootstrappers for different kinds of projects/services
- Abstract funtionality for making commits, running tests, shipping code, etc
- Project-specific configs
