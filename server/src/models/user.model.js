import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    loginAt: Date,
    expiresAt: Date,
    lastActivity: Date,
    ip: String,
    userAgent: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    profileImage: {
      type: String,
      default: "",
    },
    refreshToken: { type: String },
    subscribers: { type: Number, default: 0 },
    subscribedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    session: {
    type: sessionSchema,
    default: null,
  },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
