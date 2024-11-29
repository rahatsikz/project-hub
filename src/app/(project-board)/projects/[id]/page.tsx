"use client";
import React, { useState } from "react";
import ListSection from "./_components/ListSection";
import { dummyTaskList, statusOptions } from "@/constant/global";

export default function ProjectPage() {
  // { params }: { params: { id: string } }
  const [taskList, setTaskList] = useState(dummyTaskList);

  const groupedTaskList = taskList.reduce((acc: any, task: any) => {
    const status = task.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {});

  // console.log(groupedTaskList);

  return (
    <section>
      {/* <ListSection taskList={taskList} setTaskList={setTaskList} /> */}
      <div className='space-y-10'>
        {statusOptions.map((task) => {
          return (
            <div key={task.value}>
              <h1>{task.label}</h1>
              {groupedTaskList[task.value] ? (
                <ListSection
                  taskList={groupedTaskList[task.value]}
                  setTaskList={setTaskList}
                />
              ) : (
                <ListSection taskList={[]} setTaskList={setTaskList} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
