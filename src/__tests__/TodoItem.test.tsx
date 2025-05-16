import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../components/TodoItem";
import { Todo } from "../types";
import { vi } from "vitest";

describe("TodoItem", () => {
  const mockDispatch = vi.fn();

  const baseTodo: Todo = {
    id: 1,
    value: "Test Task",
    checked: false,
    removed: false,
    isEditing: false,
    createdAt: new Date().toISOString(), // string 型として渡す
    dueDate: "2025-06-01",
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it("renders todo text and due date", () => {
    render(<TodoItem todo={baseTodo} dispatch={mockDispatch} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText(/期日: 2025\/6\/1/)).toBeInTheDocument();
  });

  it("dispatches UPDATE_TODO when checkbox is clicked", () => {
    render(<TodoItem todo={baseTodo} dispatch={mockDispatch} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_TODO",
      payload: { id: baseTodo.id, checked: true },
    });
  });

  it("dispatches START_EDIT when 編集 button is clicked", () => {
    render(<TodoItem todo={baseTodo} dispatch={mockDispatch} />);
    const editButton = screen.getByText("編集");
    fireEvent.click(editButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "START_EDIT",
      id: baseTodo.id,
    });
  });

  it("dispatches UPDATE_TODO when 削除 button is clicked", () => {
    render(<TodoItem todo={baseTodo} dispatch={mockDispatch} />);
    const deleteButton = screen.getByText("削除");
    fireEvent.click(deleteButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "UPDATE_TODO",
      payload: { id: baseTodo.id, removed: true },
    });
  });

  it("renders input fields when in editing mode", () => {
    const editingTodo = { ...baseTodo, isEditing: true };
    render(<TodoItem todo={editingTodo} dispatch={mockDispatch} />);
    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2025-06-01")).toBeInTheDocument();
  });
});
