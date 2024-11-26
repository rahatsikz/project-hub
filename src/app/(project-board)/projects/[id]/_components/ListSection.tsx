"use client";
import React, { useEffect, useRef, useState } from "react";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SortbaleRow } from "./SortableRow";
import {
  dummyAssigne,
  dummyTaskList,
  priorityOptions,
  statusOptions,
} from "@/constant/global";
import { Button } from "@/components/ui/button";
import { CircleDashed, Flag, Plus, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { ComboBox } from "@/components/ui/ComboBox";
import { DatePicker } from "@/components/ui/DatePicker";

export default function ListSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const containerRef = useRef<HTMLTableRowElement>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const childRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [taskList, setTaskList] = useState(dummyTaskList);

  console.log({ taskList });

  const form = useForm({
    defaultValues: {
      name: "",
      assignee: null,
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInsideContainer = containerRef.current?.contains(
        event.target as Node
      );

      const isInsideChildren = childRefs.some((ref) =>
        ref.current?.contains(event.target as Node)
      );

      if (!isInsideContainer && !isInsideChildren) {
        setIsAddingTask(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddingTask, childRefs]);

  const tableHeader = Object.keys(taskList[0])
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
            {taskList.map((item) => (
              <SortbaleRow
                key={item.id}
                data={item}
                isDragging={isDragging}
                setTaskList={setTaskList}
              />
            ))}
            <TableRow ref={containerRef}>
              <TableCell></TableCell>
              <Form {...form}>
                <TableCell colSpan={tableHeader.length}>
                  {isAddingTask ? (
                    <form className='flex justify-between'>
                      <Input name='name' formControl={form.control} autoFocus />
                      <div className='flex gap-2 items-center'>
                        <div className='inline-flex gap-1.5'>
                          <MultiSelect
                            formControl={form.control}
                            name='assignee'
                            options={dummyAssigne}
                            icon={<UserPlus />}
                            className='w-fit truncate'
                            ref={childRefs[0]}
                          />

                          <DatePicker
                            formController={form.control}
                            name='dueDate'
                            ref={childRefs[1]}
                          />

                          <ComboBox
                            formControl={form.control}
                            name='priority'
                            options={priorityOptions}
                            icon={<Flag />}
                            className={cn("w-fit truncate")}
                            boxAlignment='end'
                            ref={childRefs[2]}
                          />

                          <ComboBox
                            formControl={form.control}
                            name='status'
                            options={statusOptions}
                            icon={<CircleDashed />}
                            className={cn("truncate w-fit ")}
                            boxAlignment='end'
                            ref={childRefs[3]}
                          />
                        </div>
                        <div>
                          <Button
                            variant='outline'
                            size={"sm"}
                            onClick={() => setIsAddingTask(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant={"default"}
                            type='submit'
                            className='ml-2 h-7'
                            size={"sm"}
                          >
                            Add Task
                          </Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <Button
                      variant='ghost'
                      onClick={() => setIsAddingTask(true)}
                    >
                      <Plus /> Add Task
                    </Button>
                  )}
                </TableCell>
              </Form>
            </TableRow>
          </TableBody>
        </Table>
      </SortableContext>
    </DndContext>
  );
}
