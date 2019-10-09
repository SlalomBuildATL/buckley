const cli = require('commander');
const { analyzeProject } = require('./analyze-project');

cli
    .action(analyzeProject)
    .parse(process.argv);
