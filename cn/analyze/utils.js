const yaml = require('js-yaml');
const fs = require('fs');
const inquirer = require('inquirer');

function cleanUpTags(yamlText) {
    // yaml parser has trouble with custom tags
    return yamlText.replace(new RegExp("^[%|'---'].*", "gm"), "");
}

function readConfigFile(filePath) {
    const yamlText = fs.readFileSync(filePath, 'utf8');
    const cleanedUpYamlConfig = cleanUpTags(yamlText);
    return yaml.load(cleanedUpYamlConfig, {skipInvalid: true});
}

function readTextFileSync(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function selectFile(files) {
    if (files.length > 1) {
        return inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'file',
                    message: `Multiple matching files found, which one would you like to use?`,
                    choices: files
                }
            ]).then(answers => answers.file);

    } else {
        return Promise.resolve(files[0]);
    }

}


module.exports = { readConfigFile, selectFile, readTextFileSync };


