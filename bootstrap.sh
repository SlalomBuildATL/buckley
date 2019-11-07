#!/bin/bash

function install_node() {
    #install nvm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
    
    # setup nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    
    # setup node
    nvm install 10.13.0
    nvm use 10.13.0
    echo "Node.js/NPM was successfully installed via Node Version Manager (NVM). Visit https://github.com/nvm-sh/nvm for more information on how to use NVM."
}

function install_buckley() {
    mkdir -p ~/dev
    cd ~/dev
    git clone https://github.com/SlalomBuildATL/buckley.git
    cd buckley
    npm install -g .
    echo "Buckley was successfully installed. Please use 'bcli install --tags recommended' to install recommended packages"

}

#check for npm installation
if ! command -v npm; then
    install_node
fi

if ! command -v bcli; then
    install_buckley
fi















