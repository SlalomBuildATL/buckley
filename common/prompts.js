const inquirer = require('inquirer');

module.exports = {
    promptForUsernameAndPassword: () => {
        //returns {username, password}
        const questions = [
            {
                type: 'input',
                name: 'username',
                message: 'Please enter your username',
                filter: (val) => val.split("@")[0]
            },
            {
                type: 'password',
                name: 'password',
                message: 'Please enter your password'
            }
        ];

        return inquirer.prompt(questions)
    }
}
