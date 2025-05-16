import { useMemo } from "react";
import { Todo, Filter, SortBy } from "./types";

export const useFilteredTodos = (todos: Todo[], filter: Filter, sortBy: SortBy): Todo[] => {
  return useMemo(() => {
    let filtered = todos;

    // フィルター処理
    if (filter === "checked") {
      filtered = todos.filter((todo) => todo.checked && !todo.removed);
    } else if (filter === "unchecked") {
      filtered = todos.filter((todo) => !todo.checked && !todo.removed);
    } else if (filter === "removed") {
      filtered = todos.filter((todo) => todo.removed);
    } else {
      filtered = todos.filter((todo) => !todo.removed);
    }

    // 並び替え処理
    if (sortBy === "due") {
      filtered = [...filtered].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    } else {
      filtered = [...filtered].sort((a, b) => b.id - a.id); // 作成順（降順）
    }

    return filtered;
  }, [todos, filter, sortBy]);
};
