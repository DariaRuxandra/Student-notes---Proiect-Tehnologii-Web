import db from '../dbConfig'
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';

export interface FileAttributes {
    FileId : number,
    UserId: number,
    FileContent: string | null
}

export interface FileCreationAttributes extends FileAttributes {}

//nu am vrut sa il numesc document, sa nu cumva sa se incurce cu DOM-ul
const File : ModelDefined<FileAttributes, FileCreationAttributes> = db.define("File", 
{
    FileId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    FileContent:
    {
        type: Sequelize.STRING,
        allowNull: true 
    }
});

export default File;