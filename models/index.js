const configDB = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(configDB.DB, configDB.USER, configDB.PASSWORD, {
  host: configDB.HOST,
  dialect: configDB.dialect,
  pool: {
    max: configDB.pool.max,
    min: configDB.pool.min,
    acquire: configDB.pool.acquire,
    idle: configDB.pool.idle
  }
});
 
const db = {
  sequelize: sequelize,
  Sequelize: Sequelize
}


module.exports = db

