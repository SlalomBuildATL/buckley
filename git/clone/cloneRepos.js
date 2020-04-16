const simpleGit = require('simple-git/promise');
const {selectIdentityFile} = require("../credentials/credentialsManager");
const {toSsh} = require("./gitUrlParser");
const {promptForUsernameAndPassword} = require("../../common/prompts");
const {toHttps} = require("./gitUrlParser");
const os = require('os');
const {addKeyToConfigFile} = require("../credentials/credentialsManager");
const {idExistsInConfigFile} = require("../credentials/credentialsManager");
const fs = require('fs');
const {getHostById} = require("../credentials/credentialsManager");

let userCredentials;
let identityFile;

const getIdentityFile = () => {
    return identityFile
        ? identityFile
        : selectIdentityFile()
            .then(response => {
                identityFile = response;
                return identityFile;
            })
}

const getCredentials = () => {
    return userCredentials
        ? userCredentials
        : promptForUsernameAndPassword()
            .then(answers => {
                userCredentials = answers;
                return userCredentials
            });
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

function modifyRepoUrl(repoUrl, id) {
    const host = getHostById(id)
    return toSsh(repoUrl).replace(/^git@.*\:/, `git@${host}:`)
}

const cloneViaSsh = async (repoData, dir, id) => {
    if (id) {
        id = id.replace(/\.pub$/, '')
        const idFilePath = `${os.homedir()}/.ssh/${id}`;
        if (fs.existsSync(idFilePath)) {
            if (!idExistsInConfigFile(id)) {
                await addKeyToConfigFile({name: id, filepath: idFilePath})
            }
        }
        const url = modifyRepoUrl(repoData.url, id)
        await cloneUrl(url, `${dir}/${repoData.name}`, repoData)
    } else {
        id = await getIdentityFile()
        await cloneViaSsh(repoData, dir, id)
    }
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
                await cloneViaSsh(repoData, dir, id)
            } else {
                await cloneViaHttps(repoUrl, repoPath, repoData);
            }
        }
    }
};


module.exports = {cloneRepos};
