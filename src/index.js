import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PreferenceProvider } from "./contexts/PrefernceContext";

ReactDOM.render(
  <React.StrictMode>
    <PreferenceProvider>
      <App />
    </PreferenceProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
