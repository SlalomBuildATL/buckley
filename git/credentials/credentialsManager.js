const os = require('os');
const fs = require('fs');
const chalk = require('chalk')
const inquirer = require('inquirer')
const { execSync } = require('child_process')
const SSHConfig = require('ssh-config')


const listSshKeys = () => {
    const publicKeyFiles = getPublicKeys()
    console.log(chalk.bold(`Found (${publicKeyFiles.length}) public keys`))
    publicKeyFiles
        .forEach(file => console.log(file));
}

const getPublicKeys = () => {
    return fs.readdirSync(`${os.homedir()}/.ssh`)
        .filter(file => file.endsWith(".pub"));
}

const addKeyToConfigFile = (name, host, filepath) => {
    const configFile = `${os.homedir()}/.ssh/config`
    let configFileContent = '';
    if(fs.existsSync(configFile)) {
       configFileContent = fs.readFileSync(configFile).toString('utf8')
    }

    const sshConfig = SSHConfig.parse(configFileContent);
    sshConfig.append({
        Host: name,
        HostName: host,
        User: 'git',
        IdentityFile: filepath
    })

};

const generateSshKey = ({name, comment, passphrase, host}) => {
    const filePath = `${os.homedir()}/.ssh/${name}`
    const command = `ssh-keygen -t rsa -b 4096 -C ${comment} -f ${filePath} -N ${passphrase || `''`}`
    console.log(execSync(command).toString('utf8'))

    // add ssh key to config file
    addKeyToConfigFile(name, host, filePath)
}

const addSshKeyPrompt = (args) => {
    const validateIdFile = (file) => {
            const filePath = `${os.homedir()}/.ssh/${file}`;
            if (fs.existsSync(filePath)) {
                return `Id ${filePath} already exists, please try a different name`
            } else return true
    }

    const questions = [
        {
            name: "name",
            message: "enter a name for the ssh key",
            default: "id_rsa",
            validate: validateIdFile,
            when: !args.name
        },
        {
            name: "comment",
            message: "enter your email address (or some other comment for the key file)",
            validate: (ans) => ans.length ? true : 'You must enter a value',
            when: !args.comment
        },
        {
            name: "passphrase",
            message: "enter a passphrase for the keyfile (or hit enter to leave it blank)",
            type: "password",
            when: !args.passphrase
        },
        {
            name: "host",
            message: "enter the host to use this ssh key with (e.g. github.com, bitbucket.org)",
            default: "github.com",
            when: !args.host
        }
    ]

    inquirer
        .prompt(questions)
        .then(answers => ({ ...args, ...answers }))
        .then(generateSshKey)
        .catch(err => console.log(chalk.red(err)))
}

module.exports = {listSshKeys, addSshKeyPrompt}
