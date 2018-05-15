const readlineSync = require('readline-sync');
const { exec } = require('child_process');
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
    const lang = readlineSync.question(`Quelle est votre langue (${config.default_lang}) ?  `) || config.default_lang;
    
    if(lang === 'fr') {
        const formation = readlineSync.question(`Quelle est votre formation (${config.default_formation}) ?  `) || config.default_formation;
        const who = readlineSync.question(`Quel est votre nom (${config.default_who}) ?  `) || config.default_who;
        const email = readlineSync.question(`Quel est votre email (${config.default_email}) ?  `) || config.default_email;
        const password = readlineSync.question(`Votre mot de passe pour la page admin (${config.admin_password}) ?  `) || config.admin_password;
        const twitter = readlineSync.question(`Votre Twitter (${config.default_twitter}) ?  `) || config.default_twitter;
        const github = readlineSync.question(`Votre GitHub (${config.default_github}) ?  `) || config.default_github;       

        return {
            lang,
            formation,
            who,
            email,
            password,
            twitter,
            github
        }
    }
 
    console.log('A 🦄 say: Not supported langage for the moment 🔫');
    process.exit(0);      
}

openDirectory = (directoryFullPath) => {
    let command = ''
    if(process.platform === 'win32'){
        command = 'explorer' // or start . ?   
    } else if(process.platform === 'darwin') {
        command = 'open'
    } else if(process.platform === 'linux') {
        command = 'nautilus'
    } 

    if(command) {
        exec(`${command} ${directoryFullPath}`, (err, stdout, stderr) => {
            if (err) {
                console.log(`Error during executing command: ${command} ${directoryFullPath}`);
                console.log(err);
                return;
            }
          });
    }else{
        // err no command found
    }
}

module.exports = {
    openDirectory,
    isValidJsonString,
    getAnswers
};
