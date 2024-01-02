import mysql from "mysql2/promise.js";
import env from "dotenv";
import User from "./User";
import File from "./File";
import sequelize from "sequelize";
import UserFile from "./UserFile";

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

function fkConfig() {
    //many-to-many
  User.belongsToMany(File, {
    through: "UserFile",
    as: "Files",
    foreignKey: "UserId"
  });
  File.belongsToMany(User, {
    through: "UserFile",
    as: "Users",
    foreignKey: "FileId"
  });

// // In the User model
// User.belongsToMany(File, { through: UserFile });

// // In the File model
// File.belongsToMany(User, { through: UserFile });

}

function db_init() {
  createDatabase();
  fkConfig();
}

export default db_init;
