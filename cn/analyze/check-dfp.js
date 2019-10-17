const find = require('find');
const chalk = require('chalk');
const md5File = require('md5-file');
const expectedMD5Sum = require('../cn-remediation-config.json').DFP.expectedMD5Sum;

module.exports = {
    checkDFP: () => {
        const filename = 'DFP.cs';
        find.file(filename, './', files => {
            if(!files.length) {
                console.error(chalk.red(`No files found named ${filename}`))
            }
            else {
                if (files.length > 1) {
                    //select file?
                }

                else {
                    const md5Sum = md5File.sync(files[0]);
                    if (md5Sum === expectedMD5Sum) {
                        console.log(chalk.green('DFP is up to date'));
                    }
                    else {
                        console.error(chalk.red('DFP is not up to date'));
                    }
                }
            }

        });


    }
}