const mongoose = require('mongoose');
const { type } = require('os');

const resumeSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    themeColor: {
        type: String,
        default: '#ff6666'
    },
    summary: {
        type: String,
    },
    experience: [{
        jobTitle: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }],
    education: [{
        institution: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldOfStudy: {
            type: String,
            required: true
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        score: {
            type: String,
            required: true
        },
        description: {
            type: String,
        }
    }],
    skills: {
        type: [String],
        required: true
    },
    certifications: [{
        name: {
            type: String,
            required: true
        },
        issuingOrganization: {
            type: String,
            required: true
        },
        issueDate: {
            type: String,
            required: true
        },
    }],
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);