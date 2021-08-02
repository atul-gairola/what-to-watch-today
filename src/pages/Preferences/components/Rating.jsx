import React from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  container: {
    display: "grid",
    placeContent: "center",
    gridGap: 100,
    "& > h3": {
      fontSize: "2.5rem",
    },
  },

  rangeInput: {
    appearance: "none",
    width: "100%",
    background: "transparent",
    // styling thumb
    "&::-webkit-slider-thumb": {
      appearance: "none",
      border: "1px solid #fff",
      height: 36,
      width: 16,
      borderRadius: 3,
      background: "#fff",
      cursor: "pointer",
      marginTop: -14,
    },
    "&::-moz-range-thumb": {
      border: "1px solid #fff",
      height: 36,
      width: 16,
      borderRadius: 3,
      background: "#fff",
      cursor: "pointer",
      marginTop: -14,
    },
    "&::-ms-thumb": {
      border: "1px solid #fff",
      height: 36,
      width: 16,
      borderRadius: 3,
      background: "#fff",
      cursor: "pointer",
      //   marginTop: -14,
    },
    // styling track
    "&::-webkit-slider-runnable-track": {
      width: "100%",
      height: 8.4,
      cursor: "pointer",
      background: theme.color.main,
      borderRadius: 1.3,
    },
    "&:focus::-webkit-slider-runnable-track": {
      background: "#367ebd",
    },
    "&::-moz-range-track": {
      width: "100%",
      height: 8.4,
      cursor: "pointer",
      background: theme.color.main,
      borderRadius: 1.3,
    },
    "&::-ms-track": {
      width: "100%",
      height: 8.4,
      cursor: "pointer",
      background: "transparent",
      borderColor: "transparent",
      color: "transparent",
    },
  },
}));

function Rating({ userPreferences, setUserPreferences }) {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    setUserPreferences((prev) => ({
      ...prev,
      rating: Math.round(value),
    }));
  };

  return (
    <section className={classes.container}>
      <h3>Choose ratings range</h3>
      <input
        className={classes.rangeInput}
        min={0}
        max={10}
        step="0.01"
        value={userPreferences.rating}
        onChange={handleChange}
        type="range"
        name="rating"
      />
    </section>
  );
}

export default Rating;
