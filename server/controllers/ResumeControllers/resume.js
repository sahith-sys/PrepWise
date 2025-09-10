const Resume = require('../../models/resume');
const { GoogleGenAI, Type } = require("@google/genai");
dotenv = require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function saveResume(req, res){
    const {resumeInfo} = req.body;
    const { firstName, lastName, jobTitle, address, email, phone, summary, experience, education, skills, certifications } = resumeInfo;
    try {
        const newResume = new Resume({
        userId: req.userId,
        firstName,
        lastName,
        jobTitle,
        address,
        email,
        phone,
        summary,
        experience,
        education,
        skills,
    });
    if(certifications){
        newResume.certifications = certifications;
    }
    const savedResume = await newResume.save();
    return res.status(201).json({success:true, data:savedResume});
    } catch (error) {
        console.error('Error saving resume:', error);
        return res.status(500).json({ success: false, error: 'Failed to save resume' });
    }
}

async function generateSummary(req, res){
    const {initialSummary} = req.body;
    const prompt = `Generate a professional resume summary for a candidate with the this 
    initial summary: ${initialSummary}. The summary should be concise, impactful, and 
    tailored for a resume. It should highlight key skills, experiences, and career 
    objectives in 3-4 lines.The summary should be engaging and make a strong impression 
    on potential employers within 3-4 lines.Just only give 3-4 lines of summary with out any extra explanations
    and do not start with 'Summary:'.`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        const generatedSummary = response.text.trim();
        return res.status(200).json({ success: true, summary: generatedSummary });
    } catch (error) {
        console.error('Error generating summary:', error);
        return res.status(500).json({ success: false, message: 'Failed to generate summary' });
    }
}

async function getResume(req, res){
    const { id } = req.body;
    try {
        const resume = await Resume.findById(id);
        if (!resume) {
            return { success: false, message: 'Resume not found' };
        }
        return { success: true, data: resume };
    } catch (error) {
        console.error("Error fetching resume:", error);
        return { success: false, message: 'Failed to fetch resume' };
    }
}

module.exports = {
    saveResume,
    generateSummary,
    getResume
};