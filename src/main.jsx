import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import ChatWidget from "./components/AI/ChatWidget.jsx";
import ThemeProvider from "./context/theme/ThemeProvider.jsx";
import { AppErrorBoundary } from "./shared/error-boundary";
import { store } from "./store";
import "./styles/tailwind.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <AppErrorBoundary>
            <App />
            <ChatWidget />
          </AppErrorBoundary>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
