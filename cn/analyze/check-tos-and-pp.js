const find = require('find');
const chalk = require('chalk');
const {selectFile, readTextFileSync} = require('./utils');
const expectedDate = require('../cn-remediation-config.json').privacyAndTerms.expectedDate;

function checkDateInDocument(fileName, documentName) {
    return findDocument(fileName, documentName)
        .then(selectFile)
        .then(readTextFileSync)
        .then(docText => {
            const dateRegexp = /(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2}(st|nd|rd|th)\,.*\d{4}/;
            const match = docText.match(dateRegexp);

            if (match.length) {
                const formattedDate = match[0].replace(/(st|nd|rd|th|,)/, '');
                if (formattedDate === expectedDate) {
                    console.log(chalk.green(`${documentName} Document Is Up to Date: (${chalk.bold(formattedDate)}`));
                    return true;
                } else {
                    console.error(chalk.red(`${documentName} Document Is Not Up to Date (${chalk.bold(formattedDate)})`));
                    return true;
                }
            } else {
                console.error(chalk.red(`Could not find date in ${documentName}`));
                return false;
            }

        }).catch(err => console.error(`ERR: ${err}`));
}

module.exports = {
    verifyPrivacyPolicyUpToDate: () => {
        const documentName = `Privacy Policy`;
        const fileName = 'privacy.txt';
        return checkDateInDocument(fileName, documentName)
    },
    verifyTermsOfUseUpToDate: () => {
        const documentName = `Terms of Service`;
        const fileName = 'terms.txt';
        return checkDateInDocument(fileName, documentName)
    }
}

function findDocument(fileName, documentName) {
    return new Promise((resolve, reject) => {
        find.file(fileName, './', files => {
            if (files.length) {
                return resolve(files)
            } else return reject(chalk.red(`Could not find ${documentName} file in given directory`))

        })
    });
}