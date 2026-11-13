import React, { useRef, useState } from "react";
import { MdDragIndicator } from "react-icons/md";

/**
 * Reorderable list for the builder form.
 *
 * Uses the native HTML5 drag and drop API (no extra dependency) and reports
 * moves through `onReorder(from, to)`. Every row gets a grip handle: drag it,
 * or focus it and press the arrow keys, to change the position of that item.
 */
const DragList = ({ items, onReorder, renderItem, className = "flex-col-gap-2" }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const rowRefs = useRef([]);

  const resetDrag = () => {
    setDraggingIndex(null);
    setDropTarget(null);
  };

  const handleDragStart = (event, index) => {
    setDraggingIndex(index);
    event.dataTransfer.effectAllowed = "move";
    // Firefox only starts a drag when some data is attached.
    event.dataTransfer.setData("text/plain", String(index));
    const row = rowRefs.current[index];
    if (row) {
      event.dataTransfer.setDragImage(row, 16, 16);
    }
  };

  const handleDragOver = (event, index) => {
    if (draggingIndex === null) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    const rect = event.currentTarget.getBoundingClientRect();
    const after = event.clientY > rect.top + rect.height / 2;
    setDropTarget((current) => {
      if (current && current.index === index && current.after === after) {
        return current;
      }
      return { index, after };
    });
  };

  const handleDragLeave = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;
    setDropTarget(null);
  };

  const handleDrop = (event, index) => {
    if (draggingIndex === null) return;
    event.preventDefault();

    const after = dropTarget && dropTarget.index === index ? dropTarget.after : false;
    const targetIndex = Math.min(Math.max(index + (after ? 1 : 0), 0), items.length);
    const to = draggingIndex < targetIndex ? targetIndex - 1 : targetIndex;

    if (to !== draggingIndex) {
      onReorder(draggingIndex, to);
    }
    resetDrag();
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "ArrowUp" && index > 0) {
      event.preventDefault();
      onReorder(index, index - 1);
    }
    if (event.key === "ArrowDown" && index < items.length - 1) {
      event.preventDefault();
      onReorder(index, index + 1);
    }
  };

  return (
    <div className={className}>
      {items.map((item, index) => {
        const isDragging = draggingIndex === index;
        const isDropTarget = dropTarget && dropTarget.index === index && draggingIndex !== null && !isDragging;

        return (
          <div
            key={index}
            ref={(node) => {
              rowRefs.current[index] = node;
            }}
            className={
              "drag-row" +
              (isDragging ? " drag-row--dragging" : "") +
              (isDropTarget ? " drag-row--over" : "")
            }
            onDragOver={(event) => handleDragOver(event, index)}
            onDragLeave={handleDragLeave}
            onDrop={(event) => handleDrop(event, index)}
          >
            <span
              draggable
              role="button"
              tabIndex={0}
              title="Drag to reorder, or focus and use the arrow keys"
              aria-label={`Reorder item ${index + 1}`}
              className="drag-handle"
              onDragStart={(event) => handleDragStart(event, index)}
              onDragEnd={resetDrag}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <MdDragIndicator />
            </span>
            <div className="drag-row-content">{renderItem(item, index)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DragList;
