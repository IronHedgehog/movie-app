import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ThemeProvider from "./context/theme/ThemeProvider.jsx";
import { AppErrorBoundary } from "./shared/error-boundary";
import "./styles/tailwind.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AppErrorBoundary>
          <App />
        </AppErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
