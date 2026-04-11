import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createUser,
  forgotPassword,
  loginUser,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/upload.js";
import { verifyJWT } from "../middlewares/verifyJwt.js";

const router = Router();

router.post(
  "/create-user",
  upload.single("profileImage"),
  asyncHandler(createUser)
);
router.post("/login", asyncHandler(loginUser));
router.post("/forgot-password", asyncHandler(forgotPassword));

export default router;
