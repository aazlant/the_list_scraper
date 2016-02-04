'use strict';

var fs = require('fs');
var pg = require('pg-promise');
var sql = fs.readFileSync('./db/postgres_schema.sql').toString();
var dotenv = require('dotenv');

dotenv.load();

var dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

var pgp = pg();
var db = pgp(dbConfig);

db.query(sql)
  .then(function () {
    console.log('done');
  })
  .catch(function (err) {
    console.error(err, 'failed');
  });
