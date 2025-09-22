const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const connectDB = require('./config/mongodb');
const authRoutes = require('./routes/authRoutes');
const experienceRoutes = require('./routes/ExperienceRoutes');
const qnaRoutes = require('./routes/QnaRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const dsaRoutes = require('./routes/DsaRoutes');
const atsResumeRoutes = require('./routes/atsResumeRoutes');
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
      next();
});

app.use('/api/auth', authRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/qna', qnaRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/atsresume', atsResumeRoutes);

app.get("/", (req,res)=>{
    res.send("Welcome to the PrepWise API");
})



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})