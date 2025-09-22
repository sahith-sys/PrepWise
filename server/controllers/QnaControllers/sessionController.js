const { type } = require("os");
const Session = require("../../models/session");
const { GoogleGenAI, Type } = require("@google/genai");
const Question = require("../../models/question");
dotenv = require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function createSession(req, res) {
  const {
    sessionName,
    sessionDescription,
    experience,
    salary,
    selectedTopics,
    targetCompany,
    targetRole,
    additionalReq,
  } = req.body;
  const userId = req.userId;
  if (!sessionName || !sessionDescription || !experience || !salary || !selectedTopics || !targetCompany || !targetRole) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newSession = new Session({
      userId,
      sessionName,
      sessionDescription,
      experience,
      salary,
      selectedTopics,
      targetCompany,
      targetRole,
      additionalReq,
    });
    await newSession.save();

    const prompt = `
You are an expert interviewer with decades of experience in designing technical interview questions. 
You are tasked with generating **10 precise interview questions** based on the following parameters:

- Session Name: ${sessionName}
- Session Description: ${sessionDescription}
- Candidate Experience Level: ${experience}
- Expected Salary Range: ${salary}
- Target Company: ${targetCompany}
- Target Role: ${targetRole}
- Topics to be Covered: ${selectedTopics.join(", ")}
- Additional Requirements: ${additionalReq}

### Guidelines:
1. Generate **exactly 10 interview questions** with **answers**.
2. Each answer must include a **detailed explanation between 200 to 250 words**.
3. Ensure the **difficulty level** matches the candidate’s experience and salary expectations.
4. Frame questions that reflect the **style and depth of the target company’s interview process** (${targetCompany}).
5. Align the questions with the **responsibilities and skills required for the role** (${targetRole}).
6. Distribute questions evenly across the topics in the **selectedTopics** array.
7. Make sure the tone and structure feel like a **real interview scenario**.
8. Ensure **preciseness, clarity, and no ambiguity** in questions or explanations.
9. Explanations must include:
   - Why this answer is correct
   - Common mistakes candidates make
   - Key takeaways for preparation

Now, generate the **10 questions with answers**.
`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
              },
              answer: {
                type: Type.STRING,
              },
            },
            propertyOrdering: ["question", "answer"],
          },
        },
      },
    });

    const questions = JSON.parse(response.text);

    const questionDocs = await Question.insertMany(
      questions.map((q) => ({
        sessionId: newSession._id,
        questionText: q.question,
        correctAnswer: q.answer,
      }))
    );

    newSession.questions = questionDocs.map((doc) => doc._id);
    await newSession.save();

    const populatedSession = await Session.findById(newSession._id).populate("questions");

    return res.status(201).json({
      success: true,
      message: "Session created successfully with questions",
      data: populatedSession,
    });
  } catch (error) {
    console.log("Error creating session", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function getSessions(req, res) {
  const userId = req.userId;
  try {
    const sessions = await Session.find({ userId }).populate("questions").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    console.log("Error getting Sessions", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function getSession(req, res) {
  const { sessionId } = req.params;
  const userId = req.userId;
  try {
    const session = await Session.findOne({ _id: sessionId, userId }).populate("questions");
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
    return res.status(200).json({ success: true, data: session });
  } catch (error) {
    console.log("Error getting Session", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function deleteSession(req, res){
  const {id} = req.params;
  const userId = req.userId;
  try {
    const session = await Session.findOneAndDelete({_id: id, userId});
    if(!session){
      return res.status(404).json({success: false, message: "Session not found"});
    }
    return res.status(200).json({success: true, message: "Session deleted successfully"});
  } catch (error) {
    console.log("Error deleting Session", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  createSession,
  getSessions,
  getSession,
  deleteSession,
};
