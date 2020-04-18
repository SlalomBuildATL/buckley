const aliasConfigs = require('./git-config').aliases;
const chalk = require('chalk');
const {execSync} = require('child_process')

function configureAliases(env) {
    aliasConfigs.forEach(config => {
        config.aliases.forEach(alias => {
            const command = `git config --global alias.${alias} "${config.action}"`;
            execSync(command);
            console.log(`Aliased ${config.action} (${config.description}) to ${chalk.bold(alias)}`);
        });
    });
}

module.exports = {
    configureAliases
};
