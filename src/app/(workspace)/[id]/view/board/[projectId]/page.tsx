"use client";
import { dummyTaskList, statusOptions } from "@/constant/global";
import React, { useState } from "react";
import Column from "./_components/Column";

const BoardPage = () => {
  const groupedTasks = statusOptions.map((item) => ({
    id: item.value,
    name: item.label,
    tasks: dummyTaskList.filter((task) => task.status === item.value),
  }));

  const [tasks, setTasks] = useState(groupedTasks);
  console.log(tasks);

  return (
    <div>
      <div className='flex gap-4'>
        {tasks.map((item) => (
          <Column
            key={item.id}
            id={item.id}
            title={item.name}
            tasks={item.tasks}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
