import React from 'react';
import DateRange from "../../../../utility/DateRange";
import {MdCalendarToday, MdLocationOn} from "react-icons/md";
import dynamic from "next/dynamic";

const Droppable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  {ssr: false}
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  {ssr: false}
);

const WorkExperience = ({item, index, isLast}) => {
  return (
    <Draggable
      key={`${item.company}-${index}`}
      draggableId={`WORK_EXPERIENCE-${index}`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${!isLast ? "sep" : ""} ${
            snapshot.isDragging
              ? "outline-dashed outline-2 outline-gray-400 bg-white"
              : ""
          }`}
        >
          <p className="content font-rubik text-black font-bold text-[13px]">{item.position}</p>
          <p className="content text-accent font-bold text-[12.5px]">{item.company}</p>
          <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-0.5 sub-content text-meta text-[10.5px]">
            {item.startYear && (
              <span className="inline-flex items-center gap-1">
                <MdCalendarToday/>
                <DateRange
                  startYear={item.startYear}
                  endYear={item.endYear}
                  id={`work-experience-start-end-date-${index}`}
                />
              </span>
            )}
            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MdLocationOn/>
                {item.location}
              </span>
            )}
          </div>
          {item.description && (
            <p className="content text-body hyphens-auto">{item.description}</p>
          )}

          <Droppable
            droppableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}`}
            type="WORK_EXPERIENCE_KEY_ACHIEVEMENT"
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
                        key={`${item.company}-${index}-${subIndex}`}
                        draggableId={`WORK_EXPERIENCE_KEY_ACHIEVEMENT-${index}-${subIndex}`}
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
  );
};

export default WorkExperience;
