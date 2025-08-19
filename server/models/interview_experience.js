const mongoose = require('mongoose');

const interviewExperienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    rounds: {
        type: Number,
        required: true,
    },
    result: {
        type: String,
        enum: ['Passed', 'Failed', 'Pending'],
        required: true,
    },
    experience: {
        type: String,
        enum: ['0-1 years', '1-2 years', '2-3 years', '3-5 years', '5+ years'],
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    timeline: {
        type: String,
        enum: ['1-2 weeks', '2-4 weeks', '1+ months', '1-2 months', '2-3 months', '3+ months'],
        required: true,
    },
    applicationMode: {
        type: String,
        enum: ['Referral', 'Online', 'Walk-in', 'Campus', 'Off-campus'],
        required: true,
    },
    dsaquestions: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('InterviewExperience', interviewExperienceSchema);