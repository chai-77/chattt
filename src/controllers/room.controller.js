const roomService = require("../services/room.service");

async function createRoomController(req, res) {
  try {
    if (!req.body || !req.body.userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const user1 = req.user;
    const user2 = { _id: req.body.userId };
    console.log(user1,user2)

    const room = await roomService.createRoom({
      roomName: req.body.roomName,
      user1,
      user2,
    });

    return res.status(201).json(room);
  } catch (err) {
    console.log(room)
    return res.status(500).json({ message: err.message });
  }
}

async function listRoomsController(req, res) {
  try {
    const userId = req.user._id;

    const rooms = await roomService.listRooms(userId);

    return res.status(200).json(rooms);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getRoomByIdController(req, res) {
  try {
    const roomId = req.params.id;

    const room = await roomService.getRoomById(roomId);

    return res.status(200).json(room);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

module.exports = {
  createRoomController,
  listRoomsController,
  getRoomByIdController,
};