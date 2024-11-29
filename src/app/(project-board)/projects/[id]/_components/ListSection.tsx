"use client";
import React, { useEffect, useState } from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
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
    const minIndex = 0; // minimum range (first item index)
    const maxIndex = taskList.length - 1; // maximum range (last item index)

    if (active?.id && over?.id && active.id !== over.id) {
      const oldIndex = taskList.findIndex((item: any) => item.id === active.id);
      let newIndex = taskList.findIndex((item: any) => item.id === over.id);

      // Restrict the newIndex within range
      newIndex = Math.min(Math.max(newIndex, minIndex), maxIndex);

      // console.log({ oldIndex, newIndex, taskList });

      setTaskList(arrayMove(taskList, oldIndex, newIndex));
    }
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={taskList.map((item: any) => item.id)}>
        <Table className='overflow-hidden'>
          <TableHeader>
            <TableRow>
              {tableHeader.map((item, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    item[Object.keys(item)[0]] === "" ? "w-12 pl-2" : "pl-7",
                    "capitalize "
                  )}
                >
                  {item[Object.keys(item)[0]]}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className='mt-4 divide-y border-b overflow-hidden'>
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
