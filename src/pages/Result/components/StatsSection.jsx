import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  section: {
    marginTop: 50,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridRowGap: 10,
    gridColumnGap: 30,
    marginTop: 10,
  },
  stat: {
    "& > h4": {
      fontWeight: 600,
      fontSize: 16,
      textTransform: "capitalize",
    },
    "& > p": {
      fontSize: 20,
      fontWeight: 300,
    },
  },
}));

function Stat({ details, title }) {
  const classes = useStyles();
  return (
    <div className={classes.stat}>
      <h4>{title.split("_").join(" ")}</h4>
      <p>{details[title]}</p>
    </div>
  );
}

function StatsSection({ details, type }) {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h2>Stats</h2>
      <div className={classes.container}>
        {type === "movie" ? (
          <Stat details={details} title="status" />
        ) : (
          <Stat details={details} title="status" />
        )}
        {type === "movie" ? (
          <Stat details={details} title="release_date" />
        ) : (
          <Stat details={details} title="first_air_date" />
        )}
        {type === "movie" ? (
          <Stat details={details} title="budget" />
        ) : (
          <Stat details={details} title="number_of_seasons" />
        )}
        {type === "movie" ? (
          <Stat details={details} title="revenue" />
        ) : (
          <Stat details={details} title="number_of_episodes" />
        )}
      </div>
    </div>
  );
}

export default StatsSection;
