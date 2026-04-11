import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./dbConfig/index.js";
import requestId from "./middlewares/requestId.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(requestId);

app.use(
  cors({
    origin: [
      "http://localhost:5173/",
      "http://localhost:5174/",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Auth Routes
app.use("/api/user", authRoutes);
