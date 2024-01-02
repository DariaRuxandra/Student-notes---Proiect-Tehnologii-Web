import db from '../dbConfig';
import Sequelize, { ModelDefined }  from 'sequelize';

export interface UserAttributes {
    UserId : number,
    UserName: string,
    UserEmail: string,
    UserPassword: string
}

export interface UserCreationAttributes extends UserAttributes {}


const User : ModelDefined<UserAttributes, UserCreationAttributes> = db.define("User", 
{
    UserId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    UserEmail:
    {
        type: Sequelize.STRING,
        allowNull: false 
    },
    UserPassword:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default User;