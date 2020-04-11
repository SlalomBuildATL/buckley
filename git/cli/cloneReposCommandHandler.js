const {cloneRepos} = require("../cloneRepos");
const {fetchProjectDataByName} = require("../../projects/projectDataClient");
const os = require('os');

function handleCloneReposCommand({project, dir, ssh, id}) {
    fetchProjectDataByName(project)
        .then(project => {
            const repos = project.repos;
            const path = dir || path.resolve(`${os.homedir()}/dev/projects/${project.name}`);
            cloneRepos(repos, path, ssh, id)
        })
        .catch(console.error)
}

module.exports = {handleCloneReposCommand}
