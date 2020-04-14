#!/usr/bin/env node
const commander = require('commander');
const {handleAddCredentialsCommand} = require("./credentialsCommandHandler");
const {handleListCredentialsCommand} = require("./credentialsCommandHandler");
const {handleCloneReposCommand} = require("./cloneReposCommandHandler");
const { configureAliases } = require('../configs/configureGit');

const cli = new commander.Command();

cli
    .command('clone')
    .description('clones repos defined for your project')
    .option('-p, --project <name>', 'name of project')
    .option('-d, --dir <dirName>', 'absolute path to parent directory where repos will be cloned')
    .option('--ssh', 'use SSH to clone (HTTPS isO default)')
    .option('-i, --id', 'SSH identity to use for cloning')
    .action(handleCloneReposCommand);

cli
    .command('config-aliases')
    .description('configures git aliases')
    .action(configureAliases);

cli.command('credentials','manage SSH keys to use with git', { executableFile: 'git-credentials.js'} )

cli.parse(process.argv);
