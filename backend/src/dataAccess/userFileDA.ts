import UserFile, { UserFileCreationAttributes } from "../entities/UserFile";
import { Like } from "./operators";
import db from "../dbConfig";

async function createUserFile(userFile: UserFileCreationAttributes) {
  return await UserFile.create(userFile);
}

async function getUserFiles(){
    return await UserFile.findAndCountAll();
}

async function getUserFileById(id: number) {
  return await UserFile.findByPk(id);
}


async function deleteUserFile(id: number) {
  let deleteElem = await UserFile.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateUserFile(file: UserFileCreationAttributes, id: number) {
  const findFile = await getUserFileById(file.FileId);

  if (!findFile) {
    console.log("This file does not exist");
    return;
  }

  const t = await db.transaction()
  try {
    await findFile.update(file);

    await t.commit();

  } catch (e) {
    await t.rollback();
    throw e;
  }
}

export {
  createUserFile,
  getUserFiles,
  getUserFileById,
  deleteUserFile,
  updateUserFile,
}