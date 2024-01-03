import User, { UserCreationAttributes } from "../entities/User";
import { Like } from "./operators";
import db from "../dbConfig";

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
  getUserByEmail
}