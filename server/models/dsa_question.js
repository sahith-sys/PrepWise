const mongoose = require("mongoose");
const companyQuestions = require("../data/dsaQuestions");
const fetch = require("node-fetch");
const connectDB = require("../config/mongodb");

const dsaQuestionSchema = new mongoose.Schema({
  company: { type: String, required: true },
  question: { type: String, required: true },
  link: { type: String, required: true },
  difficulty: { type: String, required: true },
  frequency: { type: Number },
  acceptanceRate: { type: String },
  tags: { type: [String], required: true },
  dateAdded: { type: Date, default: Date.now },
});

const DSAQuestion = mongoose.model("DSAQuestion", dsaQuestionSchema);

/*async function storeProblems() {
  for (const company of companyQuestions) {
    for (const link of company.links) {
      try {
        const problem = await fetchLeetCodeProblem(link);
        if (!problem) continue;

        const dsaQuestion = await DSAQuestion.findOneAndUpdate(
          { link },
          {
            company: company.name,
            question: problem.title,
            link,
            difficulty: problem.difficulty,
            tags: problem.tags,
          },
          { upsert: true, new: true }
        );

        console.log(`Saved: ${dsaQuestion.question} (${company.name})`);
      } catch (err) {
        console.error(`Error saving problem from ${link}:`, err);
      }
    }
  }
}

async function fetchLeetCodeProblem(url) {
  const slug = url.split("/problems/")[1].split("/")[0];

  const graphqlQuery = {
    query: `
      query getQuestionDetail($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          title
          difficulty
          topicTags { name slug }
        }
      }
    `,
    variables: { titleSlug: slug },
  };

  const response = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphqlQuery),
  });

  const data = await response.json();
  return {
    title: data.data.question.title,
    slug,
    difficulty: data.data.question.difficulty,
    tags: data.data.question.topicTags.map((t) => t.name),
    url,
  };
}
connectDB().then(() => {
  storeProblems().then(() => {
    console.log("All problems stored!");
    process.exit(0);
  });
});*/

module.exports = { DSAQuestion };
