const messageService = require("../services/message.service");


async function createMessageController(req, res) {
    try {
        const {chatRoomId, content} = req.body;

        if(!chatRoomId || !content) {
            return res.status(400).json({
                message: "chatroomId and content required"
            });
        }

        const message = await messageService.createMessage({
            chatRoomId,
            sender: req.user._id,
            content,
        });

        return res.status(201).json(message);
    }
catch(err) {
    return res.status(500).json({
        message: err.message
    });
}

} 


async function getRoomMessagesController(req,res) {
    try {
        const messages = await messageService.getRoomMessages(
            req.params.roomId
        );

        return res.status(200).json(messages);
    }catch(err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    createMessageController,
    getRoomMessagesController,
}