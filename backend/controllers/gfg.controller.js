import GfgProblem from "../models/gfgProblem.model.js";
import GfgState from "../models/gfgState.model.js";
import axios from "axios";
import cron from "node-cron";

const username = "pmohd2";
const fetchedGfgData = async () => {
  try {
    const response = await axios.get(
      `https://geeks-for-geeks-api.vercel.app/${username}`
    );
    const existingUser = await GfgState.findOne({
      username: response.data.info.userName,
    });
    let newData;
    if (existingUser) {
      (existingUser.instituteRank = response.data.info.instituteRank),
        (existingUser.currentStreak = response.data.info.currentStreak),
        (existingUser.codingScore = response.data.info.codingScore),
        (existingUser.monthlyScore = response.data.info.monthlyScore),
        (existingUser.totalProblemsSolved =
          response.data.info.totalProblemsSolved);
      existingUser.profileUrl = `https://www.geeksforgeeks.org/user/${response.data.info.userName}/`;
      await existingUser.save();
    } else {
      newData = new GfgState({
        username: response.data.info.userName,
        instituteRank: response.data.info.instituteRank,
        currentStreak: response.data.info.currentStreak,
        codingScore: response.data.info.codingScore,
        monthlyScore: response.data.info.monthlyScore,
        totalProblemsSolved: response.data.info.totalProblemsSolved,
        profileUrl: `https://www.geeksforgeeks.org/user/${response.data.info.userName}/`,
      });
      newData = await newData.save();
    }
      
    const basicProblems = response.data.solvedStats.basic.questions;
    for (const problem of basicProblems) {
      const existingProblem = await GfgProblem.findOne({
        titleSlug: problem.questionUrl,
      });
      if (!existingProblem) {
        const newProblem = new GfgProblem({
          title: problem.question,
          titleSlug: problem.questionUrl,
          level: "basic",
        });
        await newProblem.save();
      }
    }

    const easyProblems = response.data.solvedStats.easy.questions;
    for (const problem of easyProblems) {
      const existingProblem = await GfgProblem.findOne({
        titleSlug: problem.questionUrl,
      });
      if (!existingProblem) {
        const newProblem = new GfgProblem({
          title: problem.question,
          titleSlug: problem.questionUrl,
          level: "easy",
        });
        await newProblem.save();
      }
    }
    const mediumProblems = response.data.solvedStats.medium.questions;
    for (const problem of mediumProblems) {
      const existingProblem = await GfgProblem.findOne({
        titleSlug: problem.questionUrl,
      });
      if (!existingProblem) {
        const newProblem = new GfgProblem({
          title: problem.question,
          titleSlug: problem.questionUrl,
          level: "medium",
        });
        await newProblem.save();
      }
    }
    const hardProblems = response.data.solvedStats.hard.questions;
    for (const problem of hardProblems) {
      const existingProblem = await GfgProblem.findOne({
        titleSlug: problem.questionUrl,
      });
      if (!existingProblem) {
        const newProblem = new GfgProblem({
          title: problem.question,
          titleSlug: problem.questionUrl,
          level: "hard",
        });
        await newProblem.save();
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

cron.schedule(
  "59 11 * * *",
  async () => {
    console.log("Fetching Geeksforgeek Data...");
    await fetchedGfgData();
  },
  {
    timezone: "Asia/Kolkata",
  }
);
