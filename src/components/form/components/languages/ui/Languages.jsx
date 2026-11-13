import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addLanguage} from "../utils/addLanguage";
import LanguageLine from "../components/LanguageLine";
import {MdAddCircle} from "react-icons/md";
import DragList from "../../DragList";
import {moveItem} from "../../../utils/moveItem";

const Languages = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  // TODO replace hardcoded variables

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Languages</h2>
      <DragList
        items={resumeData["languages"]}
        onReorder={(from, to) =>
          setResumeData({
            ...resumeData,
            languages: moveItem(resumeData["languages"], from, to),
          })
        }
        renderItem={(lang, index) => (
          <LanguageLine
            lang={lang}
            resumeData={resumeData}
            setResumeData={setResumeData}
            index={index}
          />
        )}
      />
      <button type="button"
              onClick={() => {
                addLanguage(resumeData, setResumeData, "languages")
              }}
              aria-label="Add"
              className="p-2 w-[37px] text-white bg-[#325178] rounded text-xl">
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default Languages;
