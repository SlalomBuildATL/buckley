const {verifyScriptingBackend} = require('./check-scripting-backend');
const {projectConfig, targets} = require('../cn-remediation-config.json');
const {readConfigFile} = require('./utils');
const checkScriptingBackend = require('./check-scripting-backend');
const {verifyAndroidTargetArchitecture} = require('./check-target-architecture');
const {verifyAbsenceOfFiles} = require('./verify-absence-of-files');
const {verifyAndroidTargetAPI} = require('./check-android-target-api');
const find = require('find');
const Promise = require('promise');
const chalk = require('chalk');
const inquirer = require('inquirer');

function promiseToReadFile(file, resolve, reject) {
    try {
        resolve(readConfigFile(file).PlayerSettings);
    } catch (e) {
        console.error(chalk.red(`Error: ${e}`));
        reject('Could not read project config file')
    }
}

function selectFile(files) {
    if (files.length > 1) {
       return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'file',
                    message: `Multiple matching files found, which one would you like to use?`,
                    choices: files
                }
            ]).then(answers => answers.file);

    } else {
        return new Promise.resolve(files[0]);
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
    analyzeProject: (env) => {
        getPlayerSettings().then(playerSettings => {
            verifyScriptingBackend(playerSettings, 'Android', targets.Android);
            verifyScriptingBackend(playerSettings, 'iOS', targets.Android);
            verifyAndroidTargetArchitecture(playerSettings, targets.Android);
            verifyAndroidTargetAPI(playerSettings, targets.Android);
            verifyAbsenceOfFiles(/upsight/i);
            verifyAbsenceOfFiles(/playhaven/i);
            verifyAbsenceOfFiles(/kochava/i);
            verifyAbsenceOfFiles(/comscore/i);
        });
    }
};
