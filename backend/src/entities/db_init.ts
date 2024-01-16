import mysql from "mysql2/promise.js";
import env from "dotenv";
import User from "./User";
import File from "./File";
import sequelize from "sequelize";
// import UserFile from "./UserFile";
import db from "../dbConfig";

env.config();

function createDatabase() {
  mysql
    .createConnection({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    })
    .then((connection) => {
      return connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`
      );
    })
    .catch((err) => {
      console.warn(err.stack);
    });
}

// function fkConfig() {
//     //many-to-many
//   User.belongsToMany(File, {
//     through: "UserFile",
//     as: "Files",
//     foreignKey: "UserId"
//   });
//   File.belongsToMany(User, {
//     through: "UserFile",
//     as: "Users",
//     foreignKey: "FileId"
//   });
// }

function fkConfig() {
  // many-to-many
  User.belongsToMany(File, {
    through: "UserFile",
    as: "UserFiles", // Change the alias to 'UserFiles' or any other unique name
    foreignKey: "UserId"
  });
  File.belongsToMany(User, {
    through: "UserFile",
    as: "Users", // Change the alias to 'Users' or any other unique name
    foreignKey: "FileId"
  });
}



function db_init() {
  createDatabase();
  fkConfig();
}

export default db_init;
