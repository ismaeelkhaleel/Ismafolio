"use client";
import React, { useEffect } from "react";
import { admin } from "@/context/Context";

function page() {
  const { getSkill, skills } = admin();
  useEffect(() => {
    getSkill();
  }, []);

  useEffect(() => {
    console.log(skills);
  }, [skills]);
  return (
    <div>
      <div>
        {skills.map((skill, index) => {
          return (
            <div key={index}>
              <h2>{skill.name}</h2>
              <img src={skill.icon} />
              <p>{skill.level}</p>
              <p>{skill.level}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default page;
