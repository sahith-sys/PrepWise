const Experience = require("../../models/interview_experience");

async function createExperience(req, res) {
  const {
    company,
    role,
    difficulty,
    overallExperience,
    dsaLinks,
    applicationMode,
    timeline,
    jobExperience,
    result,
    rounds,
  } = req.body;

  try {
    const userId = req.userId;
    const newExperience = new Experience({
      user: userId,
      company,
      role,
      difficulty,
      body: overallExperience,
      dsaquestions: dsaLinks,
      applicationMode,
      timeline,
      experience: jobExperience,
      result,
      rounds,
    });

    await newExperience.save();
    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: newExperience,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error. failed to create experience",
      });
  }
}

async function getAllExperiences(req, res) {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: experiences,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error. failed to retrieve experiences",
      });
  }
}
module.exports = {
  createExperience,
  getAllExperiences,
};
