import User, { UserCreationAttributes } from "../entities/User";
import { Like } from "./operators";
import db from "../dbConfig";

async function createUser(user: UserCreationAttributes) {
  return await User.create(user);
}

async function getUsers(){
    return await User.findAndCountAll();
}

// async function getEmployees(employeeFilter: employeeFilterDto) {

//   if (!employeeFilter.take)
//     employeeFilter.take = 10;

//   if (!employeeFilter.skip)
//     employeeFilter.skip = 0;

//   let whereClause: any = {};
//   if (employeeFilter.employeeName)
//     whereClause.EmployeeName = { [Like]: `%${employeeFilter.employeeName}%` };

//   if (employeeFilter.employeeSurName)
//     whereClause.EmployeeSurName = { [Like]: `%${employeeFilter.employeeSurName}%` };

//   return await Employee.findAndCountAll(
//     {
//       distinct: true,
//       where: whereClause,
//       limit: employeeFilter.take,
//       offset: employeeFilter.skip * employeeFilter.take,
//     });

// }

async function getUserById(id: number) {
  return await User.findByPk(id);
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
  updateUser
}