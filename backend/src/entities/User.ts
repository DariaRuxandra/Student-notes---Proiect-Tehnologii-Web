import db from '../dbConfig';
import Sequelize, { Model, DataTypes, HasManyAddAssociationMixin } from 'sequelize';
import File, { FileAttributes, FileCreationAttributes } from './File';
import  UserFile  from './UserFile';

export interface UserAttributes {
  UserId: number;
  UserName: string;
  UserEmail: string;
  UserPassword: string;
}

export interface UserCreationAttributes extends UserAttributes {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
  Files?: FileAttributes[];
  addFile: HasManyAddAssociationMixin<File, number>;
  UserFiles?: File[];
}

const User = db.define<UserInstance>('User', {
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsToMany(File, {
  through: UserFile,
  foreignKey: 'UserId',
  otherKey: 'FileId',
  as: 'Files',
});

export default User;
