const fetch = require("node-fetch")
const QUERY_API = "https://f8kmxhnzaj.execute-api.us-east-1.amazonaws.com/dev/query"

const repoQueryByName = name => `{
    projectConfiguration(name: "${name}") {
        name
        repos   {
            name
            url
            private
            sshRequired
        }
    }
}
`
const packageQueryByName = name => `{
    projectConfiguration(name: "${name}") {
        name
        packages   {
            name
            command {
                cmd
                args
            }
            script
            testScript
            description
            tags
        }
    }
}
`


function fetchProjectData(query) {
    let url = `${QUERY_API}?query=${query}`;
    return fetch(url)
        .then(res => res.json())
        .then(({data, errors, message}) => {
            if (errors) {
                throw errors.map(error => error.message).join(' | ')
            } else if (message) {
                throw message
            } else if (data) {
                return data.projectConfiguration.packages;
            }
        })
}

function fetchProjectPackagesByName(name) {
    return fetchProjectData(packageQueryByName(name));
}

function fetchProjectReposByName(name) {
    return fetchProjectData(repoQueryByName(name))
}

module.exports = {fetchProjectReposByName, fetchProjectPackagesByName}
