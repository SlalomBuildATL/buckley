const commander = require('commander')
const {handleListCredentialsCommand, handleAddCredentialsCommand} = require("./credentialsCommandHandler");

const cli = new commander.Command()


cli
    .command('list')
    .description('list existing SSH keys')
    .action(handleListCredentialsCommand)

cli
    .command('add')
    .description('add a new SSH key to use with git')
    .option('-n, --name [name]', 'a name for the SSH key')
    .option('-c, --comment [comment]', 'a comment for the SSH key (typically an email address')
    .option('-p, --passphrase [passphrase]', '(optional) a passphrase for the SSH key')
    .option('-h, --host [host]', 'the git host with which to use the SSH key (e.g. github.com)')
    .action(handleAddCredentialsCommand)

if (!process.argv.slice(2).length) {
    cli.outputHelp();
}

cli.parse(process.argv)
