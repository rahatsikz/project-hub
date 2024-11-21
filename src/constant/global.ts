export const dummyAssigne = [
  { value: "John Doe", label: "John Doe" },
  { value: "Jane Doe", label: "Jane Doe" },
  { value: "Mary Doe", label: "Mary Doe" },
];

export const dummyTaskList = [
  {
    id: crypto.randomUUID(),
    name: "Task 1",
    assignee: "John Doe",
    dueDate: "",
    priority: "Medium",
    status: "In Progress",
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
        assignee: "John Doe",
        dueDate: "",
        priority: "Medium",
        status: "To Do",
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
        assignee: "Jane Doe",
        dueDate: "",
        priority: "High",
        status: "To Do",
        comments: [],
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "Task 2",
    assignee: "",
    dueDate: new Date(),
    priority: "",
    status: "",
    comments: [],
    subTasks: [],
  },
];

export const priorityOptions = [
  { value: "urgent", label: "Urgent" },
  { value: "high", label: "High" },
  { value: "normal", label: "Normal" },
  { value: "low", label: "Low" },
];

export const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "inprogress", label: "In Progress" },
  { value: "complete", label: "Complete" },
];
