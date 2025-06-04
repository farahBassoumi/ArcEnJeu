import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n/config";
import { UserProvider } from "./utils/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <UserProvider>
    <App />
  </UserProvider>
  //</StrictMode>,
);
