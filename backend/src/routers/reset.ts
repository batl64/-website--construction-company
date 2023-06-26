import * as Router from "express";
const router = new Router();
const ResetController = require("../controler/reset.js");

router.post("/reset", ResetController.reset);
router.get("/resetNew", ResetController.newPassword);
router.post("/resetPassword", ResetController.resetPassword);

module.exports = router;
