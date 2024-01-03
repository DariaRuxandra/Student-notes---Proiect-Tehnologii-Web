import mysql from "mysql2/promise.js";
import env from "dotenv";
import User from "./User";
import File from "./File";
import sequelize from "sequelize";
import UserFile from "./UserFile";
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
}

// async function addUserForTest() {
//   try {
//       const query = `
//           INSERT INTO user (UserId, UserName, UserEmail, UserPassword)
//           VALUES (1, 'Ionut', 'campeanuionut21@stud.ase.ro', 'parolaSecure');
//       `;

//       // Execute the raw SQL query
//       await db.query(query);

//       console.log('Test user added for testing.');
//   } catch (error) {
//       console.error('Error adding test user:', error);
//   }
// }

function db_init() {
  createDatabase();
  fkConfig();
  // addUserForTest();
}

export default db_init;
