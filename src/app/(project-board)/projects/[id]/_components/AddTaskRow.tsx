import React, { useEffect, useRef, useState } from "react";
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
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function AddTaskRow() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const containerRef = useRef<HTMLTableRowElement>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const childRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const form = useForm({
    defaultValues: {
      name: "",
      assignee: null,
      status: null,
      priority: null,
      dueDate: null,
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

  return (
    <TableRow ref={containerRef}>
      <TableCell></TableCell>
      <TableCell colSpan={Object.keys(dummyTaskList[0]).length}>
        <Form {...form}>
          {isAddingTask ? (
            <form className='flex justify-between'>
              <Input
                name='name'
                className='w-72'
                formControl={form.control}
                autoFocus
              />
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
            <Button variant='ghost' onClick={() => setIsAddingTask(true)}>
              <Plus /> Add Task
            </Button>
          )}
        </Form>
      </TableCell>
    </TableRow>
  );
}
