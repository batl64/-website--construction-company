import * as Router from "express";
const router = new Router();
const FileController = require("../controler/file.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "file/",
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    const filename = `${new Date()
      .toISOString()
      .replace(/:/g, "-")}.${extension}`;
    cb(null, filename);
  },
});
const load = multer({ storage });
router.post("/upload", load.single("file"), FileController.createFile);
router.get("/file", FileController.getFile);
// router.put("/file", FileController.updateFile);
router.delete("/file", FileController.deleteFile);

module.exports = router;
