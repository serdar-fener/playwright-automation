 export function getEnv() {
    return 'dev';
 }
 
 export function getAppConfig() {
    return appConfig[getEnv()];
 }
 
 const appConfig = {
    dev: {
        trelloAPIURL: 'https://api.trello.com',
        trelloAPIKey: '14d631c0808102f78f01c113638f8ff7',
        trelloSecret: 'a1f4e06e44976ee6432ebba63fae3d82975130440ccdeed4ca944284f37f0675',
        trelloToken: 'ATTAda1f5f55a410ee2262f9bcd0ddafc39f07f22e5a6b7438a4038e6f85edefdd6aB28B8F59',
        trelloURL: 'https://trello.com/login',
        trelloUsername: 'sfener06@gmail.com',
        trelloPassword: '123QWEasd!'
    }
};
