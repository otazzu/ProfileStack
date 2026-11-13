import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import WorkExperience from "../components/WorkExperience";
import {MdAddCircle} from "react-icons/md";
import {addWorkExperience} from "../units/addWorkExperience";
import DragList from "../../DragList";
import {moveItem} from "../../../utils/moveItem";

const WorkExperiences = () => {
  const {
    resumeData,
    setResumeData,
  } = useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Work Experience</h2>
      <DragList
        items={resumeData.workExperience}
        onReorder={(from, to) =>
          setResumeData({
            ...resumeData,
            workExperience: moveItem(resumeData.workExperience, from, to),
          })
        }
        renderItem={(workExperience, index) => (
          <WorkExperience
            workExperience={workExperience}
            index={index}
          />
        )}
      />
      <button type="button"
              onClick={() => {
                // TODO add index
                addWorkExperience(resumeData, setResumeData)
              }}
              aria-label="Add"
              className="p-2 w-[37px] text-white bg-[#325178] rounded text-xl">
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default WorkExperiences;
