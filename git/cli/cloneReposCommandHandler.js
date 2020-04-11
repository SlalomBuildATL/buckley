const {cloneRepos} = require("../cloneRepos");
const {fetchProjectDataByName} = require("../../projects/projectDataClient");
const os = require('os');

function handleCloneReposCommand({projectName, dir, ssh, id}) {
    fetchProjectDataByName(projectName)
        .then(projectData => {
            const repos = projectData.repos;
            const path = dir || path.resolve(`${os.homedir()}/dev/projects/${projectData.name}`);
            cloneRepos(repos, path, ssh, id)
        })
        .catch(console.error)
}

module.exports = {handleCloneReposCommand}
