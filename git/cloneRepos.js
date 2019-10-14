const repoConfig = require('./git-config');
const Git = require('nodegit');
const path = require('path');
const os = require('os');
const fs = require('fs');
const chalk = require('chalk');

function getRepoUrl(env, repoData) {
    const prefix = env.ssh ? 'git@github.com:' : 'https://github.com/';
    return `${prefix}${repoData.repo}`;
}

function cloneRepos(env) {
    const projectName = env.project;
    const reposByProject = findReposByProject(projectName);

    reposByProject.forEach(repoData => {
        let repoPath = (env.dir || path.resolve(`${os.homedir()}/dev/projects/${projectName}`)) + `/${repoData.name}`;

        const cloneOptions = {
            fetchOpts: {
                callbacks: {
                    certificateCheck: () => 0,
                    credentials: (url, userName) => {
                        return Git.Cred.sshKeyFromAgent(userName);
                    }
                }
            }
        };
        const repoUrl = getRepoUrl(env, repoData);
        console.log(`Cloning ${repoUrl} into ${repoPath}`);
        Git.Clone(repoUrl, repoPath, cloneOptions)
            .then(clonedRepo => console.log(`Successfully cloned repo ${repoData.name} into ${repoPath}`))
            .catch(err => console.error(`Error cloning repo: ${err}`))
    })
}

function findReposByProject(projectName) {
    const projectConfig = repoConfig.projects.find(project => project.name.toLowerCase() === projectName.toLowerCase());
    return projectConfig.repos;
}

module.exports = {cloneRepos};