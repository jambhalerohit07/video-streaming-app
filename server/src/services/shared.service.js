import userModel from "../models/user.model";

const getUser = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

export default {
  getUser,
};
