const cli = require('commander');
const { analyzeProject } = require('./analyze-project');

cli
    .option('-v, --verbose', 'verbose')
    .action(analyzeProject)
    .parse(process.argv);
