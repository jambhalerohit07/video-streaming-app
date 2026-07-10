import ApiError from "../configuration/ApiError.js";
import commentModel from "../models/comment.model.js";

export const addComment = async (request) => {
    const { text, videoId } = req.request;
    if (!text) throw new ApiError(400, "Comment is required");

    const video = Video.findById(videoId);
    if (!video) throw new ApiError(400, "Video not found"); 

    const comment = await commentModel.create({
      text: text,
      videoId: videoId,
      user: req.userID,
    });
    return true
}

export const getAllComments = async (request) => {
    const comments = await commentModel.find({ videoId: request.body.videoId })
      .populate("user", "firstName lastName profileImage")
      .sort({ createdAt: -1 });

    if (!comments)
      throw new ApiError(400, "Comments not found");

    return comments
}

export const editComment = async (req) => {
    const { text, commentId } = req.body;
    if (!text) throw new ApiError(400, "Comment is required");
    const comment = await commentModel.findById(commentId);
    if (!comment) throw new ApiError(400, "Comment not found");
    comment.text = text;
    await comment.save();
}

export default {addComment,getAllComments,editComment}