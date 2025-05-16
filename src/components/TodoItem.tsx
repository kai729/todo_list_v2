import React from "react";
import { useState } from "react";
import { Todo } from "../types";
import styles from "../App.module.css";

type Props = {
  todo: Todo;
  dispatch: React.Dispatch<any>;
};

//usememo
const TodoItemComponent = ({ todo, dispatch }: Props) => {
  const [editText, setEditText] = useState(todo.value);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

  return (
    <li className={styles.todoItem}>
      <input
        className={styles.checkbox}
        type="checkbox"
        disabled={todo.removed}
        checked={todo.checked}
        onChange={() =>
          dispatch({
            type: "UPDATE_TODO",
            payload: {
              id: todo.id,
              checked: !todo.checked,
            },
          })
        }
      />

      {todo.isEditing ? (
        <>
          <input type="text" value={editText || ""} onChange={(e) => setEditText(e.target.value)} />
          {<input type="date" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} />}
          <button
            onClick={() => {
              dispatch({
                type: "SAVE_EDIT",
                id: todo.id,
                newValue: (editText ?? "").trim() === "" ? todo.value : editText,
                newDueDate: editDueDate,
              });
              setEditText("");
              setEditDueDate("");
            }}
          >
            保存
          </button>
          <button
            onClick={() => {
              dispatch({ type: "CANCEL_EDIT", id: todo.id });
              setEditText("");
            }}
          >
            キャンセル
          </button>
        </>
      ) : (
        <>
          <span>{todo.value}</span>
          {todo.dueDate && (
            <span className={styles.dueDate}>（期日: {new Date(todo.dueDate).toLocaleDateString()}）</span>
          )}
          <button
            onClick={() => {
              dispatch({ type: "START_EDIT", id: todo.id });
              setEditText(todo.value);
            }}
          >
            編集
          </button>
        </>
      )}

      <button
        onClick={() =>
          dispatch({
            type: "UPDATE_TODO",
            payload: {
              id: todo.id,
              removed: !todo.removed,
            },
          })
        }
      >
        {todo.removed ? "復元" : "削除"}
      </button>
    </li>
  );
};

export const TodoItem = React.memo(TodoItemComponent);
