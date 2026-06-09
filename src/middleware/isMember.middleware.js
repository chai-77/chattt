const roomModel = require("../models/room.model");

async function isRoomMember(req, res, next) {
    try {
        // in the /:roomId or inside the json body
        const roomId = req.params.roomId;

        if (!roomId) {
            return res.status(400).json({
                message: "roomId is required"
            });
        }

        const room = await roomModel.findById(roomId);

        if (!room) {
            return res.status(404).json({
                message: "Room not found"
            });
        }

        const isMember = room.members.some(
            (id) => id.toString() === req.user._id.toString()
        );

        if (!isMember) {
            return res.status(403).json({
                message: "You are not a member of this room"
            });
        }

        // console.log("roomId:", req.params.roomId);
        // console.log("user:", req.user);
        // console.log("room:", room);
        // console.log("members:", room.members);

        // optional: attach room to request so controller doesn't refetch it
        req.room = room;

        next();
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = isRoomMember;