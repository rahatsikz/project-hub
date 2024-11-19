"use client";
import React, { useEffect, useRef, useState } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  // const [openMention, setOpenMention] = React.useState(false);
  // const [openComment, setOpenComment] = React.useState(false);
  // useEffect(() => {
  //   console.log({ commentMention });
  //   // console.log(data.comments);
  // }, [commentMention]);

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

          <CommentPopover
            commnetsData={data.comments}
            setTaskList={setTaskList}
            id={data.id}
          />
        </Popover>
      </TableCell>
    </TableRow>
  );
}

function CommentPopover({ commnetsData, setTaskList, id }: any) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const togglePopover = () => setPopoverOpen((prev) => !prev);

  const handlePopoverClose = (open: boolean) => {
    setPopoverOpen(open);
    if (!open && textareaRef.current) {
      textareaRef.current.focus(); // Focus the textarea when the popover closes
    }
  };

  const CommentWithHighlights = ({
    comment,
    users,
    tasks,
  }: {
    comment: string;
    users: {
      label: string;
      value: string;
    }[];
    tasks: string[];
  }) => {
    // Extract the words from the comment
    const words = comment.split(/\s+/); // Split by spaces

    return (
      <div>
        {words.map((word, index) => {
          const isUser = users.some((user: any) =>
            user.label.split(" ").some((w: string) => {
              if (word[0] === "@") {
                return w === word.slice(1);
              } else {
                return w === word;
              }
            })
          );

          const isTask = tasks.some((task: any) =>
            task.split(" ").some((w: string) => {
              if (word[0] === "@") {
                return w === word.slice(1);
              } else {
                return w === word;
              }
            })
          );

          return (
            <span
              key={index}
              className={cn(
                isUser || isTask ? "text-primary" : "text-muted-foreground",
                "text-sm font-medium"
              )}
            >
              {word[0] === "@" ? word.slice(1) : word}
              {/* Add space after the word */}
              {index < words.length - 1 && " "}
            </span>
          );
        })}
      </div>
    );
  };

  const formSchema = z.object({
    comment: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    setTaskList((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            comments: [
              ...item.comments,
              { comment: values.comment, user: "John Doe" },
            ],
          };
        }
        return item;
      });
    });

    form.reset({
      comment: "",
    });
  }

  return (
    <PopoverContent
      align='end'
      className={cn(
        "xl:w-96 p-2 rounded-lg font-sans",
        commnetsData?.length ? "space-y-3" : ""
      )}
    >
      <div className='space-y-2'>
        {commnetsData?.map((item: any, index: number) => (
          <div
            key={index}
            className='px-2.5 py-2 border flex flex-col gap-1 rounded'
          >
            <div className='flex justify-between items-center text-sm'>
              <p className='font-semibold'>{item.user}</p>
              <p className='text-muted-foreground font-medium text-xs'>
                {item.date || "16th Feb"}
              </p>
            </div>
            <CommentWithHighlights
              comment={item.comment}
              users={dummyAssigne}
              tasks={dummyTaskList.map((item) => item.name)}
            />
          </div>
        ))}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='border border-input rounded-md divide-y'>
                    <Textarea
                      rows={3}
                      className={cn(
                        "resize-none border-none focus-visible:ring-0"
                      )}
                      {...field}
                      ref={textareaRef}
                      onKeyDown={(e) => {
                        if (e.key === "@") {
                          togglePopover();
                        }
                      }}
                    />

                    <div className='flex justify-end px-2 py-2 items-center gap-1'>
                      <Popover
                        modal={false}
                        open={popoverOpen}
                        onOpenChange={handlePopoverClose}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant='ghost'
                            className='h-7 rounded-sm'
                            onClick={togglePopover}
                          >
                            <AtSign className='size-4 text-muted-foreground' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          align='end'
                          className='xl:w-96 p-2 rounded-lg font-sans'
                        >
                          <Tabs
                            defaultValue='people'
                            className='popover-content'
                          >
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
                                        className='flex flex-col w-full'
                                      >
                                        <CommandItem
                                          className='w-full'
                                          value={item.value}
                                          onSelect={() => {
                                            const updatedValue = field.value
                                              ? `${field.value} @${item.label}`
                                              : `@${item.label}`;
                                            field.onChange(updatedValue); // Directly pass the updated value
                                            setPopoverOpen(false);
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
                                      <PopoverClose
                                        key={item.id}
                                        className='w-full flex flex-col'
                                      >
                                        <CommandItem
                                          key={item.id}
                                          value={item.id}
                                          className='w-full'
                                          onSelect={() => {
                                            const updatedValue = field.value
                                              ? `${field.value} @${item.name}`
                                              : `@${item.name}`;
                                            field.onChange(updatedValue); // Directly pass the updated value
                                            setPopoverOpen(false);
                                          }}
                                        >
                                          {item.name}
                                        </CommandItem>
                                      </PopoverClose>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </TabsContent>
                          </Tabs>
                        </PopoverContent>
                      </Popover>
                      <Button
                        className='h-7 rounded-sm'
                        size={"sm"}
                        type='submit'
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </PopoverContent>
  );
}
