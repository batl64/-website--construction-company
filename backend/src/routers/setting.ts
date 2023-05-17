import * as Router from "express";
const router = new Router();
const SettingController = require("../controler/setting.js");

router.get("/setting", SettingController.getSetting);
router.put("/setting", SettingController.updateSetting);

module.exports = router;
