import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { createUseStyles } from "react-jss";
import axios from "axios";

import Home from "./pages/Home/Home";
import Result from "./pages/Result/Result";
import Preferences from "./pages/Preferences/Preferences";

const useStyles = createUseStyles((theme) => ({
  body: {
    background: theme.color.secondary,
    color: theme.color.textPrimary,
  },
}));

function App() {
  const classes = useStyles();

  useEffect(() => {
    async function getIpData() {
      const { data } = await axios.get("http://ip-api.com/json");
      localStorage.setItem(
        "location",
        JSON.stringify({
          country: data.country,
          countryCode: data.countryCode,
        })
      );
    }

    getIpData();
    return () => {};
  }, []);

  return (
    <div className={classes.body}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/set-preferences" exact component={Preferences} />
        <Route path="/watch-today/:type/:id" component={Result} />
      </Switch>
    </div>
  );
}

export default App;
