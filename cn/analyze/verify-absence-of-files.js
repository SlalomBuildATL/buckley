const find = require('find');
const chalk = require('chalk');

module.exports = {
    verifyAbsenceOfFiles: (regexp) => {
        find.file(regexp, './', (files) => {
                if (files.length) {
                    const error = chalk.red(`Found {${files.length}} unwanted file matching ${regexp}`);
                    console.error(error)
                } else {
                    console.log(chalk.green(`No files found matching ${regexp}`));
                }
            }
        )
    }
}