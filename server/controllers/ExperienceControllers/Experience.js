const Experience = require("../../models/interview_experience");
const axios = require("axios");
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
    roundDetails,
  } = req.body;
  const companyUrl = await fetchProfileUrl(company);
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
      roundDetails,
      companyUrl,
    });

    await newExperience.save();
    return res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: newExperience,
    });
  } catch (error) {
    console.error("Error creating experience", error);
    return res.status(500).json({
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
    return res.status(500).json({
      success: false,
      message: "Internal server error. failed to retrieve experiences",
    });
  }
}
async function fetchProfileUrl(name) {
  try {
    const response = await axios.get(`https://api.logo.dev/search?q=${name}`, {
      headers: {
        Authorization: `Bearer: sk_IyLxl_yxTDa2kp04ODOxXw`,
      },
    });
    const data = response.data;
    const logoUrl = `https://img.logo.dev/${data[0].domain}?token=pk_Z7P6eHfTTPCGhlR6QrUIzw`;
    if (response.data && response.data.length > 0) {
      return logoUrl;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch logo:", error.message);
    return null;
  }
}
module.exports = {
  createExperience,
  getAllExperiences,
};
