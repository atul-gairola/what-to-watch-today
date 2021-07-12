import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  wrapper: {
    position: "absolute",
  },
});

function Hero() {
  const classes = useStyles();
  return <section className={classes.wrapper}></section>;
}

export default Hero;
