import * as Router from "express";
const router = new Router();
const MessageController = require("../controler/messages.js");

router.post("/message", MessageController.createMessage);
router.get("/message", MessageController.getMessage);
router.get("/messageByproject", MessageController.messageByproject);
// router.put("/message", MessageController.updateMessage);
router.delete("/message", MessageController.deleteMessage);

module.exports = router;
