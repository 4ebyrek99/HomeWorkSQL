const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  pool: {
    max: 5,
    min: 1,
    acquire: process.env.POOL_ACQUIRE,
    idle: process.env.POOL_IDLE
  }
});

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize
}


module.exports = db

