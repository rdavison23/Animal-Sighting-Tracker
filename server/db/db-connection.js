const pgp = require('pg-promise')();
require('dotenv').config();

const db = pgp(process.env.DATABASE_URI);

module.exports = db;
