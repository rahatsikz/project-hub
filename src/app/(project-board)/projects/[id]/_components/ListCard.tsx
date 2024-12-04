import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ComboBox } from "@/components/ui/ComboBox";
import { DatePicker } from "@/components/ui/DatePicker";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/MultiSelect";
import {
  dummyAssigne,
  priorityOptions,
  statusOptions,
} from "@/constant/global";
import { cn } from "@/lib/utils";
import { Check, Edit, Flag, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function ListCard({ item }: any) {
  const form = useForm({
    defaultValues: {
      name: item.name,
      assignee: [
        {
          value: item.assignee.value,
          label: item.assignee.label,
          acronym: item.assignee.acronym,
          id: item.assignee.id,
        },
      ],
      status: item.status || statusOptions[0].value,
      priority: item.priority,
      dueDate: item.dueDate,
    },
  });

  const [isNameEditing, setIsNameEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNameEditing && inputRef.current) {
      inputRef.current.focus();
    }

    // Handle clicks outside the container
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsNameEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNameEditing, item.id]);

  return (
    <Card>
      <Form {...form}>
        <CardHeader className='group'>
          <CardDescription>Name</CardDescription>

          <div
            className=' flex items-center w-full justify-between cursor-pointer'
            ref={containerRef}
          >
            <div
              className={cn(
                isNameEditing ? "hidden" : "flex gap-4 items-center w-full"
              )}
            >
              <CardTitle>{item.name}</CardTitle>
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => setIsNameEditing(true)}
                className={cn(
                  "opacity-0  transition-opacity",
                  "group-hover:opacity-100 size-4"
                )}
              >
                <Edit />
              </Button>
            </div>
            <form
              onSubmit={form.handleSubmit(() => {
                // console.log(form.getValues().name);
                setIsNameEditing(false);
              })}
              className={cn(
                isNameEditing
                  ? "flex justify-between items-center gap-4 w-full"
                  : "hidden"
              )}
            >
              <Input
                name='name'
                formControl={form.control}
                ref={inputRef}
                type='text'
                className='border-0 shadow-none px-0 py-0 h-4 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-40'
              />
              <Button
                size={"icon"}
                variant={"ghost"}
                type='submit'
                className='size-4'
              >
                <Check
                  style={{ strokeWidth: "4px" }}
                  className='text-primary'
                />
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent>
          <form className='gap-3 grid grid-cols-2'>
            <div>
              <CardDescription>Assginee</CardDescription>
              <MultiSelect
                formControl={form.control}
                name='assignee'
                options={dummyAssigne}
                icon={<User />}
                className='px-0 truncate hover:ring-0 data-[state=open]:ring-0 mt-0.5 whitespace-nowrap w-full'
              />
            </div>
            <div>
              <CardDescription>Priority</CardDescription>
              <ComboBox
                formControl={form.control}
                name='priority'
                options={priorityOptions}
                icon={<Flag />}
                className={cn(
                  "truncate px-0 hover:ring-0 data-[state=open]:ring-0"
                )}
              />
            </div>
            <div>
              <CardDescription>Status</CardDescription>
              <ComboBox
                formControl={form.control}
                name='status'
                options={statusOptions}
                className={cn(
                  "truncate px-0 hover:ring-0 data-[state=open]:ring-0"
                )}
              />
            </div>
            <div>
              <CardDescription>Due Date</CardDescription>
              <DatePicker
                formController={form.control}
                name='dueDate'
                className='px-0 hover:ring-0 data-[state=open]:ring-0'
              />
            </div>
          </form>
        </CardContent>
      </Form>
    </Card>
  );
}
