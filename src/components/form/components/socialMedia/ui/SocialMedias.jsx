import React, {useContext} from "react";
import {ResumeContext} from "../../../../builder";
import {addSocialMedia} from "../units/addSocialMedia";
import SocialMedia from "../components/SocialMedia";
import {MdAddCircle} from "react-icons/md";
import DragList from "../../DragList";
import {moveItem} from "../../../utils/moveItem";

const SocialMedias = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Social Media</h2>
      <DragList
        items={resumeData.socialMedia}
        onReorder={(from, to) =>
          setResumeData({
            ...resumeData,
            socialMedia: moveItem(resumeData.socialMedia, from, to),
          })
        }
        renderItem={(socialMedia, index) => (
          <SocialMedia
            socialMedia={socialMedia}
            index={index}
          />
        )}
      />
      <button type="button"
              onClick={() => {
                addSocialMedia(resumeData, setResumeData)
              }}
              aria-label="Add"
              className="p-2 w-[37px] text-white bg-[#325178] rounded text-xl">
        <MdAddCircle/>
      </button>
    </div>
  );
};

export default SocialMedias;
