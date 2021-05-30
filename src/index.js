import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";

import App from "./App";
import { PreferenceProvider } from "./contexts/PrefernceContext";

ReactDOM.render(
  <React.StrictMode>
    <PreferenceProvider>
      <Router>
        <App />
      </Router>
    </PreferenceProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
