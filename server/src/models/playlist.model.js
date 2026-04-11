import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  video: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  ],
});

export default mongoose.model("Playlist", playlistSchema);
