const chalk = require('chalk');
const architectures = {
    0: ['None'],
    1: ['ARMv7'],
    2: ['ARM64'],
    3: ['ARMv7','ARM64'],
    4: ['x86'],
    5: ['ARMv7', 'x86'],
    6: ['ARM64', 'x86'],
    7: ['ARM64', 'x86']
}

module.exports = {
    verifyAndroidTargetArchitecture: (playerSettings, targets) => {
        if (targets.targetArchitectures.every(target => architectures[playerSettings.AndroidTargetArchitectures].includes(target))) {
            console.log(chalk.green(`Android target architectures include expected target (${chalk.bold(targets.targetArchitectures)})`));
            return true;
        }
        const errorMessage = chalk.red(`Incorrect Android target architecture: Expected: ${chalk.bold(targets.targetArchitectures)} | Actual: ${chalk.bold(architectures[playerSettings.AndroidTargetArchitectures])}`);
        console.error(errorMessage);
        return false;
    }
}

