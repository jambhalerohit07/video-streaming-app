import mongoose from "mongoose";

const sidebarSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    route: { type: String, default: null },
    icon: { type: String, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sidebar",
      default: null,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: null,
    },
    order: { type: Number, default: 0 },
    permissionKey: { type: String, default: null },
    isVisible: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Sidebar", sidebarSchema);
