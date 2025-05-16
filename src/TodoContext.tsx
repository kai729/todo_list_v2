// import React, { createContext, useReducer, useContext } from "react";
// import { State, Action } from "./types";
// import { todoReducer } from "./reducer";

// const initialState: State = {
//   todos: [],
//   filter: "all",
//   sortOrder: "asc", // デフォルトは昇順
// };

// const TodoContext = createContext<{
//   state: State;
//   dispatch: React.Dispatch<Action>;
// }>({
//   state: initialState,
//   dispatch: () => {},
// });

// export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, dispatch] = useReducer(todoReducer, initialState);
//   return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
// };

// export const useTodoContext = () => useContext(TodoContext);

import { createContext, useContext, useReducer } from "react";
import { Todo, Filter, SortBy } from "./types";
import { todoReducer } from "./reducer";

type State = {
  todos: Todo[];
  filter: Filter;
  sortBy: SortBy;
};

const initialState: State = {
  todos: [],
  filter: "all",
  sortBy: "created",
};

const TodoContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);
