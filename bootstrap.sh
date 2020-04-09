#!/bin/bash

function install_node() {
  set -e
  #install nvm
  if [[ "$OSTYPE" == "linux-gnu" ]]; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
    # setup nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
  elif [[ "$OSTYPE" == "darwin"* ]]; then
    #install nvm
    install_nvm_via_homebrew
    # setup nvm
    source $(brew --prefix nvm)/nvm.sh
  fi

  # setup node
  nvm install 12.16.2
  nvm use 12.16.2
  echo "Node.js/NPM was successfully installed via Node Version Manager (NVM). Visit https://github.com/nvm-sh/nvm for more information on how to use NVM."
  set +e
}

function install_nvm_via_homebrew() {
  if ! command -v brew; then
    echo "Installing Homebrew Package Manager"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

  fi
  brew update
  brew install nvm
}

function install_buckley() {
  npm install -g buckley
  echo "Buckley was successfully installed. Please use 'bcli install --tags recommended' to install recommended packages"

}

#check for npm installation
if ! command -v npm; then
  install_node
fi

if ! command -v bcli; then
  install_buckley
fi
