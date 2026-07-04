import Comment from "../models/comment.model.js";
import Video from "../models/video.model.js";
import ExcelJS from "exceljs"
import path from "path";
import fs from "fs";
export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;
    if (!text) return res.status(404).json({ message: "Text is required" });

    const video = Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const comment = await Comment.create({
      text: text,
      videoId: videoId,
      user: req.userID,
    });

    return res
      .status(200)
      .json({ message: "Comment added successfully", data: [] });
  } catch (error) {}
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.body.videoId })
      .populate("user", "firstName lastName profileImage")
      .sort({ createdAt: -1 });

    if (!comments)
      return res.status(404).json({ message: "Comments not found" });
    return res
      .status(200)
      .json({ message: "Comments fetched successfully", data: comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editComment = async (req, res) => {
  try {
    const { text, commentId } = req.body;
    if (!text) return res.status(404).json({ message: "Text is required" });
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    comment.text = text;
    await comment.save();
    return res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    await comment.remove();
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const downloadExcel = async (req, res) => {
  // try {
  //   const workbook = new ExcelJS.Workbook();

  //   const worksheet = workbook.addWorksheet("Employees");

  //   worksheet.columns = [
  //       { header: "Employee Code", key: "employeeCode", width: 20 },
  //       { header: "Employee Name", key: "name", width: 25 },
  //       { header: "Gender", key: "gender", width: 20 },
  //       { header: "Department", key: "department", width: 25 },
  //       { header: "Status", key: "status", width: 20 },
  //   ];

  //   const genders = ["Male", "Female", "Other"];
  //   const departments = ["IT", "HR", "Finance", "Sales"];
  //   const statuses = ["Active", "Inactive"];

  //   for (let row = 2; row <= 100; row++) {
  //       worksheet.getCell(`C${row}`).dataValidation = {
  //         type: "list",
  //         allowBlank: true,
  //         formulae: ['"Male,Female,Other"'],
  //       };
  //       worksheet.getCell(`D${row}`).dataValidation = {
  //         type: "list",
  //         allowBlank: true,
  //         formulae: ['"IT,HR,Finance,Sales"'],
  //       };

  //       worksheet.getCell(`E${row}`).dataValidation = {
  //         type: "list",
  //         allowBlank: true,
  //         formulae: ['"Active,Inactive"'],
  //       };
  //   }
  //   const folderPath = path.join(process.cwd(), "public");

  //   if (!fs.existsSync(folderPath)) {
  //     fs.mkdirSync(folderPath, { recursive: true });
  //   }

  //   const fileName = `employee-template-${Date.now()}.xlsx`;

  //   const filePath = path.join(folderPath, fileName);

  //   await workbook.xlsx.writeFile(filePath);

  //   return res.status(200).json({
  //     success: true,
  //     downloadUrl: `http://localhost:4000/downloads/${fileName}`,
  //   });

  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({
  //     success: false,
  //     message: error.message,
  //   });
  // }
   try {
     
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Employees");

    worksheet.columns = [
      { header: "Employee Code", key: "employeeCode", width: 20 },
      { header: "Employee Name", key: "name", width: 25 },
      { header: "Gender", key: "gender", width: 20 },
      { header: "Department", key: "department", width: 25 },
      { header: "Status", key: "status", width: 20 },
    ];

    for (let row = 2; row <= 100; row++) {
      worksheet.getCell(`C${row}`).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"Male,Female,Other"'],
      };

      worksheet.getCell(`D${row}`).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"IT,HR,Finance,Sales"'],
      };

      worksheet.getCell(`E${row}`).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"Active,Inactive"'],
      };
    }

    worksheet.getRow(1).font = {
      bold: true,
    };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="employee-template.xlsx"'
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}