// React
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import DeploymentTools from "./pages/DeploymentTools/DeploymentTools";

// Css
import "./index.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <DeploymentTools />
  </React.StrictMode>
);
