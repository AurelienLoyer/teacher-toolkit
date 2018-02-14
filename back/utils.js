const readlineSync = require('readline-sync');
const config = require('../config/config.js');

isValidJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

getAnswers = () => {
    const formation = readlineSync.question(`Quelle est votre formation (${config.default_formation}) ?  `) || config.default_formation;
    const who = readlineSync.question(`Quel est votre nom (${config.default_who}) ?  `) || config.default_who;
    const email = readlineSync.question(`Quel est votre email (${config.default_email}) ?  `) || config.default_email;
    const password = readlineSync.question(`Votre mot de passe pour la page admin (${config.admin_password}) ?  `) || config.admin_password;
    const twitter = readlineSync.question(`Votre Twitter ? (${config.default_twitter}) `) || config.default_twitter;
    const github = readlineSync.question(`Vaaotre GitHub ? (${config.default_github}) `) || config.default_github;
    return {
        formation,
        who,
        email,
        password,
        twitter,
        github
    }
}

module.exports = {
    isValidJsonString,
    getAnswers
};
