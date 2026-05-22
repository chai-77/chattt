const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      trim: true,
      default: null
    },

    isGroup: {
      type: Boolean,
      default: false
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatRoom", chatRoomSchema);