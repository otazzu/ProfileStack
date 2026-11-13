import React, {useContext} from 'react';
import dynamic from "next/dynamic";
import {ResumeContext} from "../../../../builder";
import WorkExperience from "../components/WorkExperience";

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  {ssr: false}
);

const WorkExperiences = () => {
  const {resumeData} = useContext(ResumeContext);

  return (
    <Droppable droppableId="work-experience" type="WORK_EXPERIENCE">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h2
            className="section-title editable"
            contentEditable
            suppressContentEditableWarning
          >
            Experiencia
          </h2>
          {resumeData.workExperience.map((item, index) => (
            <WorkExperience
              key={index}
              item={item}
              index={index}
              isLast={index === resumeData.workExperience.length - 1}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default WorkExperiences;
