import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createUser,
  forgotPassword,
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/upload.js";
import { verifyJWT } from "../middlewares/verifyJwt.js";
import { validate } from "../middlewares/validation.middleware.js";
import { forgotPasswordSchema, loginSchema, registerSchema } from "../constants/ValidationSchemas/auth.validator.js";

const router = Router();

router.post(
  "/create-user",
  validate(registerSchema),
  upload.single("profileImage"),
  asyncHandler(createUser),
);
router.post("/login",validate(loginSchema), asyncHandler(loginUser));
router.post("/forgot-password",validate(forgotPasswordSchema), asyncHandler(forgotPassword));
router.post("/logout", asyncHandler(logoutUser));
router.post("/refresh-token", asyncHandler(refreshToken));

export default router;
