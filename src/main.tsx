import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.tsx";
import CartProvider from "./providers/CartProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <div className="">
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </StrictMode>
  </div>
);
