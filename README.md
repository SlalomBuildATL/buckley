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

Tags can be combined for various purposes. If you're going to be doing full-stack development on an cloud-based project, you can do `bcli install --tag frontend,devops,cloud` 

Teams can opt to bundle all of their packages under a tag. For example, if you're a developer on the Avalon team,you can install all the packages needed for development on the project by running `bcli install --tag avalon`

## Coming Soon
- Bootstrappers for different kinds of projects/services
- Abstract funtionality for making commits, running tests, shipping code, etc
- Project-specific configs
