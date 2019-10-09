const yaml = require('js-yaml');
const fs = require('fs');

function cleanUpTags(yamlText) {
    // yaml parser has trouble with custom tags
    return yamlText.replace(new RegExp("^[%|'---'].*", "gm"), "");
}

function readConfigFile(filePath) {
    const yamlText = fs.readFileSync(filePath, 'utf8');
    const cleanedUpYamlConfig = cleanUpTags(yamlText);
    return yaml.load(cleanedUpYamlConfig, {skipInvalid: true});
}

module.exports = { readConfigFile };


