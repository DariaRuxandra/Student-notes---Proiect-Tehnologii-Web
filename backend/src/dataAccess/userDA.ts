import User, { UserCreationAttributes } from "../entities/User";
import { Like } from "./operators";
import db from "../dbConfig";
import File, {FileCreationAttributes} from "../entities/File";
import UserFile, {UserFileCreationAttributes} from "../entities/UserFile";


async function createUser(user: UserCreationAttributes) {
  return await User.create(user);
}

async function getUsers(){
    return await User.findAndCountAll();
}

async function getUserById(id: number) {
  return await User.findByPk(id);
}

async function getUserByEmail(email: string) {
  try {
    const user = await User.findOne({
      where: {
        UserEmail: email
      }
    });
    console.log(`user = ${user}`);
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

//m-a distrus, dar merge
async function  getUserCoursesById(userId: any) {
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: File,
        as: 'Files',
        attributes: ['FileId','FileCourse', 'FileTitle', 'FileContent'],
        through: { attributes: [] },
      },
    });

    if (!user) {
      console.log(`User not found for ID: ${userId}`);
      return { error: 'User not found' };
    }

    const userFiles = (user as any).getDataValue('Files'); 

    if (!Array.isArray(userFiles)) {
      console.log(`User ${userId} has no associated courses`);
      return { error: 'User has no associated courses' };
    }

    const courses = userFiles.map((file: any) => file.FileCourse);

    // if (!courses.length) {
    //   console.log(`User ${userId} has no associated courses`);
    //   return { error: 'User has no associated courses' };
    // }

    // return { courses };

    if (!Array.isArray(userFiles) || userFiles.length === 0) {
      console.log(`User ${userId} has no associated courses`);
      return { error: 'User has no associated courses' };
    }

    return { courses: userFiles }; // Return the entire array of file objects

  } catch (error) {
    console.error('Error fetching user courses:', error);
    return { error: 'Internal Server Error' };
  }
}





async function getUserForLogin(email: string, password: string) {
  try {
    const user = await User.findOne({
      where: {
        UserEmail: email,
        UserPassword: password
      }
    });
    console.log(`user = ${user}`);
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}

async function deleteUser(id: number) {
  let deleteElem = await User.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateUser(user: UserCreationAttributes, id: number) {
  const findUser = await getUserById(user.UserId);

  if (!findUser) {
    console.log("This employee does not exist");
    return;
  }

  const t = await db.transaction()
  try {
    await findUser.update(user);

    await t.commit();

  } catch (e) {
    await t.rollback();
    throw e;
  }
}

export {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  getUserByEmail,
  getUserForLogin,
  getUserCoursesById
}