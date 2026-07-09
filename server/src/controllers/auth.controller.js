import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokens } from "../utils/generateTokens.js";
import logger from "../configuration/logger.js";
import ApiResponse from "../configuration/ApiResponse.js";
import authService from "../services/auth.service.js";

export const createUser = async (req, res) => {
    const user = await authService.createUser(req.body, req.file);

  return res.status(200).json(
    new ApiResponse(
      200,
      user,
      "User registered successfully"
    )
  );
};

export const loginUser = async (req, res) => {
    const {user,refreshToken,accessToken} = authService.loginUser(req.body)
    
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

    return res.status(200).json(
    new ApiResponse(
      200,
      responseData,
      "Login successful"
    )
  );

    return res.status(200).json({
      message: "",
      statusCode: 200,
      accessToken: accessToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
};

export const forgotPassword = async (req, res) => {
    const { username, newPassword } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!newPassword) {
      return res.status(400).json({ message: "New Password is required" });
    }

    const user = await User.findOne({ email: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password updated successfully", statusCode: 200 });
};

export const logoutUser = async (req, res) => {
    logger.info("Request received", {
      requestId: req.requestId,
      route: req.originalUrl,
      method: req.method,
    });
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res
      .status(200)
      .json({ message: "Logout successful", statusCode: 200 });
};

export const refreshToken = async (res, req) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = {
      _id: decoded.id,
    };

    const { accessToken } = generateTokens(user);

    return res.status(200).json({
      statusCode: 200,
      accessToken: accessToken,
    });
};
