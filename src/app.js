const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())

// routes require
const authRouter = require("./routes/auth.routes")
const roomRouter = require("./routes/room.routes")
const messageRouter = require("./routes/message.routes")



app.get("/", (req, res) => {
    res.send("Chattt is up and running")
})

// use routes
app.use("/api/auth", authRouter)
app.use("/api/room", roomRouter)
app.use("/api/message", messageRouter)

module.exports = app;