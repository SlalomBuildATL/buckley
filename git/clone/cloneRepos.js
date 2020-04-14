const simpleGit = require('simple-git/promise');
const {toSsh} = require("./gitUrlParser");
const {promptForUsernameAndPassword} = require("../../common/prompts");
const {toHttps} = require("./gitUrlParser");

let userCredentials;


const getCredentials = () => {
    if (!!userCredentials) {
        return userCredentials;
    }

    return promptForUsernameAndPassword()
        .then(answers => {
            userCredentials = answers;
            return userCredentials
        })
};

const reformatRepoUrlWithCredentials = (url, credentials) => {
    const {username, password} = credentials
    const [protocol, repo] = url.split('://')
    return `${protocol}://${username}:${password}@${repo}`
};

const cloneUrl = (url, repoPath, repoData) => {
    simpleGit()
        .clone(url, repoPath)
        .then(() => console.log(`Successfully cloned repo ${repoData.name} into ${repoPath}`))
        .catch(err => console.log(err));
};

const cloneViaHttps = async (repoUrl, repoPath, repoData) => {
    const credentials = await getCredentials();
    const reformattedRepoUrl = reformatRepoUrlWithCredentials(repoUrl, credentials);
    cloneUrl(reformattedRepoUrl, repoPath, repoData);
};

const cloneViaSsh = (repoData, dir, id) => {
    /*
    if id supplied -- make sure file exists
    make sure it is in config file
    else :
        list ids and prompt user to select one
        recurse
     */

};

const cloneRepos = async (repos, dir, ssh, id) => {
    for (const repoData of repos) {
        let repoPath = `${dir}/${repoData.name}`;
        const repoUrl = ssh ? toSsh(repoData.url) : toHttps(repoData.url);
        console.log(`Cloning ${repoUrl} into ${repoPath}`);

        if (repoData.private) {
            if (ssh || repoData.sshRequired) {
                //flow for ssh credentials
                cloneViaSsh(repoData, dir, id)
                console.log("SSH FLow not implemented")
            } else {
                await cloneViaHttps(repoUrl, repoPath, repoData);
            }
        }
    }
};


module.exports = {cloneRepos};
