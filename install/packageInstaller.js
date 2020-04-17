const _ = require('lodash');
const {spawn, spawnSync} = require('child_process');
const chalk = require('chalk');
const packageConfig = require('./install-config');
const {fetchProjectPackagesByName} = require("../projects/projectDataClient");

const SUPPORTED_OPERATING_SYSTEMS = [
    {system: "Mac OS", value: "darwin"}
];

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


function checkOS() {
    if (SUPPORTED_OPERATING_SYSTEMS.some(os => os.value === process.platform)) {
        return true;
    } else {
        console.log(chalk.red(`Unsupported Operating System`))
        console.log(chalk.red(
            `bcli install is currently only supported on [${SUPPORTED_OPERATING_SYSTEMS.map(os => os.system)}]`
        ));
        process.exit(1)
    }
}

async function action(env) {

    checkOS();
    let installablePackages = [];

    if (env.project) {
        installablePackages = await fetchProjectPackagesByName(env.project)
            .catch(err => {
                console.log(chalk.red(err))
                process.exit(1)
            });
    } else {
        if (env.all) {
            installablePackages = packageConfig.packages;
        }

        if (!!env.names) {
            let matchingPackages = findMatchingPackages(packageConfig.packages, env.names.split(','));

            installablePackages = installablePackages.concat(matchingPackages)
        }

        if (env.tags) {
            const requiredTags = env.tags.split(',');
            installablePackages = installablePackages.concat(packageConfig.packages.filter(pkg => _.intersection(pkg.tags, requiredTags).length > 0))
        }


        installablePackages = _.uniq(installablePackages);
    }

    if (env.list) {
        listPackages(installablePackages)
    }

    console.log(chalk.blue.bold(`Found (${installablePackages.length}) matching packages`));
    if (!env.dry) {
        for (const pkg of installablePackages) {
            await installPackage(pkg);
        }
    }
}

function installPackage(pkg) {
    return new Promise((resolve, reject) => {
        if (isInstalled(pkg)) {
            console.log(chalk.yellow.bold(`${pkg.name} is already installed`));
            resolve(0)
        } else {
            console.log(chalk.blue(`Installing ${pkg.name}`))
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
                    resolve(code)
                } else {
                    console.error(`${chalk.red.bold(prefix)}::Installation failed`)
                    reject(code)
                }
            });
        }
    });
}

function isInstalled(pkg) {
    if (pkg.testScript) {
        return spawnSync(pkg.testScript, {shell: true}).status === 0;
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

module.exports = {action, installPackage};
