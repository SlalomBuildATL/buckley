const repoConfig = require('./git-config');
const Git = require('nodegit');
const path = require('path');
const homedir = require('os').homedir();

function cloneRepos(env) {
    const projectName = env.project;
    const reposByProject = findReposByProject(projectName);

    reposByProject.forEach(repo => {
        const repoPath = path.resolve(`${homedir}/dev/${projectName}/${repo.name}`);
        Git.Clone(repo.url, repoPath)
            .then(clonedRepo => {
                console.log(`Successfully cloned repo ${repo.name}`);
            }).catch(err => console.error(`Error cloning repo: ${err}`))
    })
}

function findReposByProject(projectName) {
    const projectConfig = repoConfig.projects.find(project => project.name.toLowerCase() === projectName.toLowerCase());
    return projectConfig.repos;
}

module.exports = {cloneRepos};