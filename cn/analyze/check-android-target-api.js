const chalk = require('chalk');

const apis = {
    0: "None",
    21: "Android 5.0 (Lollipop)",
    22: "Android 5.1 (Lollipop)",
    23: "Android 6.0 (Marshmallow)",
    24: "Android 7.1 (Nougat)",
    26: "Android 8.0 (Oreo)",
    27: "Android 8.1 (Oreo)",
    28: "Android 9.0 (Pie)",
    29: "Android 10.0 (Q)",
};

module.exports = {
    verifyAndroidTargetAPI: (playerSettings, targets) => {
        if (targets.targetApi <= playerSettings.AndroidTargetSdkVersion) {
            console.log(chalk.green(`Android target API matches expected target (${chalk.bold(apis[targets.targetApi])})`));
            return true;
        }
        const errorMessage = chalk.red(`Incorrect Android target API: Expected: ${chalk.bold(apis[targets.targetApi])} | Actual: ${chalk.bold(apis[playerSettings.AndroidTargetSdkVersion])}`);
        console.error(errorMessage);
        return false;
    }
};
