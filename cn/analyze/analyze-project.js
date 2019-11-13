const {verifyScriptingBackend} = require('./check-scripting-backend');
const {projectConfig, targets} = require('../cn-remediation-config.json');
const {readConfigFile, selectFile} = require('./utils');
const {verifyAndroidTargetArchitecture} = require('./check-target-architecture');
const {verifyAbsenceOfFiles} = require('./verify-absence-of-files');
const {verifyAndroidTargetAPI} = require('./check-android-target-api');
const { verifyTermsOfUseUpToDate, verifyPrivacyPolicyUpToDate } = require('./check-tos-and-pp');
const find = require('find');
const Promise = require('promise');
const chalk = require('chalk');
const { checkDFP } = require('./check-dfp');

function promiseToReadFile(file, resolve, reject) {
    try {
        resolve(readConfigFile(file).PlayerSettings);
    } catch (e) {
        console.error(chalk.red(`Error: ${e}`));
        reject('Could not read project config file')
    }
}

function getPlayerSettings() {
    return new Promise((resolve, reject) => {
        find.file(projectConfig, './', (files) => {
            if (files.length) {
                selectFile(files).then(file => promiseToReadFile(file, resolve, reject));
            } else {
                reject('Could not find project config file');
                    console.error(chalk.red(`Could not find ${projectConfig} file. Are you running this from a game directory?`));
                }
            }
        );
    })
}

module.exports = {
    analyzeProject: async (env) => {
        checkDFP();

        await verifyTermsOfUseUpToDate();
        await verifyPrivacyPolicyUpToDate();

        getPlayerSettings().then(playerSettings => {
            verifyScriptingBackend(playerSettings, 'Android', targets.Android);
            verifyScriptingBackend(playerSettings, 'iOS', targets.Android);
            verifyAndroidTargetArchitecture(playerSettings, targets.Android);
            verifyAndroidTargetAPI(playerSettings, targets.Android);
        });

        const useVerbose = !!env.verbose;
        verifyAbsenceOfFiles(/upsight/i, useVerbose);
        verifyAbsenceOfFiles(/playhaven/i, useVerbose);
        verifyAbsenceOfFiles(/PH/, useVerbose);
        verifyAbsenceOfFiles(/kochava/i, useVerbose);
        verifyAbsenceOfFiles(/comscore/i, useVerbose);
    }
};
