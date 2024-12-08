import { create } from "zustand";

type ColumnsStore = {
  ColumnArr: string[];
  AddToColumnArray: (column: string, isChecked: boolean) => void;
};

export const useColumnStore = create<ColumnsStore>((set) => ({
  ColumnArr: ["name", "assignee", "dueDate", "priority", "status"],
  AddToColumnArray: (column, isChecked) =>
    set((state) => ({
      ColumnArr: isChecked
        ? state.ColumnArr.includes(column)
          ? state.ColumnArr
          : [...state.ColumnArr, column]
        : state.ColumnArr.filter((item) => item !== column),
    })),
}));
