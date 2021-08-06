import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";

import { ReactComponent as MovieIcon } from "../../../images/movieIcon.svg";
import { ReactComponent as ShowIcon } from "../../../images/showIcon.svg";

const useStyles = createUseStyles((theme) => ({
  container: {
    display: "flex",
    flexFlow: "column",
    placeContent: "center",
  },
  buttonContainer: {
    display: "grid",
    width: "100%",
    flexGrow: 1,
    gridTemplateColumns: "auto auto",
    placeContent: "center",
    gridGap: 200,
  },
  optionButton: {
    display: "grid",
    justifyItems: "center",
    cursor: "pointer",
    gridGap: 10,
    transition: "0.7s",
    "& p": {
      fontWeight: 500,
      fontSize: "2rem",
    },
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  selected: {
    transform: "scale(1.2)",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  [`@media (max-width: ${theme.viewports.smallTablet})`]: {
    buttonContainer: {
      display: "grid",
      width: "100%",
      flexGrow: 1,
      gridTemplateColumns: "auto",
      placeContent: "center",
      gridGap: 80,
    },
    optionButton: {
      display: "grid",
      justifyItems: "center",
      cursor: "pointer",
      gridGap: 10,
      transition: "0.7s",
      "& p": {
        fontWeight: 500,
        fontSize: "1rem",
      },
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
    selected: {
      transform: "scale(1.2)",
      "&:hover": {
        transform: "scale(1.2)",
      },
    },
  },
}));

function TypeOfContent({ type, setType, setSelectedGenres }) {
  const classes = useStyles();
  const theme = useTheme();

  const isSmallTablet = useMediaQuery({
    query: `(max-device-width: ${theme.viewports.smallTablet})`,
  });

  const handleClick = (type) => {
    setType(type);
    setSelectedGenres([]);
  };

  return (
    <section className={classes.container}>
      <div className={classes.buttonContainer}>
        <div
          onClick={() => handleClick("movie")}
          className={clsx(
            classes.optionButton,
            type === "movie" && classes.selected
          )}
        >
          <div>
            <MovieIcon
              width={isSmallTablet ? 100 : 183}
              fill={theme.color.main}
            />
          </div>
          <p>Movie</p>
        </div>
        <div
          onClick={() => handleClick("tv")}
          className={clsx(
            classes.optionButton,
            type === "tv" && classes.selected
          )}
        >
          <div>
            <ShowIcon
              width={isSmallTablet ? 100 : 208}
              fill={theme.color.main}
            />
          </div>
          <p>Show</p>
        </div>
      </div>
    </section>
  );
}

export default TypeOfContent;
