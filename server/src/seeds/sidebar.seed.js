import mongoose from "mongoose";
import dotenv from "dotenv";
import Sidebar from "../models/modules.model.js";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI);

console.log("✅ MongoDB Connected");

const menus = [
  {
    key: "dashboard",
    title: "Dashboard",
    route: "/dashboard",
    icon: "LayoutDashboard",
    order: 1,
    permissionKey: "dashboard.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "employees",
    title: "Employees",
    route: "/employees",
    icon: "Users",
    order: 2,
    permissionKey: "employee.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "employers",
    title: "Employers",
    route: "/employers",
    icon: "Building2",
    order: 3,
    permissionKey: "employer.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "reports",
    title: "Reports",
    route: "/reports",
    icon: "FileText",
    order: 4,
    permissionKey: "report.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "settings",
    title: "Settings",
    route: null,
    icon: "Settings",
    order: 5,
    permissionKey: null,
    isVisible: true,
    isActive: true,
  },
];

const settings = await Sidebar.findOne({ key: "settings" });
const childMenus = [
  {
    key: "roles",
    title: "Roles",
    route: "/settings/roles",
    icon: "Shield",
    parent: settings._id,
    order: 1,
    permissionKey: "roles.view",
  },
  {
    key: "permissions",
    title: "Permissions",
    route: "/settings/permissions",
    icon: "Lock",
    parent: settings._id,
    order: 2,
    permissionKey: "permissions.view",
  },
];

try {
  //   await Sidebar.bulkWrite(
  //     menus.map((menu) => ({
  //       updateOne: {
  //         filter: { key: menu.key },
  //         update: { $set: menu },
  //         upsert: true,
  //       },
  //     })),
  //   );

  await Sidebar.bulkWrite(
    childMenus.map((menu) => ({
      updateOne: {
        filter: { key: menu.key },
        update: { $set: menu },
        upsert: true,
      },
    })),
  );
  console.log("✅ Sidebar seeded successfully.");
} catch (error) {
  console.error(error);
} finally {
  await mongoose.disconnect();
  console.log("🔌 MongoDB Disconnected");
}
