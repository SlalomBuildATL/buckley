const {cloneRepos} = require("../cloneRepos");
const {fetchProjectDataByName} = require("../../projects/projectDataClient");
const os = require('os');

function handleCloneReposCommand({project, dir, ssh, id}) {
    fetchProjectDataByName(project)
        .then(({repos, name}) => {
            console.log(`Found (${repos.length}) repos: [${repos.map(repo => repo.name)}]`)
            const path = dir || path.resolve(`${os.homedir()}/dev/projects/${name}`);
            cloneRepos(repos, path, ssh, id)
        })
        .catch(console.error)
}

module.exports = {handleCloneReposCommand}
