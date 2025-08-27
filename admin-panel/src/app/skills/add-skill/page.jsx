"use client";
import React, { useState } from "react";
import technologies from "@/data/technologies";
function page() {
    const [skillName, setSkillName] = useState("");
  return (
    <div>
      <div>
        <form>
          <div>
             <select value={skillName} onChange={(e)=>setSkillName(e.target.value)}>
                <option value=""></option>
              {  technologies.map((item, index)=> (
                <option key={index} value={item.icon}>
                    {item.name}
                </option>
              ))}
             </select>
          </div>
          <p>{skillName}</p>
          <div>
            <input />
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
