require("dotenv").config();
const pdfParse = require("pdf-parse");
const { GoogleGenAI, Type } = require("@google/genai");
const { read } = require("fs");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function resumeAnalysis(req, res) {
  const { jobDescription } = req.body;
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    let text = "";
    if (req.file.mimetype === "application/pdf") {
      const pdfData = await pdfParse(req.file.buffer);
      text = pdfData.text;
    } else {
      text = req.file.buffer.toString("utf-8");
    }
    const prompt = `
      You are an ATS (Applicant Tracking System) resume analyzer.  
Analyze the following resume content and return the result strictly in JSON format only.  
Do not include explanations outside of the JSON.  

The JSON should follow this structure:

{
  "overallScore": "number from 0–100",
  "strengths": ["point1", "point2", "point3", "point4"],
  "weaknesses": ["point1", "point2", "point3", "point4"],
  "missingKeywords": ["keyword1", "keyword2", "keyword3"],
  "formatting": {
    "consistentFont": true/false,
    "properMargins": true/false,
    "bulletPointsUsed": true/false,
    "atsFriendly": true/false,
    "description": "Brief explanation of formatting issues/ strengths"
  },
  "education": {
    "degreeRelevance": "High/Medium/Low",
    "certifications": ["cert1", "cert2"]
  },
  "readability": {
    "clearSectionHeaders": true/false,
    "grammarErrors": "None/Few/Many",
    "description": "Brief explanation of Readability issues/ strengths"
  },
  "length": {
    "pages": 1,
    "recommendation": "You have an ideal length./Consider shortening your resume./Consider adding more relevant experience./consider condensing to one page if possible."
  },
  "contactInfo": {
    "emailPresent": true/false,
    "phonePresent": true/false,
    "linkedinPresent": true/false,
    "description": "Brief explanation of contact issues/ strengths/ try adding linkedin if missing, etc."
  }
}

Resume content:
${text}

      job Description:
      ${jobDescription}
    `;
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.NUMBER },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            formatting: {
              type: Type.OBJECT,
              properties: {
                consistentFont: { type: Type.BOOLEAN },
                properMargins: { type: Type.BOOLEAN },
                bulletPointsUsed: { type: Type.BOOLEAN },
                atsFriendly: { type: Type.BOOLEAN },
                description: { type: Type.STRING },
              },
            },
            education: {
              type: Type.OBJECT,
              properties: {
                degreeRelevance: { type: Type.STRING },
                certifications: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
            },
            readability: {
              type: Type.OBJECT,
              properties: {
                clearSectionHeaders: { type: Type.BOOLEAN },
                grammarErrors: { type: Type.STRING },
                description: { type: Type.STRING },
              },
            },
            length: {
              type: Type.OBJECT,
              properties: {
                pages: { type: Type.NUMBER },
                recommendation: { type: Type.STRING },
              },
            },
            contactInfo: {
              type: Type.OBJECT,
              properties: {
                emailPresent: { type: Type.BOOLEAN },
                phonePresent: { type: Type.BOOLEAN },
                linkedinPresent: { type: Type.BOOLEAN },
                description: { type: Type.STRING },
              },
            },
          },
          required: [
            "overallScore",
            "strengths",
            "weaknesses",
            "missingKeywords",
            "formatting",
            "education",
            "readability",
            "length",
            "contactInfo",
          ],
        },
      },
    });

    const responseText = response.text || extractText(response);
    if (!responseText) {
      console.error("No text in AI response:", response);
    }
    let parsed;
    try {
      parsed = JSON.parse(responseText);
    } catch (err) {
      console.error("AI response not JSON:", responseText);
      return res
        .status(500)
        .json({ success: false, message: "Error parsing AI response" });
    }

    return res.json({ success: true, response: parsed });
  } catch (error) {
    console.error("Error in resumeAnalysis:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

function extractText(response) {
  // Newer SDK structure
  if (response.output?.[0]?.content?.[0]?.text) {
    return response.output[0].content[0].text;
  }
  // Older candidate structure
  if (response.candidates?.[0]?.content?.parts?.[0]?.text) {
    return response.candidates[0].content.parts[0].text;
  }
  return "";
}

module.exports = {
  resumeAnalysis,
};
