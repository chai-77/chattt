const roomModel = require("../models/room.model");

async function checkRoomMembership(roomId, userId) {
    const room = await roomModel.findById(roomId);

    if (!room) {
        throw new Error("Room not found");
    }

    const isMember = room.members.some(
        id => id.toString() === userId.toString()
    );

    if (!isMember) {
        throw new Error("Not authorized");
    }

    return room;
}

module.exports = checkRoomMembership;