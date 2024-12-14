import { useDraggable } from "@dnd-kit/core";
import { GripIcon } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

const Card = ({ task }: { task: any }) => {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className='bg-muted h-16 flex gap-3 items-center pl-4 rounded'
      style={style}
    >
      <GripIcon {...listeners} />
      <p className='text-sm'>{task.name}</p>
    </div>
  );
};

export default Card;
