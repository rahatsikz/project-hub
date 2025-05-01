import { addDays } from "date-fns";
import {
  CircleCheckBig,
  CircleDashed,
  CircleDot,
  CircleFadingArrowUp,
  Flag,
  User,
} from "lucide-react";

export const dummyAssigne = [
  { value: "John Doe", label: "John Doe", acronym: "JD", id: 1 },
  { value: "Jane Doe", label: "Jane Doe", acronym: "JA", id: 2 },
  { value: "Mary Doe", label: "Mary Doe", acronym: "MD", id: 3 },
];

export const priorityOptions = [
  {
    value: "urgent",
    label: "Urgent",
    icon: <Flag style={{ stroke: "tomato", fill: "tomato" }} />,
  },
  {
    value: "high",
    label: "High",
    icon: <Flag style={{ stroke: "gold", fill: "gold" }} />,
  },
  {
    value: "normal",
    label: "Normal",
    icon: <Flag style={{ stroke: "slateblue", fill: "slateblue" }} />,
  },
  {
    value: "low",
    label: "Low",
    icon: <Flag style={{ stroke: "silver", fill: "silver" }} />,
  },
];

export const statusOptions = [
  {
    value: "todo",
    label: "To Do",
    icon: <CircleDot style={{ strokeWidth: 3, stroke: "slategray" }} />,
  },
  {
    value: "inprogress",
    label: "In Progress",
    icon: (
      <CircleFadingArrowUp style={{ strokeWidth: 3, stroke: "deepskyblue" }} />
    ),
  },
  {
    value: "complete",
    label: "Complete",
    icon: (
      <CircleCheckBig style={{ strokeWidth: 3, stroke: "lightseagreen" }} />
    ),
  },
];

export const groupOptions = [
  {
    value: "none",
    label: "None",
    icon: <CircleDashed />,
  },
  {
    value: "assignee",
    label: "Assignee",
    icon: <User />,
  },
  {
    value: "status",
    label: "Status",
    icon: <CircleFadingArrowUp />,
  },
  {
    value: "priority",
    label: "Priority",
    icon: <Flag />,
  },
];

export const dummyTaskList = [
  {
    id: crypto.randomUUID(),
    name: "Task 1",
    assignee: dummyAssigne[0],
    dueDate: addDays(new Date(), 3),
    priority: priorityOptions[1].value,
    status: statusOptions[1].value,
    comments: [
      {
        comment: "This is a comment @Mary Doe okay @Task 1",
        user: "John Doe",
      },
    ],
    subTasks: [
      {
        id: crypto.randomUUID(),
        name: "Subtask 1",
        assignee: dummyAssigne[2],
        dueDate: "",
        priority: priorityOptions[0].value,
        status: statusOptions[1].value,
        comments: [
          {
            comment: "Sub comment @Mary Doe okay @Task 1",
            user: "John Doe",
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        name: "Subtask 2",
        assignee: dummyAssigne[0],
        dueDate: "",
        priority: priorityOptions[3].value,
        status: statusOptions[0].value,
        comments: [],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "Task 2",
    assignee: [],
    dueDate: new Date(),
    priority: "",
    status: statusOptions[0].value,
    comments: [],
    subTasks: [],
  },
  {
    id: crypto.randomUUID(),
    name: "Task 3",
    assignee: [],
    dueDate: new Date(),
    priority: "",
    status: statusOptions[0].value,
    comments: [],
    subTasks: [],
  },
];

export const dummyFields = [
  { id: crypto.randomUUID(), name: "name", label: "Name", checked: true },
  {
    id: crypto.randomUUID(),
    name: "assignee",
    label: "Assignee",
    checked: true,
  },
  {
    id: crypto.randomUUID(),
    name: "dueDate",
    label: "Due Date",
    checked: true,
  },
  {
    id: crypto.randomUUID(),
    name: "priority",
    label: "Priority",
    checked: true,
  },
  { id: crypto.randomUUID(), name: "status", label: "Status", checked: true },

  {
    id: crypto.randomUUID(),
    name: "comments",
    label: "Comments",
    checked: false,
  },
];
