import Comment from "../models/comment.model.js";
import Video from "../models/video.model.js";
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
