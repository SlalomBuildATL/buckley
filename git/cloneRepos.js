const repoConfig = require('./git-config');
const Git = require('nodegit');
const path = require('path');
const os = require('os');
const fs = require('fs');
const chalk = require('chalk');

function cloneRepos(env) {
    const projectName = env.project;
    const reposByProject = findReposByProject(projectName);

    reposByProject.forEach(repo => {
        let repoPath = (env.dir || path.resolve(`${os.homedir()}/dev/projects/${projectName}`)) + `/${repo.name}`;

        Git.Clone(repo.url, repoPath)
            .then(clonedRepo => console.log(`Successfully cloned repo ${repo.name} into ${repoPath}`))
            .catch(err => console.error(`Error cloning repo: ${err}`))
    })
}

function findReposByProject(projectName) {
    const projectConfig = repoConfig.projects.find(project => project.name.toLowerCase() === projectName.toLowerCase());
    return projectConfig.repos;
}

module.exports = {cloneRepos};