const find = require('find');
const chalk = require('chalk');

module.exports = {
    verifyAbsenceOfFiles: (regexp, verbose) => {
        find.file(regexp, './', (files) => {
                if (files.length) {
                    const error = chalk.red(`Found {${files.length}} unwanted files matching ${regexp}`);
                    console.error(error)
                    if(verbose) {
                       files.forEach(file => {
                           console.log(chalk.yellow(file))
                       })
                    }
                } else {
                    console.log(chalk.green(`No files found matching ${regexp}`));
                }
            }
        )
    }
}