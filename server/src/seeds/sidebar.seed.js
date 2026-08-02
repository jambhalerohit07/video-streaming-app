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
    route: "/",
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
    key: "departments",
    title: "Departments",
    route: "/departments",
    icon: "Building",
    order: 4,
    permissionKey: "department.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "attendance",
    title: "Attendance",
    route: "/attendance",
    icon: "CalendarCheck",
    order: 5,
    permissionKey: "attendance.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "leave",
    title: "Leave Management",
    route: "/leave",
    icon: "CalendarDays",
    order: 6,
    permissionKey: "leave.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "payroll",
    title: "Payroll",
    route: "/payroll",
    icon: "Wallet",
    order: 7,
    permissionKey: "payroll.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "projects",
    title: "Projects",
    route: "/projects",
    icon: "FolderKanban",
    order: 8,
    permissionKey: "project.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "clients",
    title: "Clients",
    route: "/clients",
    icon: "Handshake",
    order: 9,
    permissionKey: "client.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "reports",
    title: "Reports",
    route: "/reports",
    icon: "FileText",
    order: 10,
    permissionKey: "report.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "notifications",
    title: "Notifications",
    route: "/notifications",
    icon: "Bell",
    order: 11,
    permissionKey: "notification.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "auditLogs",
    title: "Audit Logs",
    route: "/audit-logs",
    icon: "History",
    order: 12,
    permissionKey: "audit.view",
    isVisible: true,
    isActive: true,
  },
  {
    key: "settings",
    title: "Settings",
    route: null,
    icon: "Settings",
    order: 13,
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
  {
    key: "users",
    title: "Users",
    route: "/settings/users",
    icon: "Users",
    parent: settings._id,
    order: 3,
    permissionKey: "users.view",
  },
  {
    key: "designation",
    title: "Designation",
    route: "/settings/designation",
    icon: "BadgeCheck",
    parent: settings._id,
    order: 4,
    permissionKey: "designation.view",
  },
  {
    key: "departments",
    title: "Departments",
    route: "/settings/departments",
    icon: "Building",
    parent: settings._id,
    order: 5,
    permissionKey: "department.view",
  },
  {
    key: "branches",
    title: "Branches",
    route: "/settings/branches",
    icon: "MapPinned",
    parent: settings._id,
    order: 6,
    permissionKey: "branch.view",
  },
  {
    key: "holidays",
    title: "Holidays",
    route: "/settings/holidays",
    icon: "Calendar",
    parent: settings._id,
    order: 7,
    permissionKey: "holiday.view",
  },
  {
    key: "emailTemplates",
    title: "Email Templates",
    route: "/settings/email-templates",
    icon: "Mail",
    parent: settings._id,
    order: 8,
    permissionKey: "email-template.view",
  },
  {
    key: "systemConfig",
    title: "System Configuration",
    route: "/settings/system-config",
    icon: "Cog",
    parent: settings._id,
    order: 9,
    permissionKey: "system-config.view",
  },
  {
    key: "profile",
    title: "Profile Settings",
    route: "/settings/profile",
    icon: "UserCircle",
    parent: settings._id,
    order: 10,
    permissionKey: "profile.view",
  },
];

try {
    await Sidebar.bulkWrite(
      menus.map((menu) => ({
        updateOne: {
          filter: { key: menu.key },
          update: { $set: menu },
          upsert: true,
        },
      })),
    );

  // await Sidebar.bulkWrite(
  //   childMenus.map((menu) => ({
  //     updateOne: {
  //       filter: { key: menu.key },
  //       update: { $set: menu },
  //       upsert: true,
  //     },
  //   })),
  // );
  console.log("✅ Sidebar seeded successfully.");
} catch (error) {
  console.error(error);
} finally {
  await mongoose.disconnect();
  console.log("🔌 MongoDB Disconnected");
}
