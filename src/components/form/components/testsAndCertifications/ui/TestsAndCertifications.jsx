import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addCertificate} from "../utils/addCertificate";
import TestAndCertificateLine from "../components/TestAndCertificateLine";
import {MdAddCircle} from "react-icons/md";
import DragList from "../../DragList";
import {moveItem} from "../../../utils/moveItem";

const TestsAndCertifications = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const title = "Tests & Certifications";

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{title}</h2>
      <DragList
        items={resumeData["certifications"]}
        onReorder={(from, to) =>
          setResumeData({
            ...resumeData,
            certifications: moveItem(resumeData["certifications"], from, to),
          })
        }
        renderItem={(cert, index) => (
          <TestAndCertificateLine
            resumeData={resumeData}
            setResumeData={setResumeData}
            cert={cert}
            index={index}
          />
        )}
      />
      <button type="button"
              onClick={() => {
                addCertificate(resumeData, setResumeData)
              }}
              aria-label="Add"
              className="p-2 w-[37px] text-white bg-[#325178] rounded text-xl">
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default TestsAndCertifications;
