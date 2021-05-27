import { useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=59c3960b67ab82984a2e267ccd195cc6"
        );
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

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
    </div>
  );
}

export default App;
