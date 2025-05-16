// import { useEffect } from "react";
// import { Todo, Action } from "./types";

// const STORAGE_KEY = "todos_v3";

// export const usePersistedTodos = (todos: Todo[], dispatch: React.Dispatch<Action>) => {
//   // 初回マウント時にローカルストレージから読み込む
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) {
//       try {
//         const parsed = JSON.parse(saved) as Todo[];
//         dispatch({ type: "INIT_TODOS", payload: parsed });
//       } catch (e) {
//         console.error("データの読み込みに失敗しました", e);
//       }
//     }
//   }, [dispatch]);

//   // todos が更新されるたびに保存
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
//   }, [todos]);
// };

import { useEffect } from "react";
import localforage from "localforage";
import { Todo } from "./types";

const STORAGE_KEY = "todos";

export const usePersistedTodos = (todos: Todo[], dispatch: React.Dispatch<any>) => {
  // タスクの保存
  useEffect(() => {
    localforage.setItem(STORAGE_KEY, todos).catch((err) => {
      console.error("タスクの保存に失敗しました:", err);
    });
  }, [todos]);

  // タスクの読み込み（初回のみ）
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await localforage.getItem<Todo[]>(STORAGE_KEY);
        if (savedTodos && Array.isArray(savedTodos)) {
          dispatch({ type: "INIT_TODOS", payload: savedTodos });
        }
      } catch (err) {
        console.error("保存されたタスクの読み込みに失敗しました:", err);
      }
    };
    loadTodos();
  }, [dispatch]);
};
