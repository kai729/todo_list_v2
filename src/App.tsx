import { useState } from "react";
import { useTodoContext } from "./TodoContext";
import { usePersistedTodos } from "./usePersistedTodos";
import { useFilteredTodos } from "./useFilteredTodos";
import { TodoItem } from "./components/TodoItem";
import styles from "./App.module.css";
import { State, Action } from "./types";

export const App = () => {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { state, dispatch }: { state: State; dispatch: React.Dispatch<Action> } = useTodoContext();

  usePersistedTodos(state.todos, dispatch);
  const filteredTodos = useFilteredTodos(state.todos, state.filter, state.sortBy);

  const handleSubmit = () => {
    if (!text.trim()) return;
    dispatch({
      type: "ADD_TODO",
      payload: {
        value: text,
        dueDate: dueDate || null,
      },
    });
    setText("");
    setDueDate("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <select
          className={styles.select}
          defaultValue="all"
          // onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value })}
          onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value as FilterType })}
        >
          <option value="all">すべてのタスク</option>
          <option value="checked">完了したタスク</option>
          <option value="unchecked">現在のタスク</option>
          <option value="removed">ごみ箱</option>
        </select>

        <select
          className={styles.select}
          defaultValue="created"
          // onChange={(e) => dispatch({ type: "SET_SORT", payload: e.target.value })}
          onChange={(e) => dispatch({ type: "SET_SORT", payload: e.target.value as SortBy })}
        >
          <option value="created">作成日順</option>
          <option value="due">期日が近い順</option>
        </select>
      </div>

      {state.filter === "removed" ? (
        <button
          onClick={() => dispatch({ type: "EMPTY_REMOVED" })}
          disabled={state.todos.filter((t) => t.removed).length === 0}
        >
          ごみ箱を空にする
        </button>
      ) : (
        state.filter !== "checked" && (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              className={styles.input}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="タスクを入力"
              required
            />
            <input
              data-testid="due-date"
              className={styles.dateInput}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <input className={styles.submit} type="submit" value="追加" />
          </form>
        )
      )}

      <ul className={styles.todoList}>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
        ))}
      </ul>
    </div>
  );
};
