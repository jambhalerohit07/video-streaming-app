import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { getUserModule } from "../controllers/shared.controller.js";
import { verifyJWT } from "../middlewares/verifyJwt.js";



const router = Router();

router.get("/get-module",verifyJWT, asyncHandler(getUserModule));





export default router;