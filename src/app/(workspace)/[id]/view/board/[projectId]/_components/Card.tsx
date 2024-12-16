import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { GripIcon } from "lucide-react";
import React from "react";

const Card = ({ task }: { task: any }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    isDragging,
    transition,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className={cn(
        "bg-muted h-16 flex gap-3 items-center pl-4 rounded",
        isDragging ? "ring-2 ring-primary" : ""
      )}
      style={style}
    >
      <GripIcon
        {...listeners}
        className={cn(isDragging ? "cursor-grabbing" : "cursor-grab")}
      />
      <p className='text-sm'>{task.name}</p>
    </div>
  );
};

export default Card;
