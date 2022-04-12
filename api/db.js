const { Pool } = require("pg");

const pool = new Pool({
	password: process.env.POSTGRES_PASSWORD,
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_DB,
	database: process.env.POSTGRES_DB,
});

module.exports = pool;