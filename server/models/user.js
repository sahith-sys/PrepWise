const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        default: "1234567890",
    },
    gender: {
        type: String,
        default: "Male",
    },
    dob: {
        type: Date,
    },
    location: {
        type: String,
    },
    college: {
        type: String,
    },
    degree: {
        type: String,
    },
    graduationYear: {
        type: Number,
    },
    linkedIn: {
        type: String,
    },
    github: {
        type: String,
    },
    leetcode: {
        type: String,
    },
    codeforces: {
        type: String,
    },
    codechef: {
        type: String,
    },
    portfolio: {
        type: String,
    },
    preferredRole: {
        type: String,
        default: "Software Engineer",
    },
    skillLevel: {
        type: String,
    },
    learningMode: {
        type: String,
        default: "Self-study",
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    interview_experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InterviewExperience',
    },
    qna: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Qna',
    },
    dsaProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DSAQuestion'
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('User', userSchema);