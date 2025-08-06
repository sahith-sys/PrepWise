const mongoose = require('mongoose');

async function connectDB() {
    mongoose.connection.on('connected',()=> {
        console.log("MongoDB connected successfully");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/prepwise`)
}

module.exports = connectDB;
