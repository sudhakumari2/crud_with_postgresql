// const {Client} = require('pg')
// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'demo',
//   password: 'Sudha@123',
//   port: 5432,
//   dialect: "postgres",
// })
// module.exports = client;

// const Sequelize = require('sequelize');
// const db = new Sequelize("demo", "postgres","Sudha@123",{
//     host: "localhost",
//     dialect: "postgres",
//     pool:{
//         max: 5,
//         min: 0,
//         acquire: "30000",
//         idle: "10000"
//     }
// })
// module.exports = db;

const Sequelize = require("sequelize");
const sequelize = new Sequelize("demo", "postgres", "Sudha@123", {
  host:"localhost",
  dialect: "postgres",
  operatorsAliases: false,
  pool: {
    max:5,
    min: 0,
    acquire:30000,
    idle: 10000
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = require("../model/user")(sequelize, Sequelize);
module.exports = db;