import { render, screen } from "@testing-library/react";
import { TodoList } from "../components/TodoList";
import { vi } from "vitest";

vi.mock("../components/TodoItem", () => ({
  TodoItem: ({ todo }: { todo: any }) => {
    return <li>{todo.value}</li>; // ← 表示されるように！
  },
}));

describe("TodoList", () => {
  it("タスクがないとき「タスクがありません」と表示される", () => {
    render(<TodoList todos={[]} filter="ALL" dispatch={() => {}} />);
    expect(screen.getByText("タスクがありません")).toBeInTheDocument();
  });

  it("タスクがあるとき TodoItem が表示される", () => {
    const todos = [
      { id: 1, value: "テストタスク1", dueDate: null, done: false, createdAt: "2025-05-15" },
      { id: 2, value: "テストタスク2", dueDate: null, done: false, createdAt: "2025-05-15" },
    ];

    render(<TodoList todos={todos} filter="ALL" dispatch={() => {}} />);

    expect(screen.getByText("テストタスク1")).toBeInTheDocument();
    expect(screen.getByText("テストタスク2")).toBeInTheDocument();
  });
});
