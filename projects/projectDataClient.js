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


function fetchProjectDataByName(name) {
    let url = `${QUERY_API}?query=${repoQueryByName(name)}`;
    return fetch(url)
        .then(res => res.json())
        .then(({ data }) => data.projectConfiguration)
}

module.exports = {fetchProjectDataByName}
