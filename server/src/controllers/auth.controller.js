import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokens } from "../utils/generateTokens.js";
import logger from "../configuration/logger.js";
import ApiResponse from "../configuration/ApiResponse.js";
import authService from "../services/auth.service.js";
import { tr } from "zod/v4/locales";

export const createUser = async (req, res) => {
  const user = await authService.createUser(req.body, req.file);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User registered successfully"));
};

export const loginUser = async (req, res) => {
  const { user, refreshToken, accessToken } = await authService.loginUser(
    req.body,
  );

  res.cookie("refreshToken", refreshToken, {
    // httpOnly: true,
    // secure: false,
    // sameSite: "lax",
    // maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const responseData = {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    },
    accessToken,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "Login successful"));
};

export const forgotPassword = async (req, res) => {
  await authService.forgotPassword(req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "Password updated successfully"));
};

export const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  await authService.logoutUser(refreshToken);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  return res.status(200).json(new ApiResponse(200, null, "Logout successful"));
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const token = await authService.refreshToken(refreshToken);

  return res.status(200).json(new ApiResponse(200, token));
};

export const googleAuth = async ( req,res) => {
  const { user, refreshToken, accessToken } = await authService.googleAuth(
    req.body,
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const responseData = {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
    },
    accessToken,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "Login successful"));
};
