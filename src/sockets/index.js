const { verifyToken } = require("../utils/jwt");
const checkRoomMembership = require("../utils/checkRoomMembership");
const Message = require("../models/message.model");

function socketHandler(io) {


    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("No token"));
        }

        try {
            const user = verifyToken(token);
            socket.user = user;
            next();
        } catch (err) {
            next(new Error("Unauthorized"));
        }
    })


    io.on("connection", (socket) => {
        console.log("connected", socket.id, socket.user.id);

        // test
        // socket.on("ping", () => {
        //     console.log("ping received");
        //     socket.emit("pong");
        // })
        // socket.joinedRooms = new Set();
        socket.on("join_room", async (roomId, callback) => {
            try {
                await checkRoomMembership(roomId, socket.user.id);

                socket.join(roomId);
                // socket.joinedRooms.add(roomId);

                if (callback) callback({ success: true });
            } catch (err) {
                if (callback) callback({ success: false, message: err.message });

                socket.emit("room_error", err.message);
            }
        });

        socket.on("send_message", async (data) => {


            try {
                if (typeof data?.roomId !== "string" || !data.roomId.trim()) {
                    return socket.emit("message_error", {
                        message: "Invalid message payload"
                    });
                }
                if (typeof data?.content !== "string" || !data.content.trim()) {
                    return socket.emit("message_error", {
                        message: "Invalid message payload"
                    });
                }


                await checkRoomMembership(data.roomId, socket.user.id);

                if (!socket.rooms.has(data.roomId)) {
                    return socket.emit("message_error", {
                        message: "You are not in this room"
                    });
                }




                const savedMessage = {
                    RoomId: data.roomId,
                    content: data.content,
                    sender: socket.user.id
                };

                io.to(data.roomId).emit("receive_message", savedMessage);
                // so that chat doesnt feel laggy
                Message.create(savedMessage).catch(console.error);
            }
            catch (err) {
                console.error(err);

                socket.emit("message_error", {
                    message: "Failed to send message"
                });
            }
        });





        socket.on("disconnect", () => {
            console.log("disconnected", socket.id);
        })

    });



}
module.exports = socketHandler;