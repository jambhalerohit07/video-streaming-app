import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokens } from "../utils/generateTokens.js";
import logger from "../configuration/logger.js";

export const createUser = async (req, res) => {
  try {
    debugger;

    logger.info("Request received", {
      requestId: req.requestId,
      route: "/test",
      method: req.method,
    });
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      role,
      password: hashedPassword,
      profileImage: req.file.path,
    });
    await newUser.save();

    return res.status(200).json({
      message: "User registered successfully",
      data: [],
      statusCode: 200,
    });
  } catch (error) {
    logger.error("Error creating user", { requestId: req.requestId, error });
    res.status(500).json({ statusCode: 500, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    logger.info("Request received", {
      requestId: req.requestId,
      route: "/test",
      method: req.method,
    });

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ email: username });
    if (!user)
      return res.status(404).json({
        message: "User not found",
        statusCode: 404,
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({
        message: "Invalid password",
        statusCode: 400,
      });

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
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
  } catch (error) {
    logger.error("Error logging in user", {
      requestId: req.requestId,
      error: error.message,
    });
    return res.status(500).json({
      message: error.message,
      statusCode: 500,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ statusCode: 500, error: error.message });
  }
};
