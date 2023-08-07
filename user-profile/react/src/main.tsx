import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./app.css";
import { AuthProvider } from "./lib/AuthProvider";
import { supabase } from "./lib/db";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider supabaseClient={supabase}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
