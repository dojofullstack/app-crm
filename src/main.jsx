import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Rutas from "./Rutas";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./Context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Rutas />
    </ThemeProvider>
  </StrictMode>
);
