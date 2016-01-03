const port = process.env.APPSERVER_PORT || 3000;
const apiHost = process.env.APIHOST || 'localhost';
const apiPort = process.env.APISERVER_PORT || 8080;

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

module.exports = Object.assign({
    port,
    apiPort,
    apiHost,
    dbConfig,
}, {});
