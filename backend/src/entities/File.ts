import db from '../dbConfig';
import Sequelize, { DataTypes, ModelDefined } from 'sequelize';

export interface FileAttributes {
    FileId: number;
    FileCourse: string;
    FileTitle: string;
    FileContent: string | null;
}

export interface FileCreationAttributes extends FileAttributes {}

const File: ModelDefined<FileAttributes, FileCreationAttributes> = db.define(
    'File',
    {
        FileId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        FileCourse: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        FileTitle: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        FileContent: {
            type: Sequelize.TEXT, // Change to Sequelize.TEXT for longer texts
            allowNull: true,
        },
    }
);

export default File;
