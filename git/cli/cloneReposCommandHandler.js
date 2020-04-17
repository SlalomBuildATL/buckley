const {cloneRepos} = require("../clone/cloneRepos");
const {fetchProjectReposByName} = require("../../projects/projectDataClient");
const os = require('os');

function handleCloneReposCommand({project, dir, ssh, id}) {
    fetchProjectReposByName(project)
        .then(({repos, name}) => {
            console.log(`Found (${repos.length}) repos: [${repos.map(repo => repo.name)}]`)
            const path = dir || `${os.homedir()}/dev/projects/${name}`;
            cloneRepos(repos, path, ssh, id)
        })
        .catch(console.error)
}

module.exports = {handleCloneReposCommand}
