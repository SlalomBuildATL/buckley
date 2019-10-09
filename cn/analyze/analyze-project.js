const { verifyAndroid: checkAndroidScriptingBackend, verifyIOS: checkIOSScriptingBackend } = require('./check-scripting-backend');
const { projectConfig, targets } = require('../cn-remediation-config.json');
const { readConfigFile } = require('./utils');
const checkScriptingBackend = require('./check-scripting-backend');

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

        checkAndroidScriptingBackend(playerSettings, targets.Android);
        checkIOSScriptingBackend(playerSettings, targets.iOS);
    }
};
