import React, {useContext} from 'react';
import {ResumeContext} from "../../../../builder";
import SkillsGroup from "../components/SkillsGroup";
import DragList from "../../DragList";
import {moveItem} from "../../../utils/moveItem";

const Skills = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <DragList
      items={resumeData.skills}
      className="flex flex-col gap-4"
      onReorder={(from, to) =>
        setResumeData({
          ...resumeData,
          skills: moveItem(resumeData.skills, from, to),
        })
      }
      renderItem={(skill) => (
        <SkillsGroup title={skill.title} />
      )}
    />
  );
};

export default Skills;
