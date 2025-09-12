const {DSAQuestion} = require('../../models/dsa_question');
const User = require('../../models/user');
async function getUniqueCompanies(req, res){
    try {
        const companies = await DSAQuestion.aggregate([
      {
        $group: {
          _id: "$company",
          questionCount: { $count: {} }
        }
      },
      {
        $project: {
          _id: 0,
          company: "$_id",
          questionCount: 1
        }
      },
      { $sort: { questionCount: -1 } }
    ]);
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getQuestionsByCompany(req, res) {
    const company = req.params.company;
    try {
        const questions = await DSAQuestion.find({ company: { $regex: new RegExp(`^${company}$`, "i") } });
        res.json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateProgress(req, res) {
    const { progress } = req.body;
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
      const user = await User.findById(userId);
      user.dsaProgress = [];
      for (const questionId in progress) {
        if (progress[questionId]) {
          user.dsaProgress.push(questionId);
        }
      }
      await user.save();
      res.json({ success: true, message: "Progress updated successfully" });
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

async function getProgress(req, res){
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await User.findById(userId);
    res.json({ success: true, progress: user.dsaProgress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = { getUniqueCompanies, getQuestionsByCompany, updateProgress, getProgress };