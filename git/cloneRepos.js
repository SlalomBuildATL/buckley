const simpleGit = require('simple-git/promise');
const {toSsh} = require("./gitUrlParser");
const inquirer = require('inquirer');
const {toHttps} = require("./gitUrlParser");

let userCredentials;

async function cloneRepos(repos, dir, ssh, id) {
    for (const repoData of repos) {
        let repoPath = `${dir}/${repoData.name}`;
        const repoUrl = ssh ? toSsh(repoData.url) : toHttps(repoData.url);
        console.log(`Cloning ${repoUrl} into ${repoPath}`);

        if (repoData.private) {
            if (ssh || repoData.sshRequired) {
                //flow for ssh credentials
                console.log("SSH FLow not implemented")
            } else {
                const credentials = await getCredentials();
                const reformattedRepoUrl = reformatRepoUrlWithCredentials(repoUrl, credentials);
                simpleGit()
                    .clone(reformattedRepoUrl, repoPath)
                    .then(() => console.log(`Successfully cloned repo ${repoData.name} into ${repoPath}`))
                    .catch(err => console.log(err));
            }
        }
    }
}

function getCredentials() {
    if (!!userCredentials) {
        return userCredentials;
    }
    const questions = [
        {
            type: 'input',
            name: 'username',
            message: 'Please enter your username',
            filter: (val) => val.split("@")[0]
        },
        {
            type: 'password',
            name: 'password',
            message: 'Please enter your password'
        }
    ]

    return inquirer
        .prompt(questions)
        .then(answers => {
            userCredentials = answers;
            return userCredentials
        })
}

function reformatRepoUrlWithCredentials(url, credentials) {
    const {username, password} = credentials
    const [protocol, repo] = url.split('://')
    return `${protocol}://${username}:${password}@${repo}`
}

module.exports = {cloneRepos};
