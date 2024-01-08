import File, { FileCreationAttributes } from "../entities/File";
import { Like } from "./operators";
import db from "../dbConfig";

async function createFile(file: FileCreationAttributes) {
  return await File.create(file);
}

async function getFiles(){
    return await File.findAndCountAll();
}

async function getFileById(id: number) {
  return await File.findByPk(id);
}


async function deleteFile(id: number) {
  let deleteElem = await File.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateFile(file: FileCreationAttributes, id: number) {
  const findFile = await getFileById(file.FileId);

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
  createFile,
  getFiles,
  getFileById,
  deleteFile,
  updateFile,
}