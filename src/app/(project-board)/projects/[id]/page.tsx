"use client";
import React, { useState } from "react";
import ListSection from "./_components/ListSection";
import { dummyFields, dummyTaskList, statusOptions } from "@/constant/global";
import FilterBar from "./_components/FilterBar";

export default function ProjectPage() {
  // { params }: { params: { id: string } }
  const [taskList, setTaskList] = useState(dummyTaskList);
  const [columnFields, setColumnFields] = useState(dummyFields);

  const groupedTaskList = taskList.reduce((acc: any, task: any) => {
    const status = task.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);
    return acc;
  }, {});

  const visibleFields = columnFields
    .filter((field) => field.checked)
    .map((field) => field.name);

  console.log(
    groupedTaskList["todo"].map((task: any) =>
      Object.fromEntries(
        Object.entries(task).filter(([key]) => visibleFields.includes(key))
      )
    ),
    "todo"
  );

  console.log(columnFields, "fields");

  return (
    <section>
      <FilterBar
        columnFields={columnFields}
        setColumnFields={setColumnFields}
      />
      {/* <ListSection taskList={taskList} setTaskList={setTaskList} /> */}
      <div className='space-y-10 mt-8'>
        {statusOptions.map((task) => {
          return (
            <div key={task.value}>
              <h1 className='mb-3 max-lg:text-center'>{task.label}</h1>
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
