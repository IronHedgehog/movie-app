import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ChatWidget from "./components/AI/ChatWidget.jsx";
import { AppProviders } from "./providers/AppProviders.jsx";
import "./styles/tailwind.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
      <ChatWidget />
    </AppProviders>
  </StrictMode>,
);
