const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
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
    },
    roomKey: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);