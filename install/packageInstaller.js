const fs = require('fs');
const _ = require('lodash');
const {spawn, spawnSync} = require('child_process');
const chalk = require('chalk');
const path = require('path');

function listPackages(packages) {
    console.table(packages.map(pkg => _.pick(pkg, ['name', 'description', 'tags'])));
}

function findMatchingPackages(allPackages, names) {
    const requiredNames = names.map(requiredName => requiredName.toLowerCase());

    let matchingPackages = allPackages
        .filter(pkg =>
            requiredNames
                .includes(pkg.name.toLowerCase()));
    return matchingPackages;
}


function action(env) {
    let text = fs.readFileSync(path.join(__dirname, 'install-config.json'), 'utf8');
    const config = JSON.parse(text);

    if (env.list) {
        listPackages(config.packages);
    } else {
        let installablePackages = [];

        if (env.all) {
            installablePackages = config.packages;
        }

        if (!!env.names) {
            let matchingPackages = findMatchingPackages(config.packages, env.names.split(','));

            installablePackages = installablePackages.concat(matchingPackages)
        }

        if (env.tags) {
            const requiredTags = env.tags.split(',');
            installablePackages = installablePackages.concat(config.packages.filter(pkg => _.intersection(pkg.tags, requiredTags).length > 0))
        }

        installablePackages = _.uniq(installablePackages);

        console.log(chalk.blue.bold(`Found (${installablePackages.length}) matching packages`));
        if (!env.dry) {
            installablePackages.forEach(installPackage);
        }
    }
}

function installPackage(pkg) {
    if (isInstalled(pkg)) {
        console.log(chalk.yellow.bold(`${pkg.name} is already installed`));
    } else {
        const prefix = `install:${pkg.name}`;
        const {cmd, args} = getSpawnCommand(pkg);
        const proc = spawn(cmd, args);

        proc.stdout.on('data', (data) => {
            console.log(`${chalk.blue.bold(prefix)}::${data}`);
        });

        proc.stderr.on('data', (data) => {
            console.error(`${chalk.red.bold(prefix)}::${data}`);
        });

        proc.on('close', (code) => {
            if (code === 0) {
                console.log(`${chalk.green.bold(prefix)}::Installation successful`)
            } else {
                console.error(`${chalk.red.bold(prefix)}::Installation failed`)
            }
        });
    }
}

function isInstalled(pkg) {
    if (pkg.testScript) {
        const result = spawnSync(pkg.testScript, {shell: true});
        return result.status === 0;
    }
    if (pkg.testCommand) {
        const {cmd, args} = pkg.testCommand;
        return spawnSync(cmd, args, {shell: true}).status === 0;
    }
    return false;
};

function getSpawnCommand(pkg) {
    if (pkg.command) {
        return pkg.command;
    } else if (pkg.script) {
        return {
            cmd: 'sh',
            args: ['-c', pkg.script]
        }
    }

}

module.exports  = { action, installPackage };
