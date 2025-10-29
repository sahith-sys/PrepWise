const Quiz = require("../../models/quiz");
const Session = require("../../models/session");
const { type } = require("os");
const { GoogleGenAI, Type } = require("@google/genai");
dotenv = require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function createQuiz(req, res) {
  const { sessionId } = req.body;
  const userId = req.userId;
  const session = await Session.findById(sessionId).populate("questions");
  if (!session) {
    return res
      .status(404)
      .json({ success: false, message: "Session not found" });
  }
  const prompt = `
You are an expert quiz generator.

Generate a quiz based on the following context:

**Previously studied questions:**
${session.questions.map((q) => `- ${q.questionText}`).join("\n")}

**Target Topics:**
${session.selectedTopics.join(", ")}

Requirements:
1. Create 10 multiple-choice questions (MCQs) strictly related to the above topics.
2. Each question must have exactly 4 options (A, B, C, D).
3. Mark the correct answer.
4. Provide a clear and concise explanation for each answer.
5. Return the output in **valid JSON** format as shown below:

`;
  try {
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
              options: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
              },
              answer: {
                type: Type.NUMBER,
              },
              explanation: {
                type: Type.STRING,
              },
            },
            propertyOrdering: ["question", "options", "answer", "explanation"],
          },
        },
      },
    });
    const quizQuestions = JSON.parse(response.text);
    const quiz = new Quiz({
      userId,
      sessionId,
      questions: quizQuestions,
    });
    await quiz.save();
    return res.status(201).json({ success: true, quizId: quiz._id, quizQuestions });
  } catch (error) {
    console.error("Error creating quiz:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

async function postScore(req, res) {
  const { quizId, score } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    quiz.score = score;
    await quiz.save();
    return res.status(200).json({ success: true, message: "Score updated" });
  } catch (error) {
    console.error("Error updating score:", error);
    return res.status(500).json({ success: false, message: "Error in Score Updatation" });
  }
}

module.exports = {
  createQuiz,
  postScore,
};