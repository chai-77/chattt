const { generateRoomKey } = require('../utils/roomkey');
const roomModel = require('../models/room.model');

// create a new room
async function createRoom({ roomName, user1, user2 }) {
    const roomKey = generateRoomKey(user1._id, user2._id);

    let room = await roomModel.findOne({ roomKey });

    if (room) return room;

    room = await roomModel.create({
        roomName: roomName || null,
        roomKey,
        members: [user1._id, user2._id],
        isGroup: false,
    });

    return room;
}

// list rooms
async function listRooms(userId) {
    const rooms = await roomModel.find({
        members: userId,
    })
    .populate("members", "userName email")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });

    return rooms;
}

// room by id
async function getRoomById(roomId) {
    const room = await roomModel.findById(roomId)
        .populate("members", "userName email")
        .populate("lastMessage");

    if (!room) {
        throw new Error("Room not found");
    }

    return room;
}

module.exports = {
    createRoom,
    getRoomById,
    listRooms
};