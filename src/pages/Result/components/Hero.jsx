import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  wrapper: {
    position: "absolute",
  },
});

function Hero() {
  const classes = useStyles();
  return <section className={classes.wrapper}></section>;
}

export default Hero;
