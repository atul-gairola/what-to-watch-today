import React from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

const useStyles = createUseStyles((theme) => ({
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

function GenreButton({ genre, handleClick, selectedGenres }) {
  const classes = useStyles();
  const { id, name } = genre;
  return (
    <button
      onClick={handleClick}
      className={clsx(
        classes.button,
        selectedGenres.indexOf(String(id)) !== -1 && classes.selected
      )}
      name={id}
    >
      {name}
    </button>
  );
}

export default GenreButton;
