import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <button onClick={() => electron.notificationApi.sendNotifications("test")}>
      Notify
    </button>
  </React.StrictMode>
);
