// import { render, screen } from "@testing-library/react";
// import { TodoList } from "../components/TodoList";
// import { vi } from "vitest";

// vi.mock("../components/TodoItem", () => ({
//   TodoItem: ({ todo }: { todo: any }) => {
//     return <li>{todo.value}</li>; // ← 表示されるように！
//   },
// }));

// describe("TodoList", () => {
//   it("タスクがないとき「タスクがありません」と表示される", () => {
//     render(<TodoList todos={[]} filter="ALL" dispatch={() => {}} />);
//     expect(screen.getByText("タスクがありません")).toBeInTheDocument();
//   });

//   it("タスクがあるとき TodoItem が表示される", () => {
//     const todos = [
//       { id: 1, value: "テストタスク1", dueDate: null, done: false, createdAt: "2025-05-15" },
//       { id: 2, value: "テストタスク2", dueDate: null, done: false, createdAt: "2025-05-15" },
//     ];

//     render(<TodoList todos={todos} filter="ALL" dispatch={() => {}} />);

//     expect(screen.getByText("テストタスク1")).toBeInTheDocument();
//     expect(screen.getByText("テストタスク2")).toBeInTheDocument();
//   });
// });
import { render, screen } from "@testing-library/react";
import { TodoList } from "../components/TodoList";
import { Todo } from "../types";
import { vi } from "vitest"; // ★追加

const todos: Todo[] = [
  {
    id: 1,
    value: "テスト",
    dueDate: null,
    checked: false,
    removed: false,
    isEditing: false,
    createdAt: Date.now(), // ★必須プロパティ追加
  },
];

test("タスクがあるとき TodoItem が表示される", () => {
  render(
    <TodoList
      todos={todos}
      dispatch={vi.fn()}
      filter="all" // ★Propsで必要なら追加
      sortBy="created" // 必要に応じて追加
    />
  );
  expect(screen.getByText("テスト")).toBeInTheDocument();
});
