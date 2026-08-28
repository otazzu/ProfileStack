import { useMemo, useState } from "react";
import { loadProfiles } from "./loadProfiles";
import { getProfilePicture } from "./profilePictureStorage";

const cloneResume = (resume) => {
    return JSON.parse(JSON.stringify(resume));
};

export const useProfiles = () => {
    const profiles = useMemo(() => loadProfiles(), []);
    const initialProfile = profiles[0];

    const [selectedProfileId, setSelectedProfileId] = useState(initialProfile?.id || "");
    const [resumeData, setResumeData] = useState(() => {
        const cloned = cloneResume(initialProfile?.resume || {});
        const savedImage = getProfilePicture(initialProfile?.id);
        if (savedImage) {
            cloned.profilePicture = savedImage;
        }
        return cloned;
    });

    const switchProfile = (profileId) => {
        const profile = profiles.find((item) => item.id === profileId);

        if (!profile) {
            return false;
        }

        const cloned = cloneResume(profile.resume);
        const savedImage = getProfilePicture(profileId);
        if (savedImage) {
            cloned.profilePicture = savedImage;
        }

        setSelectedProfileId(profile.id);
        setResumeData(cloned);
        return true;
    };

    return {
        profiles,
        selectedProfileId,
        resumeData,
        setResumeData,
        switchProfile,
    };
};
