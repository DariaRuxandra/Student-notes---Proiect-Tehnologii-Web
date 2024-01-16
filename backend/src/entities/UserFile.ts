import db from '../dbConfig'
import Sequelize, { ModelDefined } from 'sequelize';
import User from './User';
import File from './File';


//aici e un junction table, pentru ca avem relatie many-to-many    

export interface UserFileAttributes {
    UserId : number,
    FileId: number
}

export interface UserFileCreationAttributes extends UserFileAttributes {}

const UserFile : ModelDefined<UserFileAttributes, UserFileCreationAttributes> = db.define("UserFile", 
{
    UserId: 
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        references: {
            model: User, 
            key: 'UserId'
          }
    },
    FileId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        references: {
            model: File,
            key: 'FileId'
          }
    }
});

export default UserFile;