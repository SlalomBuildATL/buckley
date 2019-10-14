#!/usr/bin/env node
const commander = require('commander');
const { cloneRepos }  = require('./cloneRepos');
const { configureAliases } = require('./configureGit');

const cli = new commander.Command();

cli
    .command('clone')
    .description('clones repos defined for your project')
    .option('-p, --project <name>', 'name of project')
    .option('-d, --dir <dirName>', 'absolute path to parent directory where repos will be cloned')
    .option('--ssh', 'use SSH to clone (HTTPS is default)')
    .action(cloneRepos);

cli
    .command('config-aliases')
    .description('configures git aliases')
    .action(configureAliases);

cli.parse(process.argv);
