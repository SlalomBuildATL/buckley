const Git = require('nodegit');
const aliasConfigs = require('./git-config').aliases;

function configureAliases(env) {
    return Git.Config.findGlobal()
        .then(globalConfig => Git.Config.openOndisk(globalConfig)
            .then(config => aliasConfigs.forEach(aliasConfig =>
                aliasConfig.aliases.forEach(alias => config.setString(`alias.${alias}`, aliasConfig.action)
                    .then(() => console.log(`Aliased ${aliasConfig.action} (${aliasConfig.description}) to ${alias}`))))))
}

module.exports = {
    configureAliases
};