"use client";
import { dummyTaskList, statusOptions } from "@/constant/global";
import React, { useEffect, useState } from "react";
import Column from "./_components/Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const BoardPage = () => {
  const groupedTasks = statusOptions.map((item) => ({
    id: item.value,
    name: item.label,
    tasks: dummyTaskList.filter((task) => task.status === item.value),
  }));

  const [allTasks, setAllTasks] = useState([...groupedTasks]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) return;

    const draggingId = active.id.toString();
    const draggedOn = over.id.toString();

    console.log({ draggingId, draggedOn });

    setAllTasks((prev) =>
      prev.map((col) => {
        const updatedTask = col.tasks.map((card) => {
          if (card.id === draggingId) {
            return { ...card, status: draggedOn };
          }
          return card;
        });
        return { ...col, tasks: updatedTask };
      })
    );
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return (
    <div>
      <div className='flex gap-4'>
        <DndContext onDragEnd={handleDragEnd}>
          {allTasks.map((item) => (
            <Column
              key={item.id}
              id={item.id}
              title={item.name}
              tasks={item.tasks}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default BoardPage;
