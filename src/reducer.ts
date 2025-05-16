// import { State, Action } from "./types";

// export const todoReducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "ADD_TODO": {
//       const newTodo = {
//         id: Date.now(),
//         value: action.payload.value,
//         dueDate: action.payload.dueDate,
//         checked: false,
//         removed: false,
//       };
//       return { ...state, todos: [...state.todos, newTodo] };
//     }

//     case "UPDATE_TODO": {
//       return {
//         ...state,
//         todos: state.todos.map((todo) => (todo.id === action.payload.id ? { ...todo, ...action.payload } : todo)),
//       };
//     }

//     case "REMOVE_TODO": {
//       return {
//         ...state,
//         todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, removed: true } : todo)),
//       };
//     }

//     case "EMPTY_REMOVED": {
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => !todo.removed),
//       };
//     }

//     case "SET_FILTER": {
//       return { ...state, filter: action.payload };
//     }

//     case "SET_SORT": {
//       return { ...state, sortBy: action.payload };
//     }

//     case "INIT_TODOS": {
//       return { ...state, todos: action.payload };
//     }

//     case "START_EDIT": {
//       return {
//         ...state,
//         todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, isEditing: true } : todo)),
//       };
//     }

//     case "CANCEL_EDIT": {
//       return {
//         ...state,
//         todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, isEditing: false } : todo)),
//       };
//     }

//     case "SAVE_EDIT": {
//       console.log("SAVE_EDIT", action); // ← ここで undefined の原因を確認
//       if (typeof action.id !== "number") return state;

//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id
//             ? {
//                 ...todo,
//                 value: action.newValue,
//                 dueDate: action.newDueDate ?? todo.dueDate,
//                 isEditing: false,
//               }
//             : todo
//         ),
//       };
//     }

//     default:
//       return state;
//   }
// };
import { State, Action, Todo } from "./types";

export const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: Date.now(),
        value: action.payload.value,
        dueDate: action.payload.dueDate,
        checked: false,
        removed: false,
        createdAt: new Date().toISOString(),
      };
      return { ...state, todos: [...state.todos, newTodo] };
    }

    case "UPDATE_TODO": {
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload.id ? { ...todo, ...action.payload } : todo)),
      };
    }

    case "REMOVE_TODO": {
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, removed: true } : todo)),
      };
    }

    case "EMPTY_REMOVED": {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.removed),
      };
    }

    case "SET_FILTER": {
      return { ...state, filter: action.payload };
    }

    case "SET_SORT": {
      return { ...state, sortBy: action.payload };
    }

    case "INIT_TODOS": {
      return { ...state, todos: action.payload };
    }

    case "START_EDIT": {
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, isEditing: true } : todo)),
      };
    }

    case "CANCEL_EDIT": {
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, isEditing: false } : todo)),
      };
    }

    case "SAVE_EDIT": {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? {
                ...todo,
                value: action.newValue,
                dueDate: action.newDueDate ?? todo.dueDate,
                isEditing: false,
              }
            : todo
        ),
      };
    }

    default:
      return state;
  }
};
