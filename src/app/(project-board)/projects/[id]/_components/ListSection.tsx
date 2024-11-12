"use client";
import React, { useEffect, useState } from "react";

import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ListSection() {
  const [isDragging, setIsDragging] = useState(false);

  const [taskList, setTaskList] = useState([
    {
      id: crypto.randomUUID(),
      name: "Task 1",
      assigne: "John Doe",
      dueDate: "2023-01-01",
      priority: "Medium",
      status: "In Progress",
      comments: "",
    },
    {
      id: crypto.randomUUID(),
      name: "Task 2",
      assigne: "Mary Doe",
      dueDate: "2023-01-01",
      priority: "Medium",
      status: "In Progress",
      comments: "",
    },
  ]);

  const tableHeader = Object.keys(taskList[0])
    .filter((key) => key !== "id")
    .map((key) => {
      if (key.includes("Date")) {
        return {
          [key]: "due date",
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
      const oldIndex = taskList.findIndex((item) => item.id === active.id);
      let newIndex = taskList.findIndex((item) => item.id === over.id);

      // Restrict the newIndex within range
      newIndex = Math.min(Math.max(newIndex, minIndex), maxIndex);

      setTaskList(arrayMove(taskList, oldIndex, newIndex));
    }
    setIsDragging(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <SortableContext items={taskList.map((item) => item.id)}>
        <Table className='overflow-hidden'>
          <TableHeader className=''>
            <TableRow>
              {tableHeader.map((item, idx) => (
                <TableHead key={idx} className='capitalize'>
                  {item[Object.keys(item)[0]]}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className='mt-4 divide-y border-b overflow-hidden'>
            {taskList.map((item) => (
              <SortbaleList key={item.id} data={item} isDragging={isDragging} />
            ))}
          </TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  );
}

function SortbaleList({
  data,
  isDragging,
}: {
  data: any;
  isDragging: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString({
      x: 0,
      y: transform?.y ?? 0,
      scaleX: transform?.scaleX ?? 1,
      scaleY: transform?.scaleY ?? 1,
    }),
    transition,
  };

  return (
    <TableRow
      key={data?.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(isDragging ? "cursor-grabbing" : "")}
    >
      <TableCell>{data?.name}</TableCell>
      <TableCell>{data?.assigne} </TableCell>
      <TableCell>{data?.dueDate}</TableCell>
      <TableCell>{data?.priority}</TableCell>
      <TableCell>{data.status}</TableCell>
      <TableCell>{data?.comments}</TableCell>
    </TableRow>
  );
}
