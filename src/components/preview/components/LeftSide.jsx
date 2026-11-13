import {useContext} from "react";
import {ResumeContext} from "../../builder";
import WorkExperiences from "./workExperience/ui/WorkExperiences";
import Projects from "./projects/ui/Projects";

const LeftSide = ({resumeData}) => {
  const {setResumeData} = useContext(ResumeContext);

  const handleSummaryChange = (e) => {
    setResumeData({...resumeData, summary: e.currentTarget.innerHTML});
  };

  return (
    <div className="col-span-2 section-stack">
      {resumeData.summary.length > 0 && (
        <div>
          <h2 className="section-title">Perfil</h2>
          <p
            className="content text-body break-words editable"
            contentEditable
            suppressContentEditableWarning
            dangerouslySetInnerHTML={{__html: resumeData.summary}}
            onBlur={handleSummaryChange}
          />
        </div>
      )}

      {resumeData.workExperience.length > 0 && (
        <WorkExperiences/>
      )}

      {resumeData.projects.length > 0 && (
        <Projects/>
      )}
    </div>
  );
};

export default LeftSide;
