import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   const uploadPath = "uploads/profile";

  //   if (!fs.existsSync(uploadPath)) {
  //     fs.mkdirSync(uploadPath, { recursive: true });
  //   }

  //   cb(null, uploadPath);
  // },
  destination: (req, file, cb) => {
    let folder = "uploads/";

    if (file.mimetype.startsWith("video")) folder += "videos";
    else if (file.mimetype.startsWith("image")) folder += "thumbnails";

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
