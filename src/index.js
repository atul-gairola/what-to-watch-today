import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";

import App from "./App";
import { PreferenceProvider } from "./contexts/PrefernceContext";
import { ConfigProvider } from "./contexts/ConfigContext";

ReactDOM.render(
  <React.StrictMode>
    <PreferenceProvider>
      <ConfigProvider>
        <Router>
          <App />
        </Router>
      </ConfigProvider>
    </PreferenceProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
