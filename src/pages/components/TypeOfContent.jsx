import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({});

function TypeOfContent() {
  const classes = useStyles();

  return (
    <div>
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

export default TypeOfContent;
