'use strict';

const pgtools = require('pgtools');
const dotenv = require('dotenv');

dotenv.load();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

pgtools.dropdb(dbConfig, process.env.DB_NAME, (err)=>{
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully dropped.');
  }
});
