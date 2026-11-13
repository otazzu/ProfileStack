import React, {useContext} from 'react';
import Link from "next/link";
import {MdInsertLink} from "react-icons/md";
import dynamic from "next/dynamic";
import {ResumeContext} from "../../../../builder";

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  {ssr: false}
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  {ssr: false}
);

const Projects = () => {
  const {resumeData} = useContext(ResumeContext);
  return (
    <Droppable droppableId="projects" type="PROJECTS">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h2
            className="section-title editable"
            contentEditable
            suppressContentEditableWarning
          >
            Proyectos
          </h2>
          {resumeData.projects.map((item, index) => (
            <Draggable
              key={`${item.name}-${index}`}
              draggableId={`PROJECTS-${index}`}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`${
                    index < resumeData.projects.length - 1 ? "sep" : ""
                  } ${
                    snapshot.isDragging
                      ? "outline-dashed outline-2 outline-gray-400 bg-white"
                      : ""
                  }`}
                >
                  <p className="content text-black font-bold text-[13px]">{item.name}</p>

                  {item.link && (
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sub-content text-body text-[10.5px] inline-flex items-center gap-1 break-all"
                    >
                      <MdInsertLink className="shrink-0"/>
                      {item.link}
                    </Link>
                  )}
                  {item.description && (
                    <p className="content text-body">{item.description}</p>
                  )}

                  <Droppable
                    droppableId={`PROJECTS_KEY_ACHIEVEMENT-${index}`}
                    type="PROJECTS_KEY_ACHIEVEMENT"
                  >
                    {(provided) => (
                      <ul
                        className="list-disc ul-padding content text-body text-[11.5px]"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {typeof item.keyAchievements === "string" &&
                          item.keyAchievements
                            .split("\n")
                            .map((achievement, subIndex) => (
                              <Draggable
                                key={`${item.name}-${index}-${subIndex}`}
                                draggableId={`PROJECTS_KEY_ACHIEVEMENT-${index}-${subIndex}`}
                                index={subIndex}
                              >
                                {(provided, snapshot) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`
                                      hover:outline-dashed hover:outline-2 hover:outline-gray-400
                                      ${
                                        snapshot.isDragging &&
                                        "outline-dashed outline-2 outline-gray-400 bg-white"
                                      }`}
                                  >
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: achievement,
                                      }}
                                      contentEditable
                                    />
                                  </li>
                                )}
                              </Draggable>
                            ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Projects;
