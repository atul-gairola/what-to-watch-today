import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";

import { usePreference } from "./contexts/PrefernceContext";
import Home from "./pages/Home/Home";
import Result from "./pages/Result/Result";

function App() {
  const { preferences } = usePreference();
  console.log(preferences);

  useEffect(() => {
    const fetchLocation = async () => {
      const { data } = await axios.get("http://ip-api.com/json");
      console.log(data);
      localStorage.setItem(
        "country",
        JSON.stringify({ country: data.country, countryCode: data.countryCode })
      );
    };

    fetchLocation();
  }, []);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/watch-today/:type/:id" component={Result} />
    </Switch>
  );
}

export default App;
