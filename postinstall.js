#!/usr/bin/env node
const chalk = require('chalk');
const {exec} = require('child_process');

console.log(`Buckley successfully installed, use ${chalk.bold('bcli')} command for help`);
exec('bcli', (err, stdout) => console.log(stdout));

