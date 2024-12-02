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
import { dummyTaskList } from "@/constant/global";

export default function ListSection({ taskList, setTaskList }: any) {
  const [isDragging, setIsDragging] = useState(false);

  console.log({ taskList });

  const tableHeader = Object.keys(dummyTaskList[0])
    .filter((key) => key !== "subTasks")
    .map((key) => {
      if (key.includes("Date")) {
        return {
          [key]: "due date",
        };
      } else if (key.includes("id")) {
        return {
          [key]: "",
        };
      }
      return {
        [key]: key,
      };
    });

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
        <Table className=''>
          <TableHeader>
            <TableRow className='group'>
              {tableHeader.map((item, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    "capitalize",
                    item[Object.keys(item)[0]] === "name"
                      ? "sticky left-0 bg-background hover:bg-muted/10 group-hover:bg-muted/10 transition-colors"
                      : ""
                  )}
                >
                  {item[Object.keys(item)[0]]}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className='mt-4 divide-y border-b '>
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
      </SortableContext>
    </DndContext>
  );
}
