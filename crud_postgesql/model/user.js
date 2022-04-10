// const client = require('../connection/database');
// const user = client.query("CREATE TABLE practice(userId INT PRIMARY KEY NOT NULL, Name VARCHAR(10) NOT NULL, Email VARCHAR (20) NOT NULL, password VARCHAR(20)  NOT NULL )", (err, res) => {
//     console.log(err, res);
//     client.end();
// });
// module.exports = user;

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("user", {
        userId:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type:Sequelize.INTEGER
          },
        Name:{
            type: Sequelize.STRING
        },
        Email:{
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
        });
        return Users;
  };