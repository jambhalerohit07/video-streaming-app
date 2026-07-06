import { rateLimit } from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit:50,
  standardHeaders: true,
  legacyHeaders: false,
});