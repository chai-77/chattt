const messageModel = require("../models/message.model");
const roomModel = require("../models/room.model");

async function createMessage({chatRoomId, sender, content}) {

    const room = await roomModel.findById(chatRoomId);

    if(!room) {
        // console.log("here");
        throw new Error("Room not found");

    }

    const message = await messageModel.create({
        chatRoomId,
        sender,
        content,
        deliveredTo: room.members,
    });

    room.lastMessage = message._id;

    await room.save();

    return await message.populate("sender", "userName email");
}

async function getRoomMessages(chatRoomId) {
    const messages = await messageModel
    .find({chatRoomId})
    .populate("sender", "userName email")
    .sort({createdAt: 1});

    return messages;
}

module.exports = {
    createMessage,
    getRoomMessages,
}