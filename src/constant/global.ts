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
    comments: ["s"],
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
