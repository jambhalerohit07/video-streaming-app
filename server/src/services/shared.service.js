import modulesModel from "../models/modules.model.js";
import userModel from "../models/user.model.js";

const getUser = async (id) => {
  const user = await userModel.getUser(id);
  return user;
};

const getUserModule = async () => {
  const modules = await modulesModel.find({ isActive: true })
  .select(
    "key title route icon permissionKey parent order isVisible"
  )
  .sort({ order: 1 })
  .lean();;
  return modules;
};

export default {
  getUser,
  getUserModule
};
