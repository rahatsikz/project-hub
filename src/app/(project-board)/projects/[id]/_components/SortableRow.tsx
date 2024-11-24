import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Check,
  ChevronRight,
  Edit,
  Flag,
  GripIcon,
  MessageCircle,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CommentPopover } from "./CommentPopover";
import {
  dummyAssigne,
  priorityOptions,
  statusOptions,
} from "@/constant/global";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { formatISO } from "date-fns";
import { ComboBox } from "@/components/ui/ComboBox";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Input } from "@/components/ui/input";

export function SortbaleRow({
  data,
  isDragging,
  setTaskList,
}: {
  data: any;
  isDragging: boolean;
  setTaskList: (list: any) => void;
}) {
  const [subTasksOpen, setSubTasksOpen] = useState({
    id: data.id,
    open: false,
  });

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

  const form = useForm({
    defaultValues: {
      assignee: [
        {
          value: data.assignee.value,
          label: data.assignee.label,
          acronym: data.assignee.acronym,
          id: data.assignee.id,
        },
      ],
      status: data.status || statusOptions[0].value,
      priority: data.priority,
      dueDate: data.dueDate,
    },
  });

  const { watch } = form;

  // Watching for changes to the `assigne` field
  const [assignee, status, priority, dueDate] = [
    watch("assignee"),
    watch("status"),
    watch("priority"),
    watch("dueDate"),
  ];
  useEffect(() => {
    // Create a mapping of the watched fields to their corresponding keys in the task
    const updates = {
      assignee: assignee,
      status: status,
      priority: priority,
      dueDate: dueDate && formatISO(dueDate),
    };

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        setTaskList((prev: any) =>
          prev.map((item: any) => {
            if (item.id === data.id) {
              return { ...item, [key]: value };
            }
            return item;
          })
        );
      }
    });
  }, [assignee, data.id, priority, setTaskList, status, dueDate]);

  useEffect(() => {
    if (subTasksOpen.open && isDragging) {
      setSubTasksOpen({
        id: data.id,
        open: false,
      });
    }
  }, [data.id, isDragging, subTasksOpen.open]);

  // to edit the task name
  const [isNameEditing, setIsNameEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNameEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isNameEditing]);

  console.log({ data });

  return (
    <>
      <TableRow
        key={data?.id}
        ref={setNodeRef}
        style={style}
        {...attributes}
        className='group'
      >
        <TableCell>
          <div
            {...listeners}
            className={cn(isDragging ? "cursor-grabbing" : "cursor-grab")}
          >
            <GripIcon className='size-4' />
          </div>
        </TableCell>
        <TableCell className='flex items-center gap-2 w-full '>
          <Button
            variant='ghost'
            size='sm'
            onClick={() =>
              setSubTasksOpen({
                id: data.id,
                open: !subTasksOpen.open,
              })
            }
          >
            <ChevronRight
              className={cn(
                subTasksOpen.open && "rotate-90",
                data.subTasks?.length === 0 && "text-muted-foreground"
              )}
            />
          </Button>
          {/* <div className='min-w-20 max-w-32 truncate'>{data?.name}</div> */}
          <div className=' flex items-center w-full justify-between'>
            <div
              className={cn(
                isNameEditing
                  ? "hidden"
                  : "flex items-center justify-between w-full"
              )}
            >
              <p className='xl:w-60 w-32 line-clamp-1'>{data?.name}</p>
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => {
                  setIsNameEditing(true);
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }}
                className={cn(
                  "opacity-0  transition-opacity duration-300 ease-in-out",
                  isDragging ? "" : "group-hover:opacity-100"
                )}
              >
                <Edit />
              </Button>
            </div>
            <div
              className={cn(
                isNameEditing
                  ? "flex justify-between items-center gap-4 w-full"
                  : "hidden",
                ""
              )}
            >
              <Input
                ref={inputRef}
                type='text'
                defaultValue={data?.name}
                className='xl:w-52 w-24 border-0 shadow-none px-0 py-0 h-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                onBlur={() => setIsNameEditing(false)}
              />
              <Button
                size={"icon"}
                variant={"ghost"}
                type='submit'
                className=''
              >
                <Check />
              </Button>
            </div>
          </div>
        </TableCell>
        <Form {...form}>
          <TableCell>
            <form>
              <MultiSelect
                formControl={form.control}
                name='assignee'
                options={dummyAssigne}
                icon={<User />}
                className='min-w-36 max-w-48 truncate'
              />
            </form>
          </TableCell>
          <TableCell>
            <form>
              <DatePicker formController={form.control} name='dueDate' />
            </form>
          </TableCell>
          <TableCell>
            <form>
              <ComboBox
                formControl={form.control}
                name='priority'
                options={priorityOptions}
                icon={<Flag />}
                className={cn("w-28 truncate")}
              />
            </form>
          </TableCell>
          <TableCell>
            <form>
              <ComboBox
                formControl={form.control}
                name='status'
                options={statusOptions}
                className={cn("truncate w-32")}
                // style={{ color: status?.color }}
              />
            </form>
          </TableCell>
        </Form>
        <TableCell>
          <Popover modal={false}>
            <PopoverTrigger asChild>
              <Button
                className='flex items-center justify-start gap-2 hover:ring-2 hover:ring-primary hover:bg-background min-w-16'
                variant='ghost'
              >
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
      {data?.subTasks?.length > 0 &&
        data.subTasks.map((item: any) => (
          <SubtaskRow
            key={item?.id}
            data={item}
            setTaskList={setTaskList}
            showSubTasks={subTasksOpen}
            mainRowId={data.id}
          />
        ))}
    </>
  );
}

function SubtaskRow({
  data,
  setTaskList,
  showSubTasks,
  mainRowId,
}: {
  data: any;
  setTaskList: (list: any) => void;
  showSubTasks: { id: string; open: boolean };
  mainRowId: string;
}) {
  const form = useForm({
    defaultValues: {
      assignee: [
        {
          value: data.assignee.value,
          label: data.assignee.label,
          acronym: data.assignee.acronym,
          id: data.assignee.id,
        },
      ],
      status: data.status || statusOptions[0].value,
      priority: data.priority,
      dueDate: data.dueDate,
    },
  });

  const { watch } = form;

  // Watching for changes to the `assigne` field
  const [assignee, status, priority, dueDate] = [
    watch("assignee"),
    watch("status"),
    watch("priority"),
    watch("dueDate"),
  ];
  useEffect(() => {
    // Create a mapping of the watched fields to their corresponding keys in the task
    const updates = {
      assignee: assignee,
      status: status,
      priority: priority,
      dueDate: dueDate && formatISO(dueDate),
    };

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        setTaskList((prev: any) =>
          prev.map((task: any) => {
            if (task.id === mainRowId) {
              return {
                ...task,
                subTasks: (task.subTasks || []).map((subTask: any) => {
                  if (subTask.id === data.id) {
                    return { ...subTask, [key]: value };
                  }
                  return subTask;
                }),
              };
            }
            return task;
          })
        );
      }
    });
  }, [assignee, mainRowId, priority, setTaskList, status, dueDate, data.id]);
  return (
    <TableRow key={data?.id} className={cn(showSubTasks.open ? "" : "hidden")}>
      <TableCell></TableCell>
      <TableCell>
        <div className='min-w-16 max-w-28 truncate ml-4'>{data?.name}</div>
      </TableCell>
      <Form {...form}>
        <TableCell>
          <form>
            <MultiSelect
              formControl={form.control}
              name='assignee'
              options={dummyAssigne}
              icon={<User />}
              className='min-w-36 max-w-48 truncate'
            />
          </form>
        </TableCell>
        <TableCell>
          <form>
            <DatePicker formController={form.control} name='dueDate' />
          </form>
        </TableCell>
        <TableCell>
          <form>
            <ComboBox
              formControl={form.control}
              name='priority'
              options={priorityOptions}
              icon={<Flag />}
              className={cn("w-28 truncate")}
            />
          </form>
        </TableCell>
        <TableCell>
          <form>
            <ComboBox
              formControl={form.control}
              name='status'
              options={statusOptions}
              className={cn("w-32 truncate")}
            />
          </form>
        </TableCell>
      </Form>
      <TableCell>
        <Popover modal={false}>
          <PopoverTrigger asChild>
            <Button
              className='flex items-center justify-start gap-2 hover:ring-2 hover:ring-primary hover:bg-background min-w-14'
              variant='ghost'
            >
              <MessageCircle className='size-4 ml-1 text-muted-foreground' />
              {data?.comments?.length ? data?.comments?.length : ""}
            </Button>
          </PopoverTrigger>

          <CommentPopover
            commnetsData={data.comments}
            setTaskList={setTaskList}
            id={data.id}
            isSubtask={true}
          />
        </Popover>
      </TableCell>
    </TableRow>
  );
}
