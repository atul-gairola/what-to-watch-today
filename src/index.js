import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "react-jss";

import "./index.css";

import App from "./App";
import { PreferenceProvider } from "./contexts/PrefernceContext";
import { ConfigProvider } from "./contexts/ConfigContext";
import { IpDataProvider } from "./contexts/IpContext";
import { AuthProvider } from "./contexts/AuthContext";
import { dark } from "./config/themes";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <IpDataProvider>
        <PreferenceProvider>
          <ConfigProvider>
            <Router>
              <ThemeProvider theme={dark}>
                <App />
              </ThemeProvider>
            </Router>
          </ConfigProvider>
        </PreferenceProvider>
      </IpDataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
