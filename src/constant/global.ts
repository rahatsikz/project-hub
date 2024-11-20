export const dummyAssigne = [
  { value: "John Doe", label: "John Doe" },
  { value: "Jane Doe", label: "Jane Doe" },
  { value: "Mary Doe", label: "Mary Doe" },
];

export const dummyTaskList = [
  {
    id: crypto.randomUUID(),
    name: "Task 1",
    assigne: "John Doe",
    dueDate: "",
    priority: "Medium",
    status: "In Progress",
    comments: [
      {
        comment: "This is a comment @Mary Doe okay @Task 1",
        user: "John Doe",
      },
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "Task 2",
    assigne: "",
    dueDate: "2023-01-01",
    priority: "",
    status: "",
    comments: [],
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
