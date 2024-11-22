import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronRight,
  Flag,
  GripIcon,
  MessageCircle,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
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
      assignee: {
        value: data.assignee,
        label: data.assignee,
      },
      status: {
        value: data.status.value || statusOptions[0].value,
        label: data.status.label || statusOptions[0].label,
        icon: data.status.icon || statusOptions[0].icon,
      },
      priority: {
        value: data.priority.value,
        label: data.priority.label,
        icon: data.priority.icon,
      },
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
      assignee: assignee?.value,
      status: status?.value,
      priority: priority?.value,
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
  }, [
    assignee?.value,
    data.id,
    priority?.value,
    setTaskList,
    status?.value,
    dueDate,
  ]);

  useEffect(() => {
    if (subTasksOpen.open && isDragging) {
      setSubTasksOpen({
        id: data.id,
        open: false,
      });
    }
  }, [data.id, isDragging, subTasksOpen.open]);

  return (
    <>
      <TableRow key={data?.id} ref={setNodeRef} style={style} {...attributes}>
        <TableCell>
          <div
            {...listeners}
            className={cn(isDragging ? "cursor-grabbing" : "cursor-grab")}
          >
            <GripIcon className='size-4' />
          </div>
        </TableCell>
        <TableCell className='flex items-center gap-2'>
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
          <div className='min-w-20 max-w-32 truncate'>{data?.name}</div>
        </TableCell>
        <Form {...form}>
          <TableCell>
            <form>
              <ComboBox
                formControl={form.control}
                name='assignee'
                options={dummyAssigne}
                icon={<User />}
                className='w-28 truncate'
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
      assignee: {
        value: data.assignee,
        label: data.assignee,
      },
      status: {
        value: data.status.value || statusOptions[0].value,
        label: data.status.label || statusOptions[0].label,
        icon: data.status.icon || statusOptions[0].icon,
      },
      priority: {
        value: data.priority.value,
        label: data.priority.label,
        icon: data.priority.icon,
      },
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
      assignee: assignee?.value,
      status: status?.value,
      priority: priority?.value,
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
  }, [
    assignee?.value,
    mainRowId,
    priority?.value,
    setTaskList,
    status?.value,
    dueDate,
    data.id,
  ]);
  return (
    <TableRow key={data?.id} className={cn(showSubTasks.open ? "" : "hidden")}>
      <TableCell></TableCell>
      <TableCell>
        <div className='min-w-16 max-w-28 truncate ml-4'>{data?.name}</div>
      </TableCell>
      <Form {...form}>
        <TableCell>
          <form>
            <ComboBox
              formControl={form.control}
              name='assignee'
              options={dummyAssigne}
              icon={<User />}
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
