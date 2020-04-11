const {projects} = require('./project-data')

function fetchProjectDataByName(name) {
    return new Promise((resolve, reject) => {
        const projectData = projects.find(project => project.name.toLowerCase() === name.toLowerCase());
        if (!!projectData) {
            resolve(projectData)
        } else {
            reject(`Unable to locate data for project ${name}`)
        }
    })
}

module.exports = {fetchProjectDataByName}
