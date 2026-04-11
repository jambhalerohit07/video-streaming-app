import { filePaths } from "../constants/constants";
import Video from "../models/video.model";
export const uploadVideo = async (req, res) => {
  try {
    const videoFile = req.files.video?.[0];

    if (!videoFile)
      return res.status(400).json({ message: "Video is required." });

    const thumbnailFile = req.files.thumbnail?.[0];

    await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoPath: `${filePaths.videoPaths}${videoFile.filename}`,
      thumbnail: thumbnailFile
        ? `${filePaths.thumbnailPaths}${thumbnailFile.filename}`
        : "",
      owner: req.userId,
    });

    res.status(200).json({ message: "Video uploaded successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const { videoId } = req.body;
    const video = Video.findById(videoId).populate("owner");

    if (!video) return res.status(404).json({ message: "Video not found." });

    video.views++;
    await video.save();

    res.status(200).json({
      message: "Video fetched successfully",
      data: video,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = awaitVideo.find({ owner: req.userId }).populate("owner");

    if (!videos) return res.status(404).json({ message: "Videos not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
