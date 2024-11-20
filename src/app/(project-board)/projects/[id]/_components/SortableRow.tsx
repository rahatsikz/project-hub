import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/comboBox";
import { DatePicker } from "@/components/ui/DatePicker";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Flag, GripIcon, MessageCircle, User } from "lucide-react";
import { useState } from "react";
import { CommentPopover } from "./CommentPopover";
import {
  dummyAssigne,
  priorityOptions,
  statusOptions,
} from "@/constant/global";

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
      <TableCell>
        <ComboBox
          onChange={(value) => handleAssignChange(value)}
          value={assigne}
          options={dummyAssigne}
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
          options={priorityOptions}
          icon={<Flag />}
        />
      </TableCell>
      <TableCell>
        <ComboBox
          onChange={(value) => handleStatusChange(value)}
          value={status}
          options={statusOptions}
          label={data.status ? data.status : "To Do"}
        />
      </TableCell>
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
