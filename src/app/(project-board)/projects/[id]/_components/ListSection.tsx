"use client";
import React, { useEffect, useState } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SortbaleRow } from "./SortableRow";
import AddTaskRow from "./AddTaskRow";
import ListCard, { AddListCard } from "./ListCard";
import { useColumnStore } from "@/store";

export default function ListSection({ taskList, setTaskList }: any) {
  const [isDragging, setIsDragging] = useState(false);
  const columnArr = useColumnStore((state) => state.ColumnArr);
  console.log(columnArr, "columnArr");

  console.log({ taskList });

  // const tableHeader = Object.keys(dummyTaskList[0])
  //   .filter((key) => key !== "subTasks")
  //   .map((key) => {
  //     if (key.includes("Date")) {
  //       return {
  //         [key]: "due date",
  //       };
  //     } else if (key.includes("id")) {
  //       return {
  //         [key]: "",
  //       };
  //     }
  //     return {
  //       [key]: key,
  //     };
  //   });

  // Inside your ListSection component
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setIsDragging(false);

    if (!active?.id || !over?.id || active.id === over.id) return;

    const activeItem = taskList.find((item: any) => item.id === active.id);
    const overItem = taskList.find((item: any) => item.id === over.id);

    if (activeItem && overItem) {
      setTaskList((prev: any) => {
        // Find the positions of active and over items in the full task list
        const oldIndex = prev.findIndex(
          (item: any) => item.id === activeItem.id
        );
        const newIndex = prev.findIndex((item: any) => item.id === overItem.id);

        if (oldIndex === -1 || newIndex === -1) return prev;

        // Reorder the full task list
        const updatedList = [...prev];
        const [movedItem] = updatedList.splice(oldIndex, 1);
        updatedList.splice(newIndex, 0, movedItem);

        return updatedList;
      });
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={taskList.map((item: any) => item.id)}>
        {/* table */}
        {columnArr.toString()}
        <Table className='hidden lg:table'>
          <TableHeader>
            <TableRow className='group'>
              {[
                "",
                "name",
                "assignee",
                "due date",
                "priority",
                "status",
                "comments",
              ].map((item, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    "capitalize",
                    item === "name" ? "sticky left-0 bg-background" : ""
                  )}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskList.map((item: any) => (
              <SortbaleRow
                key={item.id}
                data={item}
                isDragging={isDragging}
                setTaskList={setTaskList}
              />
            ))}
            <AddTaskRow />
          </TableBody>
        </Table>
        {/* card */}
        <div className='lg:hidden'>
          <div className='grid md:grid-cols-2 gap-4 mb-4'>
            {taskList.map((item: any) => (
              <ListCard key={item.id} item={item} />
            ))}
          </div>
          <AddListCard />
        </div>
      </SortableContext>
    </DndContext>
  );
}
