import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "react-jss";

import "./index.css";

import App from "./App";
import { ConfigProvider } from "./contexts/ConfigContext";
import { AuthProvider } from "./contexts/AuthContext";
import { dark } from "./config/themes";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={dark}>
      <AuthProvider>
        <ConfigProvider>
          <Router basename="/what-to-watch-today">
            <App />
          </Router>
        </ConfigProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
