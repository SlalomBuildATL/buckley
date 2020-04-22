const fetch = require("node-fetch")
const QUERY_API = "https://f8kmxhnzaj.execute-api.us-east-1.amazonaws.com/dev/query"

const queryAliasConfig = () => `{
    gitAliasesConfiguration {
        action
        aliases
        description
    }
}
`


function fetchGitAliasConfiguration() {
    let url = `${QUERY_API}?query=${queryAliasConfig()}`;
    return fetch(url)
        .then(res => res.json())
        .then(({data, errors, message}) => {
            if (errors) {
                throw errors.map(error => error.message).join(' | ')
            } else if (message) {
                throw message
            } else if (data) {
                return data.gitAliasesConfiguration
            } else {
                throw 'No data found for given project'
            }
        })
}


module.exports = {fetchGitAliasConfiguration}
