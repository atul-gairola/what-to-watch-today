import clsx from "clsx";
import React from "react";
import { createUseStyles, useTheme } from "react-jss";

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
  selected: {
    background: theme.color.main,
    color: theme.color.secondary,
    transform: "scale(1.1)",
  },
}));

function GenreButton({ genre, selectedGenres, setSelectedGenres, ...props }) {
  const classes = useStyles();
  const { id, name } = genre;

  const handleClick = (e) => {
    const { name: id } = e.target;

    function removeGenre(id) {
      const i = selectedGenres.indexOf(id);
      setSelectedGenres((prev) => {
        const arr = prev;
        arr.splice(i, 1);
        return arr;
      });
    }

    function addGenre(id) {
      setSelectedGenres((prev) => {
        const arr = prev;
        arr.push(id);
        return arr;
      });
    }

    selectedGenres.indexOf(id) !== -1 ? removeGenre(id) : addGenre(id);
  };

  console.log(selectedGenres);

  return (
    <button
      onClick={handleClick}
      className={clsx(
        classes.button,
        selectedGenres.indexOf(id) !== -1 && classes.selected
      )}
      name={id}
    >
      {name}
    </button>
  );
}

function Genres({ genreList, setSelectedGenres, selectedGenres }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <section className={classes.container}>
      <h3>Choose the mood</h3>
      <div className={classes.buttonContainer}>
        {genreList.length > 0 &&
          genreList.map((cur, i) => (
            <GenreButton
              key={i}
              genre={cur}
              selectedGenres={selectedGenres}
              setSelectedGenres={setSelectedGenres}
            />
          ))}
      </div>
    </section>
  );
}

export default Genres;
