import React, { useContext } from "react";
import {ResumeContext} from "../../builder";

const Skills = ({ title, skills }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleTitleChange = (e) => {
    const newSkills = [...resumeData.skills];
    newSkills.find((skillType) => skillType.title === title).title = e.target.innerText;
    setResumeData({ ...resumeData, skills: newSkills });
  };

  return (
    skills && skills.length > 0 && (
      <>
        <p
          className="content font-rubik text-accent font-bold text-[12.5px] editable"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
        >
          {title}
        </p>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {skills.map((skill, index) => (
            <span key={index} className="skill-pill">
              {skill}
            </span>
          ))}
        </div>
      </>
    )
  );
};

export default Skills;
