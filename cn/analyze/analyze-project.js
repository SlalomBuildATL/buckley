const {verifyScriptingBackend} = require('./check-scripting-backend');
const {projectConfig, targets} = require('../cn-remediation-config.json');
const {readConfigFile} = require('./utils');
const checkScriptingBackend = require('./check-scripting-backend');
const {verifyAndroidTargetArchitecture} = require('./check-target-architecture');
const {verifyAbsenceOfFiles} = require('./verify-absence-of-files');
const find = require('find');
const Promise = require('promise');

function getPlayerSettings() {
    return new Promise((resolve, reject) => {
        find.file(projectConfig, './', (files) => {
            if (files.length) {
                try {
                    resolve(readConfigFile(files[0]).PlayerSettings);
                } catch (e) {
                    console.error(chalk.red(`Error: ${e}`));
                    reject('Could not read project config file')
                }
            } else {
                reject('Could not find project config file');
                console.error(chalk.red(`Could not find ${projectConfig} file. Are you running this from a game directory?`));
                }
            }
        );
    })
}

module.exports = {
    analyzeProject: (env) => {
        getPlayerSettings().then(playerSettings => {
            verifyScriptingBackend(playerSettings, 'Android', targets.Android);
            verifyScriptingBackend(playerSettings, 'iOS', targets.Android);
            verifyAndroidTargetArchitecture(playerSettings, targets.Android);
            verifyAbsenceOfFiles(/upsight/i);
            verifyAbsenceOfFiles(/playhaven/i);
            verifyAbsenceOfFiles(/kochava/i);
            verifyAbsenceOfFiles(/comscore/i);
        });
    }
};
