import mongoose from "mongoose";
import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { upload } from "../middlewares/upload.js";
import { addComment, deleteComment, editComment, getAllComments } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/verifyJwt.js";


const router = Router();

router.post("/add-comment", verifyJWT,asyncHandler(addComment));
router.post("/get-all-comments", verifyJWT, asyncHandler(getAllComments));
router.post("/edit-comment", verifyJWT, asyncHandler(editComment));
router.post("/delete-comment", verifyJWT, asyncHandler(deleteComment));

export default router;