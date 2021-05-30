// pacakges
import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";

// internal imports
import { usePreference } from "../../../contexts/PrefernceContext";
import endpoints from "../../../endpoints";

const useStyles = makeStyles({
  genreButton: {
    padding: "15px 25px",
    borderRadius: "50px",
    fontSize: "1.3rem",
    background: "none",
    cursor: "pointer",
    transition: ".5s",
  },
  genreContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(235px, 1fr))",
    gridGap: "30px",
  },
  genreWrapper: {
    width: "100%",
    padding: "0 100px",
  },
});

function GenreButton({ name, id }) {
  const classes = useStyles();

  return (
    <button className={classes.genreButton} data-genre-id={id}>
      {name}
    </button>
  );
}

function Genres() {
  const classes = useStyles();

  const {
    preferences: { typeOfContent },
  } = usePreference();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      let endpoint =
        typeOfContent === "movie"
          ? endpoints.getMovieGenres
          : endpoints.getShowGenres;

      const { data } = await axios.get(endpoint);

      setGenres(data.genres);
    };

    if (typeOfContent) {
      fetchGenres();
    }
  }, [typeOfContent]);

  return (
    <div className={classes.genreWrapper}>
      <div className={classes.genreContainer}>
        {genres.map((cur) => (
          <GenreButton name={cur.name} id={cur.id} key={cur.id} />
        ))}
      </div>
    </div>
  );
}

export default Genres;
