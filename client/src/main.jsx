import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";

import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import ErrorFallback from "./components/ErrorFallback.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <BrowserRouter>
        <HeroUIProvider>
          <ToastProvider
            placement="top-right"
            toastOffset={10}
            duration={1000}
          />
          <App />
        </HeroUIProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
