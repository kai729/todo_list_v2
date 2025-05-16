import { render, screen } from "@testing-library/react";
import { TodoList } from "../components/TodoList";
import { Todo } from "../types";
import { vi } from "vitest";

const todos: Todo[] = [
  {
    id: 1,
    value: "テスト",
    dueDate: null,
    checked: false,
    removed: false,
    isEditing: false,
    createdAt: new Date().toISOString(), // ← string に変更
  },
];

test("タスクがあるとき TodoItem が表示される", () => {
  render(
    <TodoList
      todos={todos}
      dispatch={vi.fn()}
      filter="ALL" // sortBy は不要
    />
  );
  expect(screen.getByText("テスト")).toBeInTheDocument();
});
