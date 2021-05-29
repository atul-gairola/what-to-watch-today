import { useEffect } from "react";
import "./App.css";
import axios from "axios";

import { usePreference } from "./contexts/PrefernceContext";
import Genres from "./components/Genres";

function App() {
  const { preferences } = usePreference();
  console.log(preferences);

  return (
    <div className="App">
      <header className="App-header">What do you wanna watch today ?</header>
      <div>
        <label for="show-radio">Show</label>
        <input type="radio" name="typeOfContent" id="show-radio" value="show" />
        <label for="movie-radio">Movie</label>
        <input
          type="radio"
          name="typeOfContent"
          id="movie-radio"
          value="movie"
          checked
        />
      </div>
      <Genres />
    </div>
  );
}

export default App;
