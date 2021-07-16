import React from "react";
import { createUseStyles, useTheme } from "react-jss";

import { ReactComponent as MovieIcon } from "../../../images/movieIcon.svg";
import { ReactComponent as ShowIcon } from "../../../images/showIcon.svg";

const useStyles = createUseStyles({
  container: {
    display: "grid",
    placeContent: "center",
    gridGap: 100,
    "& > h3": {
      fontSize: "2.5rem",
    },
  },
  buttonContainer: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "auto auto",
    placeContent: "center",
    gridGap: 200,
  },
  optionButton: {
    display: "grid",
    justifyItems: "center",
    cursor: "pointer",
    gridGap: 10,
    "& p": {
      fontWeight: 500,
      fontSize: "2rem",
    },
  },
});

function TypeOfContent() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <section className={classes.container}>
      <h3>Which content type do you feel like watching today?</h3>
      <div className={classes.buttonContainer}>
        <div className={classes.optionButton}>
          <div>
            <MovieIcon width={183} fill={theme.color.main} />
          </div>
          <p>Movie</p>
        </div>
        <div className={classes.optionButton}>
          <div>
            <ShowIcon width={208} fill={theme.color.main} />
          </div>
          <p>Show</p>
        </div>
      </div>
    </section>
  );
}

export default TypeOfContent;
