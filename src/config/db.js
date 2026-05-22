const mongoose = require('mongoose');

// alternative - async await, this is more readable

function connectToDB() {

    mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log("Server is connected to DB");

    })
    .catch(err => {
        console.error("Error connecting to DB:", err);
        process.exit(1);
    });
}

module.exports = connectToDB;