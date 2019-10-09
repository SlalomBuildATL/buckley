const { verifyScriptingBackend } = require('./check-scripting-backend');
const { projectConfig, targets } = require('../cn-remediation-config.json');
const { readConfigFile } = require('./utils');
const checkScriptingBackend = require('./check-scripting-backend');
const { verifyAndroidTargetArchitecture } = require('./check-target-architecture');

function getPlayerSettings() {
    let playerSettings;
    try {
        playerSettings = readConfigFile(projectConfig).PlayerSettings;
    } catch (e) {
        console.error(chalk.red(`Error: ${e}`));
        console.error(chalk.red(`Couldn't read ProjectSettings.asset file. Are you in the root directory of the game project?`))
    }
    return playerSettings;
}

module.exports = {
    analyzeProject: (env) => {
        const playerSettings = getPlayerSettings();

        verifyScriptingBackend(playerSettings, 'Android', targets.Android);
        verifyScriptingBackend(playerSettings, 'iOS', targets.Android);
        verifyAndroidTargetArchitecture(playerSettings, targets.Android)
    }
};
