import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";

import { usePreference } from "./contexts/PrefernceContext";
import Home from "./pages/Home";

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
    </Switch>
  );
}

export default App;
