import Course, { CourseCreationAttributes } from "../entities/Course";
import { Like } from "./operators";
import db from "../dbConfig";

async function createCourse(course: CourseCreationAttributes) {
  return await Course.create(course);
}

async function getCourses(){
    return await Course.findAndCountAll();
}

async function getCourseById(id: number) {
  return await Course.findByPk(id);
}

async function getCourseByName(name: string) {
  try {
    const course = await Course.findOne({
      where: {
        CourseName: name
      }
    });
    console.log(`user = ${course}`);
    return course;
  } catch (error) {
    console.error('Error getting course by name:', error);
    throw error;
  }
}

async function deleteCourse(id: number) {
  let deleteCourse = await Course.findByPk(id);

  if (!deleteCourse) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteCourse.destroy();
}

async function updateCourse(course: CourseCreationAttributes, id: number) {
  const findCourse = await getCourseById(course.CourseId);

  if (!findCourse) {
    console.log("This course does not exist");
    return;
  }

  const t = await db.transaction()
  try {
    await findCourse.update(course);

    await t.commit();

  } catch (e) {
    await t.rollback();
    throw e;
  }
}

export {
  createCourse,
  getCourses,
  getCourseById,
  deleteCourse,
  updateCourse,
  getCourseByName
}