const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sessionName: {
        type: String,
        required: true
    },
    sessionDescription: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    selectedTopics: [{
        type: String,
    }],
    targetCompany: {
        type: String,
        required: true
    },
    targetRole: {
        type: String,
        required: true
    },
    additionalReq: {
        type: String,
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

module.exports = mongoose.model('Session', sessionSchema)