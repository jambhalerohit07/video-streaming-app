import mongoose from "mongoose";
import dotenv from "dotenv";
import roleModel from "../models/role.model.js";

dotenv.config();
const roles = [
  {
    roleName: "Admin",
  },
  {
    roleName: "User",
  },
];
try {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("✅ MongoDB Connected");

  await roleModel.bulkWrite(
    roles.map((role) => ({
      updateOne: {
        filter: { roleName: role.roleName },
        update: {
          $set: role,
        },
        upsert: true,
      },
    })),
  );

  console.log("✅ Roles seeded successfully");
} catch (error) {
  console.error(error);
} finally {
  await mongoose.disconnect();
}
