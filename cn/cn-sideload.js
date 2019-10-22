const cli = require('commander');
const find = require('find');
const chalk = require('chalk');
const {selectFile} = require('./analyze/utils');
const rename = require('rename');
const {renameSync} = require('fs');
const {spawnSync} = require('child_process');

cli
    .option('-v, --version <versionNumber>', 'bundle version code')
    .option('-p, --packageName <packageName>', 'package name')
    .option('-d, --devicePath <devicePath>', 'path on device for obbs')
    .action(env => sideload(env))
    .parse(process.argv);


function renameObbFile(obbFile, bundleVersionCode, packageName) {
    const newName = `main.${bundleVersionCode}.${packageName}.obb`;
    console.log(`renaming ${obbFile} to ${newName}`);
    renameSync(obbFile, newName);
    return Promise.resolve(newName);
}

function sideload(env) {
    const {version, packageName, devicePath} = env;
    if (!version || !packageName || !devicePath) {
        console.error(chalk.red("Please provide a bundle version code (--version) and package name (--package) and Android device path for OBB files (--device)"));
        process.exit(1);
    }

    findDocument(/\.obb$/, "OBB file")
        .then(selectFile)
        .then(obbFile => renameObbFile(obbFile, version, packageName))
        .then(renamedObbFile => {
            const mkDirResult = spawnSync(`adb`, ['shell', 'mkdir', `${devicePath}/${packageName}`]);
            console.log(mkDirResult.stdout.toString());

            const pushResult = spawnSync(`adb`, ['push', renamedObbFile, `${devicePath}/${packageName}`]);
            console.log(pushResult.stdout.toString());

        })


    // mkdir on android
    // push obb
    // install apk
}

function runCommand(cmd, args) {
    const proc = spawn(cmd, args);

    proc.stdout.on('data', (data) => {
        console.log(data);
    });

    proc.stderr.on('data', (data) => {
        console.error(chalk.red(data));
    });

    proc.on('close', (code) => {
        if (code === 0) {
            console.log(chalk.green('Success'))
        } else {
            console.error(chalk.red('Failure'))
        }
    });
}

function findDocument(fileName, documentName) {
    return new Promise((resolve, reject) => {
        find.file(fileName, './', files => {
            if (files.length) {
                return resolve(files)
            } else return reject(chalk.red(`Could not find ${documentName} file in given directory`))

        })
    });
}