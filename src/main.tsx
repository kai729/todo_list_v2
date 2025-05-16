import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";
import { TodoProvider } from "./TodoContext";
import "./index.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </StrictMode>
);
