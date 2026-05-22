const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      unique: true,
      required: [ true, "Name is required for creating an account" ]
    },

    email: {
      type: String,
      trim: true,
      required: [ true, "Email is required for creating a user" ],
      unique: true,
      match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address" ],
    },

    password: {
      type: String,
      required: true
    },

    isOnline: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


userSchema.pre("save", async function () {
    if(!this.isModified("password")) {
        return

    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    return

})

userSchema.methods.comparePassword = async function (password) {

    console.log(password, this.password)

    return await bcrypt.compare(password, this.password)

}

module.exports = mongoose.model("User", userSchema);