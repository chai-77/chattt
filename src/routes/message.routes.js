const express = require("express");


const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const messageController = require("../controllers/message.controller");


router.post(
    "/send",
    authMiddleware,
    messageController.createMessageController
)

router.get(
    "/:roomId",
    authMiddleware,
    messageController.getRoomMessagesController
)

module.exports = router;