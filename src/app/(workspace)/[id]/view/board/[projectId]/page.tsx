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

    setAllTasks((prev) => {
      const newAllTasks = prev.map((column) => {
        const filteredTasks = column.tasks.filter(
          (task) => task.id !== draggingId
        );

        // Add task to the new column
        if (column.id === draggedOn) {
          const draggedTask = prev
            .flatMap((c) => c.tasks)
            .find((task) => task.id === draggingId);

          if (draggedTask) {
            filteredTasks.push({ ...draggedTask, status: draggedOn });
          }
        }
        return { ...column, tasks: filteredTasks };
      });

      return newAllTasks;
    });
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className='flex gap-4'>
          {allTasks.map((item) => (
            <Column
              key={item.id}
              id={item.id}
              title={item.name}
              tasks={item.tasks}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default BoardPage;
