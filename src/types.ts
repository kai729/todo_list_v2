export type Todo = {
  id: number; // UNIXタイムスタンプ
  value: string;
  checked: boolean;
  removed: boolean;
  dueDate: string | null;
  createdAt: string; // ISO形式など
  isEditing?: boolean;
};

export type FilterType = "all" | "checked" | "unchecked" | "removed";
export type SortBy = "created" | "due";
export type Filter = "all" | "checked" | "unchecked" | "removed"; // or remove the import

export type State = {
  todos: Todo[];
  filter: FilterType;
  sortBy: SortBy;
};

export type Action =
  | { type: "ADD_TODO"; payload: { value: string; dueDate: string | null } }
  | { type: "UPDATE_TODO"; payload: Partial<Todo> & { id: number } }
  | { type: "REMOVE_TODO"; id: number }
  | { type: "EMPTY_REMOVED" }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "SET_SORT"; payload: SortBy }
  | { type: "INIT_TODOS"; payload: Todo[] }
  | { type: "START_EDIT"; id: number }
  | { type: "CANCEL_EDIT"; id: number }
  | { type: "SAVE_EDIT"; id: number; newValue: string; newDueDate?: string };
