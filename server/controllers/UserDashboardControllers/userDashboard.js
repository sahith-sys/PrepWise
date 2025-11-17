const User = require("../../models/user");
const Quiz = require("../../models/quiz");
const Session = require("../../models/session");

async function getuserDetails(req, res) {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const user = await User.findById(userId).populate("dsaProgress");
    return res.json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function getQuizNumber(req, res) {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const quizzes = await Quiz.find({ userId });

    let quizCount = quizzes.length;
    let userAvgScore =
      quizCount === 0
        ? 0
        : quizzes.reduce((acc, quiz) => acc + quiz.score, 0) / quizCount;

    userAvgScore = Number(userAvgScore.toFixed(2));
    const lastFive = quizzes
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
    const lastFiveScores = lastFive.map((quiz) => quiz.score);
    const allQuizzes = await Quiz.find({});
    const totalQuizCount = allQuizzes.length;

    const uniqueUsers = new Set(allQuizzes.map((q) => q.userId.toString()))
      .size;

    const avg =
      uniqueUsers === 0 ? 0 : Number((totalQuizCount / uniqueUsers).toFixed(2));

    const percentageChange = avg === 0 ? 0 : ((quizCount - avg) / avg) * 100;

    const change = Number(percentageChange.toFixed(2));
    const sessionRoles = {};
    const sessions = await Session.find({ userId });
    sessions.forEach((session) => {
      const role = session.targetRole || "Unknown";
      sessionRoles[role] = (sessionRoles[role] || 0) + 1;
    });
    const topRoles = Object.entries(sessionRoles)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([role, count]) => ({
        name: role,
        value: count,
      }));
    return res.json({
      success: true,
      quizCount,
      userAvgScore,
      change,
      quizScores: lastFiveScores,
      topRoles,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

async function updateUserDetails(req, res) {
  const userId = req.userId;
  const { formData } = req.body;

  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: formData },
      { new: true }
    );

    return res.json({ success: true, user });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user profile",
    });
  }
}


module.exports = {
  getuserDetails,
  getQuizNumber,
  updateUserDetails
};
