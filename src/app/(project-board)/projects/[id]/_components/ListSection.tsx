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
import { ComboBox } from "@/components/ui/comboBox";
import { Flag, User } from "lucide-react";

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
      assigne: "",
      dueDate: "2023-01-01",
      priority: "",
      status: "",
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
                <TableHead key={idx} className='capitalize w-[200px]'>
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

  const stopPropagation = (e: React.PointerEvent) => e.stopPropagation();

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
      <TableCell className='w-[200px]'>
        <div onPointerDown={stopPropagation}>
          <ComboBox
            options={[
              { value: "John Doe", label: "John Doe" },
              { value: "Jane Doe", label: "Jane Doe" },
              { value: "Mary Doe", label: "Mary Doe" },
            ]}
            label={data.assigne && data.assigne}
            icon={<User />}
          />
        </div>
      </TableCell>
      <TableCell>{data?.dueDate}</TableCell>
      <TableCell className='w-[200px]'>
        <div onPointerDown={stopPropagation}>
          <ComboBox
            options={[
              { value: "urgent", label: "Urgent" },
              { value: "high", label: "High" },
              { value: "normal", label: "Normal" },
              { value: "low", label: "Low" },
            ]}
            label={data.priority ? data.priority : "Priority"}
            icon={<Flag />}
          />
        </div>
      </TableCell>
      <TableCell className='w-[200px]'>
        <div onPointerDown={stopPropagation}>
          <ComboBox
            options={[
              { value: "1", label: "To Do" },
              { value: "2", label: "In Progress" },
              { value: "3", label: "Complete" },
            ]}
            label={data.status ? data.status : "To Do"}
          />
        </div>
      </TableCell>
      <TableCell>{data?.comments}</TableCell>
    </TableRow>
  );
}
