import Skills from "../components/Skills";
import DateRange from "../../utility/DateRange";
import Language from "../components/Language";
import Certification from "../components/Certification";
import {MdCalendarToday} from "react-icons/md";
import dynamic from "next/dynamic";

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

const RightSide = ({resumeData}) => {
  return (
    <div className="col-span-1 section-stack">
      <Droppable droppableId="skills" type="SKILLS">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {resumeData.skills.length > 0 && (
              <h2 className="section-title">Herramientas</h2>
            )}
            {resumeData.skills.map((skill, index) => (
              <Draggable
                key={`SKILLS-${index}`}
                draggableId={`SKILLS-${index}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${index < resumeData.skills.length - 1 ? "sep" : ""} ${
                      snapshot.isDragging
                        ? "outline-dashed outline-2 outline-gray-400 bg-white"
                        : ""
                    }`}
                  >
                    <Skills title={skill.title} skills={skill.skills}/>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {resumeData.education.length > 0 && (
        <div>
          <h2 className="section-title">Educación</h2>
          {resumeData.education.map((item, index) => (
            <div
              key={index}
              className={index < resumeData.education.length - 1 ? "sep" : ""}
            >
              <p className="content text-black font-bold text-[12.5px]">
                {item.degree}
              </p>
              <p className="content text-accent font-bold text-[12px]">
                {item.school}
              </p>
              <p className="sub-content text-meta text-[10.5px] inline-flex items-center gap-1">
                <MdCalendarToday/>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`education-start-end-date-${index}`}
                />
              </p>
            </div>
          ))}
        </div>
      )}

      <Language title="Idiomas" languages={resumeData.languages}/>

      <Certification
        title="Certificaciones"
        certifications={resumeData.certifications || []}
      />
    </div>
  );
};

export default RightSide;
