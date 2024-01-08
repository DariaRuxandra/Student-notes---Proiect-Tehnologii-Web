import db from '../dbConfig'
import Sequelize from 'sequelize';
import { ModelDefined } from 'sequelize';

export interface CourseAttributes {
    CourseId : number,
    UserId: number,
    CourseName: string
}

export interface CourseCreationAttributes extends CourseAttributes {}

// Salvez cursurile pentru filtrare
const Course : ModelDefined<CourseAttributes, CourseCreationAttributes> = db.define("Course", 
{
    CourseId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserId:
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CourseName:
    {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Course;