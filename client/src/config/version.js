import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagePath = path.resolve(__dirname, "../../package.json");

const packageJson = JSON.parse(
  fs.readFileSync(packagePath, "utf8")
);

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1);
const day = String(today.getDate());

const dateVersion = `${year-2000}.${month}.${day}`;

let build = 1;

if (
  typeof packageJson.version === "string" &&
  packageJson.version.startsWith(dateVersion)
) {
  const currentBuild = packageJson.version.split(".").at(-1) || "0";
  build = Number(currentBuild) + 1;
}

packageJson.version = `${dateVersion}.${build}`;

fs.writeFileSync(
  packagePath,
  JSON.stringify(packageJson, null, 2) + "\n"
);