const repoConfig = require('./git-config');
const Git = require('nodegit');
const path = require('path');
const os = require('os');
const fs = require('fs');
const chalk = require('chalk');
const simpleGit = require('simple-git/promise');
const {toSsh} = require("./gitUrlParser");
const inquirer = require('inquirer');
const {toHttps} = require("./gitUrlParser");


function getRepoUrl(env, repoData) {
    const repoUrl = repoData.url
    if (env.ssh) {
        return toSsh(repoUrl)
    } else {
        return toHttps(repoUrl)
    }
}

let userCredentials;

async function cloneRepos(env) {
    const projectName = env.project;
    const reposByProject = findReposByProject(projectName);

    for (const repoData of reposByProject) {
        let repoPath = (env.dir || path.resolve(`${os.homedir()}/dev/projects/${projectName}`)) + `/${repoData.name}`;
        const repoUrl = getRepoUrl(env, repoData);
        console.log(`Cloning ${repoUrl} into ${repoPath}`);

        if (repoData.private) {
            if (env.ssh || repoData.sshRequired) {
                //flow for ssh credentials
            } else {
                const credentials = await getCredentials();
                const reformattedRepoUrl = reformatRepoUrlWithCredentials(repoUrl, credentials)
                simpleGit()
                    .clone(reformattedRepoUrl, repoPath)
                    .then(clonedRepo => console.log(`Successfully cloned repo ${repoData.name} into ${repoPath}`))
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
    const s = `${protocol}://${username}:${password}@${repo}`;
    console.log(`repo: ${s}`)
    return s
}

function findReposByProject(projectName) {
    const projectConfig = repoConfig.projects.find(project => project.name.toLowerCase() === projectName.toLowerCase());
    return projectConfig.repos;
}

module.exports = {cloneRepos};
