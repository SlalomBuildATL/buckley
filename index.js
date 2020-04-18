#!/usr/bin/env node
const cli = require('commander');
const figlet = require('figlet');
const { exec }= require('child_process')
const version = require('./package.json').version;

if (!process.argv.slice(2).length) {
    cli.outputHelp(figletPrint);
}

cli
    .option('-v, --version', 'show installed version of buckley', () => console.log(version))
    .command('install', 'install one or more packages to your workstation', {executableFile: 'install/bcli-install'})
    .command('git', 'helper functions related to git', {executableFile: 'git/cli/bcli-git.js'})
    .parse(process.argv);



function figletPrint(text) {
    let header = figlet.textSync('Buckley', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
    const subtitle = `########################### Build CLI (bcli)
    \n
    `
    const banner = `${header}\n${subtitle}`

    return banner;
};
