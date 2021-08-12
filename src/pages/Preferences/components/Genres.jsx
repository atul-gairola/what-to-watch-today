import React from "react";
import { createUseStyles } from "react-jss";

import GenreButton from "./GenreButton";

const useStyles = createUseStyles((theme) => ({
  container: {
    display: "grid",
    alignContent: "center",
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
    overflow: "auto",
    placeContent: "center",
  },
  [`@media (max-width: ${theme.viewports.tablet})`]: {
    container: {
      marginTop: 40,
      display: "block",
    },
    buttonContainer: {
      placeContent: "normal",
      justifyContent: "center",
      height: "50vh",
      padding: "10px 0"
    },
  },
}));

function Genres({ genreList, setSelectedGenres, selectedGenres }) {
  const classes = useStyles();

  const handleClick = (e) => {
    const { name: id } = e.target;

    function removeGenre(id) {
      setSelectedGenres((prev) => {
        const a = [...prev];
        const i = a.indexOf(id);
        a.splice(i, 1);
        return a;
      });
      console.log("remove: ", id);
    }

    function addGenre(id) {
      setSelectedGenres((prev) => [...prev, id]);
      console.log("add: ", id);
    }

    selectedGenres.indexOf(id) !== -1 ? removeGenre(id) : addGenre(id);
  };

  return (
    <section className={classes.container}>
      <div className={classes.buttonContainer}>
        {genreList.length > 0 &&
          genreList.map((cur, i) => (
            <GenreButton
              key={i}
              genre={cur}
              handleClick={handleClick}
              selectedGenres={selectedGenres}
            />
          ))}
      </div>
    </section>
  );
}

export default Genres;
