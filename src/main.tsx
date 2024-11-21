import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./fonts.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
);
