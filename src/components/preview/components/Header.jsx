import Image from "next/image";
import ContactInfo from "../components/ContactInfo";
import {MdPhone, MdAlternateEmail, MdInsertLink, MdLocationOn} from "react-icons/md";

const withProtocol = (link) =>
  /^https?:\/\//i.test(link) ? link : `https://${link}`;

const Header = ({resumeData, icons}) => {
  return (
    <div className="flex flex-row items-start justify-between gap-4 mb-5">
      <div className="flex-1">
        <h1 className="name">{resumeData.name}</h1>
        <p className="profession text-accent">{resumeData.position}</p>

        <ContactInfo
          mainclass="flex flex-row flex-wrap items-center gap-x-3.5 gap-y-1 contact text-[#333]"
          linkclass="inline-flex items-center gap-1"
          teldata={resumeData.contactInformation}
          emaildata={resumeData.email}
          addressdata={resumeData.address}
          telicon={<MdPhone className="text-accent"/>}
          emailicon={<MdAlternateEmail className="text-accent"/>}
          addressicon={<MdLocationOn className="text-accent"/>}
        >
          {resumeData.socialMedia.map((socialMedia, index) => {
            const match = icons.find(
              (icon) => icon.name === socialMedia.socialMedia.toLowerCase()
            );
            return (
              <a
                href={withProtocol(socialMedia.link)}
                aria-label={socialMedia.socialMedia}
                key={index}
                title={socialMedia.socialMedia}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 social-media underline text-[#333]"
              >
                <span className="text-accent inline-flex">
                  {match ? match.icon : <MdInsertLink/>}
                </span>
                {socialMedia.socialMedia}
              </a>
            );
          })}
        </ContactInfo>
      </div>

      {resumeData.profilePicture.length > 0 && (
        <div className="w-[95px] h-[95px] rounded-full overflow-hidden shrink-0">
          <Image
            src={resumeData.profilePicture}
            alt="profile"
            width={95}
            height={95}
            className="object-cover h-full w-full"
          />
        </div>
      )}
    </div>
  );
};

export default Header;
