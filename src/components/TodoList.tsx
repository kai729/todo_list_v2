import React, { useMemo } from "react";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
  filter: "ALL" | "DONE" | "UNDONE";
  dispatch: React.Dispatch<any>;
};

export const TodoList = ({ todos, filter, dispatch }: Props) => {
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "ALL") return true;
      if (filter === "DONE") return todo.checked && !todo.removed;
      if (filter === "UNDONE") return !todo.checked && !todo.removed;
      return false;
    });
  }, [todos, filter]);
  return filteredTodos.length === 0 ? (
    <p>タスクがありません</p>
  ) : (
    <ul>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
};
