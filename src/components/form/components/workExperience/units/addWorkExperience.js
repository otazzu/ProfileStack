export const addWorkExperience = (resumeData, setResumeData) => {
  setResumeData({
    ...resumeData,
    workExperience: [
      ...resumeData.workExperience,
      {
        company: "",
        position: "",
        location: "",
        description: "",
        keyAchievements: "",
        startYear: "",
        endYear: "",
      },
    ],
  });
};
