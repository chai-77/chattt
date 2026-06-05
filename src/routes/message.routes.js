const express = require("express");


const router = express.Router({ mergeParams: true });

const authMiddleware = require("../middleware/auth.middleware");
const isMemberMiddleware = require("../middleware/isMember.middleware");

const messageController = require("../controllers/message.controller");


router.post(
    "/",
    authMiddleware,
    isMemberMiddleware,
    messageController.createMessageController
)

router.get(
    "/",
    authMiddleware,
    isMemberMiddleware,
    messageController.getRoomMessagesController
)

module.exports = router;