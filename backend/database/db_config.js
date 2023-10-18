const knex = require("knex");
const knexfile = require("./knexfile");

const db_config = knex(knexfile);
module.exports = { db_config };