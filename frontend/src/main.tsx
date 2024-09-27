import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource-variable/open-sans";
import "@fontsource/fredoka-one";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </StrictMode>
  </QueryClientProvider>
);
