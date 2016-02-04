'use strict';

const fs = require('fs');
const pg = require('pg-promise');
const pgtools = require('pgtools');
const sql = fs.readFileSync('./db/postgres_schema.sql').toString();
const dotenv = require('dotenv');

dotenv.load();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const pgp = pg();

pgtools.createdb({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}, process.env.DB_NAME, (err)=>{
  if (err) {
    console.error(err);
  } else {
      console.log('db successfully created.');
      const db = pgp(dbConfig);
      db.query(sql)
          .then(()=>{
              console.log('Schema successfully imported');
              pgp.end();
          })
          .catch((failure)=> {
              console.error(failure, 'failed');
              pgp.end();
          });
  }
});
