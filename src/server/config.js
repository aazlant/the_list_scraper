// TODO: Break into by-server for API/APP.

const appHost = process.env.APPHOST || 'localhost';
const appPort = process.env.APPSERVER_PORT || 3000;
const apiHost = process.env.APIHOST || 'localhost';
const apiPort = process.env.APISERVER_PORT || 8080;
const secret = process.env.SECRET || 'some_string_of_text';
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_SECRET;

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

export default {
    appPort,
    appHost,
    apiPort,
    apiHost,
    dbConfig,
    googleClientId,
    googleSecret,
    secret,
};
