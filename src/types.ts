// export type Filter = "all" | "checked" | "unchecked" | "removed";
// export type Sort = "created" | "due";

// export type Todo = {
//   id: number;
//   value: string;
//   checked: boolean;
//   removed: boolean;
//   dueDate?: string;
//   isEditing?: boolean;
// };

// export type NewTodo = Omit<Todo, "id" | "checked" | "removed" | "isEditing">;

// export type TodoUpdate = Partial<Omit<Todo, "id">> & { id: number };

// export type State = {
//   todos: Todo[];
//   filter: Filter;
//   sortBy: Sort;
// };

// export type Action =
//   | { type: "ADD_TODO"; payload: NewTodo }
//   | { type: "UPDATE_TODO"; payload: TodoUpdate }
//   | { type: "REMOVE_TODO"; id: number }
//   | { type: "SET_FILTER"; payload: Filter }
//   | { type: "SET_SORT"; payload: Sort }
//   | { type: "EMPTY_REMOVED" }
//   | { type: "INIT_TODOS"; payload: Todo[] }
//   | { type: "START_EDIT"; id: number }
//   | { type: "CANCEL_EDIT"; id: number }
//   | { type: "SAVE_EDIT"; id: number; newValue: string; newDueDate?: string };
// types.ts

// タスクの定義
// export type Todo = {
//   id: string;
//   value: string;
//   checked: boolean;
//   removed: boolean;
//   createdAt: string; // ISO文字列など
//   dueDate: string | null;
// };

// // フィルターの種類
// export type FilterType = "all" | "checked" | "unchecked" | "removed";

// // ソートの種類
// export type SortBy = "created" | "due";

// // アクションの定義
// export type Action =
//   | { type: "ADD_TODO"; payload: { value: string; dueDate: string | null } }
//   | { type: "TOGGLE_TODO"; payload: string }
//   | { type: "REMOVE_TODO"; payload: string }
//   | { type: "RESTORE_TODO"; payload: string }
//   | { type: "DELETE_TODO"; payload: string }
//   | { type: "SET_FILTER"; payload: FilterType }
//   | { type: "SET_SORT"; payload: SortBy }
//   | { type: "EMPTY_REMOVED" };

// // 状態管理の定義
// export type State = {
//   todos: Todo[];
//   filter: FilterType;
//   sortBy: SortBy;
// };
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
