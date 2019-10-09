#!/usr/bin/env node
const cli = require('commander');
const figlet = require('figlet');

if (!process.argv.slice(2).length) {
    cli.outputHelp(figletPrint);
}

cli
    .command('install', 'install one or more packages to your workstation', {executableFile: 'install/bcli-install'})
    .command('git', 'helper functions related to git', {executableFile: 'git/bcli-git.js'})
    .command('cn', 'CLI for Cartoon Network project', {executableFile: 'cn/cn-cli.js'})
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