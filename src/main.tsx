import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "./components/ui/sonner.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <div className="">
    <StrictMode>
      <AuthProvider>
        {/* <RouterProvider router={router} /> */}
        <App />
        <Toaster />
      </AuthProvider>
    </StrictMode>
  </div>
);
