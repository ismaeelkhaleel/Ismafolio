import "./globals.css";
import Navbar from "@/components/Navbar";
import { Provider } from "@/context/Context";
import {
  getProfileAPI,
  getEducationAPI,
  getExperienceAPI,
  getProjectsAPI,
  getSkillsAPI,
  getBlogsAPI,
  getSocialLinksAPI,
  getLeetCodeStateAPI,
  getGfgStateAPI,
  getLeetcodeHeatmapAPI,
  getLeetcodeProblemsAPI,
  getGfgProblemsAPI,
  getProjectDetailAPI
} from "@/services/api";

export default async function RootLayout({ children }) {
  const [
    profileRes,
    educationRes,
    experienceRes,
    projectsRes,
    skillsRes,
    blogsRes,
    socialsRes,
    leetcodeRes,
    gfgRes,
    leetcodeHeatmapRes,
    leetcodeProblemsRes,
    gfgProblemsRes,
  ] = await Promise.all([
    getProfileAPI(),
    getEducationAPI(),
    getExperienceAPI(),
    getProjectsAPI(),
    getSkillsAPI(),
    getBlogsAPI(),
    getSocialLinksAPI(),
    getLeetCodeStateAPI(),
    getGfgStateAPI(),
    getLeetcodeHeatmapAPI(),
    getLeetcodeProblemsAPI(),
    getGfgProblemsAPI(),
  ]);

  const initialData = {
    profile: (await profileRes.json()).profile?.[0],
    education: (await educationRes.json()).education,
    experience: (await experienceRes.json()).experience,
    projects: (await projectsRes.json()).projects,
    skills: (await skillsRes.json()).skills,
    blogs: (await blogsRes.json()).blogs,
    socials: (await socialsRes.json()).socialLinks,
    leetcodeState: (await leetcodeRes.json()).leetcodeState,
    gfgState: (await gfgRes.json()).gfgStats,
    leetcodeHeatmap: (await leetcodeHeatmapRes.json()).leetcodeHeatmap,
    leetcodeProblems: (await leetcodeProblemsRes.json()).leetcodeProblems,
    gfgProblems: (await gfgProblemsRes.json()).gfgProblems,
  };

  return (
    <html lang="en">
      <body>
        <Provider initialData={initialData}>
          <Navbar />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}