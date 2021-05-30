import { Switch, Route } from "react-router-dom";

import "./App.css";

import { usePreference } from "./contexts/PrefernceContext";
import Home from "./pages/Home";


function App() {
  const { preferences } = usePreference();
  console.log(preferences);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  );
}

export default App;
