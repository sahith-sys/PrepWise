require('dotenv').config();
const connectDB = require("./config/mongodb");
const {storeProblems} = require("./models/dsa_question");

console.log("URI:", process.env.MONGODB_URI);

console.log("Character code of first char:", process.env.MONGODB_URI.charCodeAt(0));

connectDB().then(() => {
  storeProblems().then(() => {
    console.log("All problems stored!");
    process.exit(0);
  });
});