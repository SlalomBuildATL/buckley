const find = require('find');
const chalk = require('chalk');

module.exports = {
    verifyAbsenceOfFiles: (regexp) => {
        find.file(regexp, './', (files) => {
                if (files.length) {
                    files.forEach(file => {
                        const error = chalk.red(`Found unwanted file matching ${regexp}: ${chalk.bold(file)}`);
                        console.error(error)
                    });
                } else {
                    console.log(chalk.green(`No files found matching ${regexp}`));
                }
            }
        )
    }
}