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
import { AtSign, Flag, GripIcon, MessageCircle, User } from "lucide-react";
import { DatePicker } from "@/components/ui/DatePicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { dummyAssigne, dummyTaskList } from "@/constant/global";
import { PopoverClose } from "@radix-ui/react-popover";

export default function ListSection() {
  const [isDragging, setIsDragging] = useState(false);

  const [taskList, setTaskList] = useState(dummyTaskList);

  console.log({ taskList });

  const tableHeader = Object.keys(taskList[0])
    // .filter((key) => key !== "id")
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
                    item[Object.keys(item)[0]] === "" ? "w-12" : "",
                    "capitalize"
                  )}
                >
                  {item[Object.keys(item)[0]]}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className='mt-4 divide-y border-b overflow-hidden'>
            {taskList.map((item) => (
              <SortbaleList
                key={item.id}
                data={item}
                isDragging={isDragging}
                setTaskList={setTaskList}
              />
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
  setTaskList,
}: {
  data: any;
  isDragging: boolean;
  setTaskList: (list: any) => void;
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

  const [status, setStatus] = useState<any>({
    value: data.status,
    label: data.status,
  });
  const [assigne, setAssigne] = useState<any>({
    value: data.assigne,
    label: data.assigne,
  });
  const [priority, setPriority] = useState<any>({
    value: data.priority,
    label: data.priority,
  });

  const [date, setDate] = useState<Date>(data.dueDate);
  // const [comments, setComments] = useState<any>([]);
  const [commentMention, setCommentMention] = useState<any>([]);
  // const [openMention, setOpenMention] = React.useState(false);
  // const [openComment, setOpenComment] = React.useState(false);
  useEffect(() => {
    console.log({ commentMention });
  }, [commentMention]);

  const handleDateChange = (date: any) => {
    setDate(date);
    setTaskList((prev: any) =>
      prev.map((item: any) => {
        if (item.id === data.id) {
          return { ...item, dueDate: date };
        }
        return item;
      })
    );
  };

  const handleStatusChange = (value: any) => {
    setStatus(value);
    setTaskList((prev: any) =>
      prev.map((item: any) => {
        if (item.id === data.id) {
          return { ...item, status: value.value };
        }
        return item;
      })
    );
  };

  const handlePriorityChange = (value: any) => {
    setPriority(value);
    setTaskList((prev: any) =>
      prev.map((item: any) => {
        if (item.id === data.id) {
          return { ...item, priority: value.value };
        }
        return item;
      })
    );
  };

  const handleAssignChange = (value: any) => {
    setAssigne(value);
    setTaskList((prev: any) =>
      prev.map((item: any) => {
        if (item.id === data.id) {
          return { ...item, assigne: value.value };
        }
        return item;
      })
    );
  };

  return (
    <TableRow
      key={data?.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      // {...listeners}
    >
      <TableCell>
        <div
          {...listeners}
          className={cn(isDragging ? "cursor-grabbing" : "cursor-grab")}
        >
          <GripIcon />
        </div>
      </TableCell>
      <TableCell className='min-w-20'>{data?.name}</TableCell>
      <TableCell>
        <ComboBox
          onChange={(value) => handleAssignChange(value)}
          value={assigne}
          options={[
            { value: "John Doe", label: "John Doe" },
            { value: "Jane Doe", label: "Jane Doe" },
            { value: "Mary Doe", label: "Mary Doe" },
          ]}
          label={data.assigne && data.assigne}
          icon={<User />}
        />
      </TableCell>
      <TableCell>
        <DatePicker date={date} setDate={handleDateChange} />
      </TableCell>
      <TableCell>
        <ComboBox
          onChange={(value) => handlePriorityChange(value)}
          value={priority}
          options={[
            { value: "urgent", label: "Urgent" },
            { value: "high", label: "High" },
            { value: "normal", label: "Normal" },
            { value: "low", label: "Low" },
          ]}
          icon={<Flag />}
        />
      </TableCell>
      <TableCell>
        <ComboBox
          onChange={(value) => handleStatusChange(value)}
          value={status}
          options={[
            { value: "todo", label: "To Do" },
            { value: "inprogress", label: "In Progress" },
            { value: "complete", label: "Complete" },
          ]}
          label={data.status ? data.status : "To Do"}
        />
      </TableCell>
      <TableCell>
        <Popover
          modal={false}
          // open={openComment}
          // onOpenChange={setOpenComment}
        >
          <PopoverTrigger asChild>
            <Button className='flex items-center gap-2' variant='ghost'>
              <MessageCircle className='size-4 ml-1 text-muted-foreground' />
              {data?.comments?.length ? data?.comments?.length : ""}
            </Button>
          </PopoverTrigger>
          <PopoverContent align='end' className='xl:w-96 p-2 rounded-lg'>
            <div className='border border-foreground rounded-md divide-y'>
              <Textarea
                rows={3}
                className='resize-none border-none focus-visible:ring-0'
              />
              <div className='flex justify-end px-2 py-2 items-center gap-1'>
                <Popover
                  modal={false}
                  // open={openMention}
                  // onOpenChange={setOpenMention}
                >
                  <PopoverTrigger asChild>
                    <Button variant='ghost' className='flex items-center gap-2'>
                      <AtSign className='size-4 mr-2 text-muted-foreground' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align='end'
                    className='xl:w-96 p-2 rounded-lg'
                  >
                    <Tabs defaultValue='people' className='popover-content'>
                      <TabsList className='w-full justify-start gap-3 tabs-list'>
                        <TabsTrigger value='people'>People</TabsTrigger>
                        <TabsTrigger value='task'>Tasks</TabsTrigger>
                      </TabsList>
                      <TabsContent value='people'>
                        <Command>
                          <CommandInput
                            placeholder='Type to search...'
                            className='h-8'
                          />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>

                            <CommandSeparator />
                            <CommandGroup className='mt-2'>
                              {dummyAssigne.map((item) => (
                                <PopoverClose
                                  key={item.value}
                                  className='w-full flex flex-col'
                                >
                                  <CommandItem
                                    className='w-full'
                                    value={item.value}
                                    onSelect={() => {
                                      setCommentMention((prev: any) => [
                                        ...prev,
                                        {
                                          label: item.label,
                                          value: item.value,
                                        },
                                      ]);
                                    }}
                                  >
                                    {item.label}
                                  </CommandItem>
                                </PopoverClose>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </TabsContent>
                      <TabsContent value='task'>
                        <Command>
                          <CommandInput
                            placeholder='Type to search...'
                            className='h-8'
                          />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>

                            <CommandSeparator />
                            <CommandGroup className='mt-2'>
                              {dummyTaskList.map((item) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.id}
                                  onSelect={() => {
                                    setCommentMention((prev: any) => [
                                      ...prev,
                                      {
                                        label: item.name,
                                        value: item.id,
                                      },
                                    ]);
                                  }}
                                >
                                  {item.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </TabsContent>
                    </Tabs>
                  </PopoverContent>
                </Popover>
                <Button className='h-7 rounded-sm' size={"sm"} type='submit'>
                  Submit
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </TableCell>
    </TableRow>
  );
}
