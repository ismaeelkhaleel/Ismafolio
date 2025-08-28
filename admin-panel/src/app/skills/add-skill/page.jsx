"use client";
import React, { useState } from "react";
import technologies from "@/data/technologies";
function page() {
  const [skillName, setSkillName] = useState("");
  const [skillIcon, setSkillIcon] = useState("");
  const [skillIndex, setSkillIndex] = useState("");
  return (
    <div>
      <div>
        <form>
          <div>
            <select
              value={skillIndex}
              onChange={(e) => {
                const index = e.target.value;
                setSkillIndex(index);

                if (index !== "") {
                  const selected = technologies[index];
                  setSkillName(selected.name);
                  setSkillIcon(selected.icon);
                } else {
                  setSkillName("");
                  setSkillIcon("");
                }
              }}
            >
              <option value="">-- Select Skill --</option>
              {technologies.map((item, index) => (
                <option key={index} value={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input />
          </div>
          <div>
            <input />
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
