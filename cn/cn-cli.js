#!/usr/bin/env node
const cli = require('commander');
const figlet = require('figlet');

if (!process.argv.slice(2).length) {
    cli.outputHelp(figletPrint);
}

cli
    .command('analyze', 'Analyze project for issues', {executableFile: 'analyze/cn-analyze.js'})
    .parse(process.argv);


function figletPrint(text) {
    let header = figlet.textSync('Cartoon Network', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });

    return header;
};
