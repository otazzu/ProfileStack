/* eslint-disable react/jsx-no-undef */
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaTelegramPlane,} from "react-icons/fa";
import {MdInsertLink} from "react-icons/md";
import {CgWebsite} from "react-icons/cg";
import React, {useContext} from "react";
import {ResumeContext} from "../../builder";
import dynamic from "next/dynamic";
import ModalHighlightMenu from "../components/ModalHighlightMenu";
import Header from "../components/Header";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import A4PageWrapper from "../components/A4PageWrapper";
import {onDragEndHandler} from "../utils/onDrugEndHandler";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  {ssr: false}
);

const Preview = () => {
  const {resumeData, setResumeData} = useContext(ResumeContext);
  const icons = [
    {name: "github", icon: <MdInsertLink/>},
    {name: "linkedin", icon: <MdInsertLink/>},
    {name: "twitter", icon: <FaTwitter/>},
    {name: "facebook", icon: <FaFacebook/>},
    {name: "instagram", icon: <FaInstagram/>},
    {name: "youtube", icon: <FaYoutube/>},
    {name: "telegram", icon: <FaTelegramPlane/>},
    {name: "website", icon: <CgWebsite/>},
  ];

  return (
    <div className="md:max-w-[60%] sticky top-0 preview rm-padding-print p-6 md:overflow-y-scroll md:h-screen">
      <A4PageWrapper>
        <ModalHighlightMenu/>
        <DragDropContext onDragEnd={(result) => onDragEndHandler(result, resumeData, setResumeData)}>
          <Header resumeData={resumeData} icons={icons}/>
          <div className="grid grid-cols-3 gap-6">
            <LeftSide resumeData={resumeData}/>
            <RightSide resumeData={resumeData}/>
          </div>
        </DragDropContext>
      </A4PageWrapper>
    </div>
  );
};

export default Preview;
