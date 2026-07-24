import ApiError from "../configuration/ApiError.js";
import googleClient from "../configuration/googleAuthClient.js";
import { getUserDetails } from "../helpers/userInfoFromGoogle.js";
import userModel from "../models/user.model.js";
import { generateTokens } from "../utils/generateTokens.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = async (userData, file) => {
  const { firstName, lastName, email, password, role } = userData;

  if (!file) {
    throw new ApiError(400, "Profile image is required");
  }

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    firstName,
    lastName,
    email,
    role,
    password: hashedPassword,
    profileImage: file.path,
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
  };
};

export const loginUser = async (req) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, "Username is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const user = await userModel.findOne({ email: username });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }
  
  const now = new Date();

  if (
    user.refreshToken &&
    user.session &&
    user.session.expiresAt &&
    user.session.expiresAt > now
  ) {
    throw new ApiError(
      409,
      "You are already logged in on another device."
    );
  }

  user.refreshToken = null;
  user.session = null;


  const { accessToken, refreshToken } = generateTokens(user);

  user.refreshToken = refreshToken;

  user.session = {
    loginAt: now,
    lastActivity: now,
    expiresAt: new Date(
      now.getTime() + 7 * 24 * 60 * 60 * 1000
    ),
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};
export const forgotPassword = async (userData) => {
  const user = await userModel.findOne({ email: userData.username });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const hashedPassword = await bcrypt.hash(userData.newPassword, 10);

  user.password = hashedPassword;
  await user.save();
};

export const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(400, "Refresh token is required");
  }

  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  user.refreshToken = null;
  await user.save();
};

export const refreshToken = async (token) => {
  if (!token) {
    throw new ApiError(400, "Refresh token missing");
  }

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

  const user = {
    _id: decoded.id,
  };

  const { accessToken } = generateTokens(user);

  return accessToken;
};

export const googleAuth = async (req) => {
  const { tokens } = await googleClient.getToken(req.code);

  googleClient.setCredentials(tokens);

  const data = getUserDetails(tokens);

  const user = await userModel.findOne({ email: data.email });
  if (!user) throw new ApiError(400, "User not found");

  const isPasswordValid = await bcrypt.compare(
    userData.password,
    user.password,
  );
  if (!isPasswordValid) throw new ApiError(400, "Invalid password");

  const { accessToken, refreshToken } = generateTokens(user);
  user.refreshToken = refreshToken;
  await user.save();

  return { user, refreshToken, accessToken };
};

export default {
  createUser,
  loginUser,
  forgotPassword,
  logoutUser,
  refreshToken,
  googleAuth,
};
