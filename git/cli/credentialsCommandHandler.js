const {addSshKeyPrompt} = require("../credentials/credentialsManager");
const {listSshKeys} = require("../credentials/credentialsManager");
module.exports = {
    handleListCredentialsCommand: () => {
        listSshKeys()
    },

    handleAddCredentialsCommand: (env) => {
        addSshKeyPrompt(env)
    }
}
