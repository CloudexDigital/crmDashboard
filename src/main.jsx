import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" 
     appearance={{
        variables: {
          colorPrimary: "#6466F1",  // Your purple
          colorBackground: "#ffffff",
          colorText: "#374151",     // Gray-700
          fontFamily: "Inter, sans-serif",
          borderRadius: "10px",
        },
        elements: {
          card: {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            padding: "2rem",
          },
        },
      }}
      >
      <App />
    </ClerkProvider>
  </StrictMode>
);
