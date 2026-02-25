const express = require("express");
const router = express.Router();
const { 
  createVideo, 
  getAllVideos, 
  deleteVideo, 
  updateVideo,
  getProcessingStatus 
} = require("../controllers/videoController");
const { verifyToken } = require("../middleware/auth");
const { videoValidator } = require("../middleware/validation");
const upload = require("../middleware/multer");

router.post("/video/upload", verifyToken, upload.single("video"), videoValidator, createVideo);
router.get("/videos", getAllVideos);
router.get("/videos/:id/status", getProcessingStatus);
router.put("/videos/:id", verifyToken, videoValidator, updateVideo);
router.delete("/videos/:id", verifyToken, deleteVideo);

module.exports = router