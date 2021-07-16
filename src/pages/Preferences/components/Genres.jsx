import React, { useEffect, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import axios from "axios";

const useStyles = createUseStyles((theme) => ({
  container: {
    "& > h3": {
      fontSize: "2.5rem",
      textAlign: "center",
      marginBottom: 50,
    },
  },
  buttonContainer: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 250px))",
    gridColumnGap: 50,
    gridRowGap: 20,
    placeContent: "center",
  },
  button: {
    color: theme.color.main,
    borderRadius: 50,
    padding: "14px 20px",
    background: "transparent",
    fontWeight: 500,
    transition: "0.2s",
    fontSize: 18,
    border: "2px solid " + theme.color.main,
    "&:hover": {
      background: theme.color.main,
      color: theme.color.secondary,
    },
  },
}));

function Genres({ userPreferences, setUserPreferences }) {
  const [genres, setGenres] = useState([]);

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${userPreferences.type}/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );

      console.log(data);
      setGenres(data.genres);
    };

    fetchData();
  }, []);

  function GenreButton({ genre, ...props }) {
    const { id, name } = genre;
    return (
      <button {...props} className={classes.button} name={id}>
        {name}
      </button>
    );
  }

  return (
    <section className={classes.container}>
      <h3>Choose the mood</h3>
      <div className={classes.buttonContainer}>
        {genres.length > 0 &&
          genres.map((cur, i) => <GenreButton key={i} genre={cur} />)}
      </div>
    </section>
  );
}

export default Genres;
