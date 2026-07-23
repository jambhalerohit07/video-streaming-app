import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import videoRoutes from "./routes/video.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./dbConfig/index.js";
import requestId from "./middlewares/requestId.js";
import { apiLimiter } from "./configuration/rateLimiter.js";
import errorHandler from "./middlewares/errorHandler.js";
import sharedRoutes from "./routes/shared.routes.js";

dotenv.config();

let app = express();
app.disable("x-powered-by");

app.use(cookieParser());
// app.use(helmet.contentSecurityPolicy());
app.use(helmet());

app.use(requestId);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);

async function startServer() {
  try {
    await connectDB();

    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
// Auth Routes
app.use("/api/auth", authRoutes);
// Video Routes
app.use("/api/video", videoRoutes);
// Comment Routes
app.use("/api/comment", commentRoutes);
// Shared Routes
app.use("/api/shared", sharedRoutes)

app.use(errorHandler);
