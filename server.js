const { createServer } = require("http");
require("dotenv").config();
const { Server } = require("socket.io");

const app = require('./src/app');
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ 
    cors: { origin: "*" }
});


const connectToDB = require("./src/config/db")

connectToDB();

const socketHandler = require("./src/sockets/index");

socketHandler(io);


// as it creates an http server, app.listen doesnt work
// app.listen(3000, () => {
//     console.log("Server is running on port 3000")
// })

httpServer.listen(3000);