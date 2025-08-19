import LeetcodeState from "../models/leetcodeState.model.js";
import LeetcodeProblem from "../models/leetcodeProblem.model.js";
import LeetcodeHeatmap from "../models/leetcodeHeatmap.model.js";
import { LeetCode } from "leetcode-query";
import cron from "node-cron";

const leetcode = new LeetCode();
const username = "Mohd_Ismaeel";

const fetchLeetCodeData = async () => {
  const user = await leetcode.user(username);
  const existingUser = await LeetcodeState.findOne({
    username: user.matchedUser.username,
  });

  let savedUser;
  if (existingUser) {
    existingUser.point = user.matchedUser.contributions.points;
    existingUser.starRating = user.matchedUser.profile.starRating;
    existingUser.ranking = user.matchedUser.profile.ranking;
    existingUser.profileUrl = "https://leetcode.com/u/Mohd_Ismaeel/";
    existingUser.acSubmissionNum =
      user.matchedUser.submitStats.acSubmissionNum.map((item) => ({
        difficulty: item.difficulty,
        count: item.count,
        submissions: item.submissions,
      }));
    savedUser = await existingUser.save();
  } else {
    savedUser = new LeetcodeState({
      username: user.matchedUser.username,
      point: user.matchedUser.contributions.points,
      starRating: user.matchedUser.profile.starRating,
      ranking: user.matchedUser.profile.ranking,
      profileUrl: "https://leetcode.com/u/Mohd_Ismaeel/",
      acSubmissionNum: user.matchedUser.submitStats.acSubmissionNum.map(
        (item) => ({
          difficulty: item.difficulty,
          count: item.count,
          submissions: item.submissions,
        })
      ),
    });
    savedUser = await savedUser.save();
  }
  const recentSolvedProblems = user.recentSubmissionList;
  for (const problem of recentSolvedProblems) {
    const existingProblem = await LeetcodeProblem.findOne({
      title: problem.title,
    });

    if (problem.statusDisplay !== "Accepted") {
      continue;
    }

    const solvedDate = new Date(problem.timestamp * 1000);

    if (!existingProblem) {
      const newProblem = new LeetcodeProblem({
        title: problem.title,
        titleSlug: `https://leetcode.com/problems/${problem.titleSlug}`,
        solvedOn: solvedDate,
        status: problem.statusDisplay,
      });
      await newProblem.save();
    }
  }
  const parseCalender = JSON.parse(user.matchedUser.submissionCalendar);
  const submissionCalendar = Object.entries(parseCalender);
  for (const [timestamp, submissions] of submissionCalendar) {
    const dateOnly = new Date(parseInt(timestamp) * 1000);
    dateOnly.setUTCHours(0, 0, 0, 0);
    const existingSubmission = await LeetcodeHeatmap.findOne({
      date: dateOnly,
    });
    if (existingSubmission) {
      existingSubmission.submissions = Number(submissions);
      await existingSubmission.save();
    } else {
      const newSubmission = new LeetcodeHeatmap({
        date: dateOnly,
        submissions: Number(submissions),
      });
      await newSubmission.save();
    }
  }
};

cron.schedule(
  "59 7 * * *",
  async () => {
    console.log("Fetching LeetCode Data...");
    await fetchLeetCodeData();
  },
  {
    timezone: "Asia/Kolkata",
  }
);
