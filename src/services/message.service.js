const messageModel = require("../models/message.model");
const roomModel = require("../models/room.model");

async function createMessage({RoomId, sender, content}) {

    const room = await roomModel.findById(RoomId);

    if(!room) {
        // console.log("here");
        throw new Error("Room not found");

    }

    const message = await messageModel.create({
        RoomId,
        sender,
        content,
        deliveredTo: room.members,
    });

    room.lastMessage = message._id;

    await room.save();

    return await message.populate("sender", "userName email");
}

async function getRoomMessages(RoomId) {
    const messages = await messageModel
    .find({RoomId})
    .populate("sender", "userName email")
    .sort({createdAt: 1});

    return messages;
}

module.exports = {
    createMessage,
    getRoomMessages,
}