import { Switch, Route } from "react-router-dom";
import { createUseStyles } from "react-jss";

import { usePreference } from "./contexts/PrefernceContext";
import Home from "./pages/Home/Home";
import Result from "./pages/Result/Result";

const useStyles = createUseStyles((theme) => ({
  body: {
    background: theme.color.secondary,
    color: theme.color.textPrimary,
  },
}));

function App() {
  const { preferences } = usePreference();
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/watch-today/:type/:id" component={Result} />
      </Switch>
    </div>
  );
}

export default App;
