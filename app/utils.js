const readlineSync = require('readline-sync');
const fs = require('fs');
const { exec } = require('child_process');
const config = require('../config/config.js');

const homedirPath = require('os').homedir();
const userFilePath = homedirPath + '/.teacher-toolkit.json'

isValidJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

storeUserAnswers = answers => {
    fs.writeFileSync(userFilePath, JSON.stringify(answers));
}

getUserAnswers = () => {
    try {
        return require(userFilePath);
    } catch (e) {
        return {}
    }
}

getAnswers = () => {
    const userAnswers = getUserAnswers();

    if (userAnswers && userAnswers.who) {
        const useUserAnswer = readlineSync.question(`Voulez vous utiliser vos préférences (Y/n) ?  `) || config.default_useUserAnswer;
        if (useUserAnswer === 'Y') {
            return userAnswers;
        }
    }

    const lang = readlineSync.question(`Quelle est votre langue (${config.default_lang}) ?  `) || config.default_lang;

    if (lang === 'fr') {
        const formation = readlineSync.question(`Quelle est votre formation (${config.default_formation}) ?  `) || config.default_formation;
        const who = readlineSync.question(`Quel est votre nom (${config.default_who}) ?  `) || config.default_who;
        const email = readlineSync.question(`Quel est votre email (${config.default_email}) ?  `) || config.default_email;
        const password = readlineSync.question(`Votre mot de passe pour la page admin (${config.admin_password}) ?  `) || config.admin_password;
        const twitter = readlineSync.question(`Votre Twitter (${config.default_twitter}) ?  `) || config.default_twitter;
        const github = readlineSync.question(`Votre GitHub (${config.default_github}) ?  `) || config.default_github;

        const answers = {
            lang,
            formation,
            who,
            email,
            password,
            twitter,
            github
        }

        storeUserAnswers(answers)

        return answers
    }

    console.log('A 🦄 say: Not supported langage for the moment 🔫');
    process.exit(0);
}

openDirectory = (directoryFullPath, callback) => {
    let command = ''
    if (process.platform === 'win32') {
        command = 'explorer' // or start . ?   
    } else if (process.platform === 'darwin') {
        command = 'open'
    } else if (process.platform === 'linux') {
        command = 'nautilus'
    }

    if (command) {
        const fullCommand = `${command} ${directoryFullPath}`;

        try {
            exec(fullCommand, (err, stdout, stderr) => callback(fullCommand, err, stdout, stderr));
        } catch (error) {
            callback(fullCommand, error);
        }

    } else {
        callback('', new Error(`Platform ${process.platform} not support for the moment`));
    }
}

module.exports = {
    openDirectory,
    isValidJsonString,
    getAnswers
};
