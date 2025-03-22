import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UseAuthProvider } from "./Context/UseAuthProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UseAuthProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </UseAuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
