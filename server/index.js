const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const connectDB = require('./config/mongodb');
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res)=>{
    res.send("Welcome to the PrepWise API");
})


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})