import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Proyavys } from "./UI/pages/Proyavys";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Proyavys />
  </StrictMode>,
);
