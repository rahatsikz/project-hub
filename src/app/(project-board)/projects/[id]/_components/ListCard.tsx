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
import { MultiSelect } from "@/components/ui/MultiSelect";
import {
  dummyAssigne,
  priorityOptions,
  statusOptions,
} from "@/constant/global";
import { cn } from "@/lib/utils";
import { Flag, User } from "lucide-react";
import React from "react";
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
  return (
    <Card>
      <CardHeader>
        <CardDescription>Name</CardDescription>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
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
        </Form>
      </CardContent>
    </Card>
  );
}
