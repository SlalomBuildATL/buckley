#!/usr/bin/env node
const commander = require('commander');
const { cloneRepos }  = require('./cloneRepos');

const cli = new commander.Command();

cli
    .command('clone')
    .description('clones repos defined for your project')
    .option('-p, --project <name>', 'name of project')
    .action(cloneRepos);


cli.parse(process.argv);
