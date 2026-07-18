import ApiResponse from "../configuration/ApiResponse";
import userService from "../services/shared.service.js";
export const getUser = async (req, res) => {
  const users = await userService.getUser(req.userId);
  if (!users) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  return res.status(200).json(new ApiResponse(200, users));
};
