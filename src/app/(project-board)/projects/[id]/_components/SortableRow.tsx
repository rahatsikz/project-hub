import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/comboBox";
import { DatePicker } from "@/components/ui/DatePicker";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Flag, GripIcon, MessageCircle, User } from "lucide-react";
import { useEffect } from "react";
import { CommentPopover } from "./CommentPopover";
import {
  dummyAssigne,
  priorityOptions,
  statusOptions,
} from "@/constant/global";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { formatISO } from "date-fns";

export function SortbaleRow({
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

  const form = useForm({
    defaultValues: {
      assignee: {
        value: data.assignee,
        label: data.assignee,
      },
      status: {
        value: data.status,
        label: data.status,
      },
      priority: {
        value: data.priority,
        label: data.priority,
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

  return (
    <TableRow key={data?.id} ref={setNodeRef} style={style} {...attributes}>
      <TableCell>
        <div
          {...listeners}
          className={cn(isDragging ? "cursor-grabbing" : "cursor-grab")}
        >
          <GripIcon className='size-4' />
        </div>
      </TableCell>
      <TableCell className='min-w-20'>{data?.name}</TableCell>
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
            />
          </form>
        </TableCell>
        <TableCell>
          <form>
            <ComboBox
              formControl={form.control}
              name='status'
              options={statusOptions}
            />
          </form>
        </TableCell>
      </Form>
      <TableCell>
        <Popover modal={false}>
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
