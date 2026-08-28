"use client"

import React, { createContext, useState } from "react";
import Meta from "../components/meta/Meta";
import FormCloseOpenBtn from "../components/FormCloseOpenBtn";
import Preview from "../components/preview/ui/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import dynamic from "next/dynamic";
import Form from "../components/form/ui/Form";
import { useProfiles } from "../features/profiles/useProfiles";
import ProfileSelector from "../features/profiles/ProfileSelector";
import { setProfilePicture, removeProfilePicture } from "../features/profiles/profilePictureStorage";

const ResumeContext = createContext(DefaultResumeData);

// server side rendering false
const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder() {
  // resume data with profile variants
  const { profiles, selectedProfileId, resumeData, setResumeData, switchProfile } = useProfiles();

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  // profile picture
  const handleProfilePicture = (file) => {
    if (!(file instanceof Blob)) {
      console.error("Invalid file type");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result;
      setResumeData({ ...resumeData, profilePicture: base64 });
      if (selectedProfileId) {
        setProfilePicture(selectedProfileId, base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const resetProfilePicture = () => {
    if (!selectedProfileId) return;
    removeProfilePicture(selectedProfileId);
    const profile = profiles.find((p) => p.id === selectedProfileId);
    const defaultPicture = profile?.resume?.profilePicture || "";
    setResumeData({ ...resumeData, profilePicture: defaultPicture });
  };

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
    console.log(resumeData);
  };

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData,
          handleProfilePicture,
          handleChange,
          resetProfilePicture,
        }}
      >
        <Meta
          title="ProfileStack | Multiple CV profiles from one maintainable structure"
          description="ProfileStack is an open source tool for maintaining multiple CV variants from structured profile data. Create role-specific resumes without duplicating your professional history by hand."
          keywords="CV profiles, resume variants, open source resume tool, role-specific CV, profile manager, ATS-friendly resume, developer CV, career profiles"
        />
        <div className="f-col gap-4 w-full">
          <div className="exclude-print">
            <ProfileSelector
              profiles={profiles}
              selectedProfileId={selectedProfileId}
              onProfileChange={switchProfile}
            />
          </div>
          <div className="f-col gap-4 md:flex-row justify-evenly max-w-7xl md:mx-auto md:h-screen">
            {!formClose && (
              <Form />
            )}
            <Preview />
          </div>
        </div>
        <FormCloseOpenBtn formClose={formClose} setFormClose={setFormClose} />
        <Print />
      </ResumeContext.Provider>
    </>
  );
}
export { ResumeContext };
