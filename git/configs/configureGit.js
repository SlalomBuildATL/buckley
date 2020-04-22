const localAliasConfigs = require('./git-config').aliases
const chalk = require('chalk')
const {execSync} = require('child_process')
const {fetchGitAliasConfiguration} = require('./configClient')

async function configureAliases(env) {
    const configsFromServer = await fetchGitAliasConfiguration();
    const aliaseConfigs = configsFromServer || localAliasConfigs;

    aliaseConfigs
        .forEach(config => {
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
