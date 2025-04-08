import { create } from "zustand";

type ColumnsStore = {
  ColumnArr: string[];
  AddToColumnArray: (column: string[]) => void;
};

export const useColumnStore = create<ColumnsStore>((set) => ({
  ColumnArr: ["name", "assignee", "dueDate", "priority", "status"],
  AddToColumnArray: (updatedArr: string[]) =>
    set(() => ({
      ColumnArr: ["id"].concat(updatedArr),
    })),
}));
