import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { App } from "../App";

// ここでdispatchを外部に作る（テストごとにリセットできるように）
const mockDispatch = vi.fn();

// TodoContextのモック作成
vi.mock("../TodoContext", () => ({
  useTodoContext: () => ({
    state: { todos: [], filter: "all", sortBy: "created" },
    dispatch: mockDispatch,
  }),
}));

// usePersistedTodos と useFilteredTodos のモック
vi.mock("../usePersistedTodos", () => ({
  usePersistedTodos: () => {},
}));

vi.mock("../useFilteredTodos", () => ({
  useFilteredTodos: (todos: any[], filter: string, sortBy: string) => todos,
}));

// TodoItemのモック（単純化）
vi.mock("../components/TodoItem", () => ({
  TodoItem: ({ todo }: { todo: any }) => <li>{todo.value}</li>,
}));

describe("App", () => {
  beforeEach(() => {
    mockDispatch.mockClear(); // 呼び出し履歴をテストごとにクリア
  });

  it("初期レンダリングでフィルターとソートのselectと追加フォームが表示される", () => {
    render(<App />);

    expect(screen.getByDisplayValue("すべてのタスク")).toBeInTheDocument();
    expect(screen.getByDisplayValue("作成日順")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("タスクを入力")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "追加" })).toBeInTheDocument();
  });

  it("タスク追加フォームに入力して追加ボタン押すとdispatchが呼ばれる", () => {
    render(<App />);

    const input = screen.getByPlaceholderText("タスクを入力");
    // 日付入力があればここで取得（なければ無視してOK）

    fireEvent.change(input, { target: { value: "新しいタスク" } });

    // ここはsubmitイベントをフォームに対して発火が安全ですが、ボタンクリックでもOK
    fireEvent.click(screen.getByRole("button", { name: "追加" }));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_TODO",
      payload: {
        value: "新しいタスク",
        dueDate: null,
      },
    });
  });
});
