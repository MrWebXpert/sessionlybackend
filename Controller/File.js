const File = require("../Models/ProfilePic.js");

exports.getAllVideos = async (req, res) => {
  try {
    const data = await File.find();
    if (!data) {
      return res.status(500).json({ message: "no video available" });
    }
    return res.status(201).json({ success: true, message: "done", data: data });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

exports.getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await fileModel.findById(id);
    if (!video) {
      return res.status(500).json({ message: "no video available..." });
    }
    res.contentType("video/mp4");
    return res.send(video.buffer);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};