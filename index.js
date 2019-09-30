#!/usr/bin/env node
const cli = require('commander');
const figlet = require('figlet');


if (!process.argv.slice(2).length) {
    cli.outputHelp(figletPrint);
}

cli
    .command('install', 'install one or more packages to your workstation')
    .parse(process.argv);


function figletPrint(text) {
    let header = figlet.textSync('Buckley (Build CLI)', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });

    return `${header}\n` 
};