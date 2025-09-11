const {DSAQuestion} = require('../../models/dsa_question');

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

module.exports = { getUniqueCompanies, getQuestionsByCompany };