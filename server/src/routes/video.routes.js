import mongoose from "mongoose";
import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { upload } from "../middlewares/upload.js";
import { getAllVideos, getVideo, uploadVideo } from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/verifyJwt.js";

const router = Router();

router.post(
  "/upload",
  verifyJWT,
  upload.single("video"),
  asyncHandler(uploadVideo)
);
router.post("/get-video-by-id", verifyJWT, asyncHandler(getVideo));
router.post("/get-all-videos", verifyJWT, asyncHandler(getAllVideos));

export default router;