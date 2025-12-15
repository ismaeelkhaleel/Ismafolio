import GfgProblem from "../models/gfgProblem.model.js";
import GfgState from "../models/gfgState.model.js";
import cron from "node-cron";
import getGFGDetails from "gfg-user-fetcher";

const username = "pmohd2";

const fetchedGfgData = async () => {
  try {
    const data = await getGFGDetails(username);
    console.log(data);
    // Helper function to convert streak string like "12 Days" to number
    const parseStreak = (streakStr) => {
      if (!streakStr) return 0;
      const match = streakStr.match(/\d+/); // Extract number
      console.log(match);
      return match ? parseInt(match[0]) : 0;
    };

    // Update or create user state
    let existingUser = await GfgState.findOne({ username: username });

    if (existingUser) {
      existingUser.instituteRank = parseInt(data["Institute Rank"]);
      existingUser.currentStreak = parseStreak(data["Current POTD Streak"]);
      existingUser.codingScore = parseInt(data["Coding Score"]);
      existingUser.potdSolved = parseInt(data["POTDs Solved"]);
      existingUser.maxStreak = parseStreak(data["Longest Streak"]);
      existingUser.totalProblemsSolved = parseInt(data["Problems Solved"]);
      existingUser.profileUrl = `https://www.geeksforgeeks.org/profile/${username}`;
      existingUser.picUrl = data.profile.dp;
      await existingUser.save();
    } else {
      existingUser = new GfgState({
        username: data.profile.name,
        instituteRank: parseInt(data["Institute Rank"]) || 0,
        currentStreak: parseStreak(data["Current POTD Streak"]),
        codingScore: parseInt(data["Coding Score"]) || 0,
        maxStreak : parseStreak(data["Longest Streak"]),
        potdSolved : parseInt(data["POTDs Solved"]),
        totalProblemsSolved: parseInt(data["Problems Solved"]) || 0,
        profileUrl: `https://www.geeksforgeeks.org/profile/${username}`,
        picUrl:data.profile.dp,
      });
      await existingUser.save();
    }

    // Function to save problems
    const saveProblems = async (level, problems) => {
      if (!problems || !Array.isArray(problems)) return;
      for (const problem of problems) {
        if (!problem || !problem.question || !problem.questionUrl) continue;
        const existingProblem = await GfgProblem.findOne({ titleSlug: problem.questionUrl });
        if (!existingProblem) {
          const newProblem = new GfgProblem({
            title: problem.question,
            titleSlug: problem.questionUrl,
            level: level,
          });
          await newProblem.save();
        }
      }
    };

    // Save problems by difficulty
    await saveProblems("school", data.problems.school);
    await saveProblems("basic", data.problems.basic);
    await saveProblems("easy", data.problems.easy);
    await saveProblems("medium", data.problems.medium);
    await saveProblems("hard", data.problems.hard);

    console.log("Fetched and saved GFG data successfully!");

  } catch (err) {
    console.error("Error fetching GFG data:", err.message);
  }
};
(async () => {
  console.log("Initial GFG fetch on server start");
  await fetchedGfgData();
})();

cron.schedule(
  "0 0 * * *",
  async () => {
    console.log("Fetching GeeksforGeeks Data...");
    await fetchedGfgData();
  },
  {
    timezone: "Asia/Kolkata",
  }
);
