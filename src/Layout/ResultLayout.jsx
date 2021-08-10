import React from "react";
import { createUseStyles } from "react-jss";

import Nav from "../components/Nav";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: "grid",
    minHeight: "100vh",
  },
  nav: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  //   container: {
  //     padding: "50px",
  //     height: "100%",
  //   },

  [`@media(max-width: 400px)`]: {
    container: {
      padding: "30px",
    },
  },
  [`@media(max-width: 300px)`]: {
    container: {
      padding: "20px",
    },
  },
}));

function ResultLayout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.nav}>
        <Nav />
      </div>
      <div className={classes.container}>{children}</div>
    </div>
  );
}

export default ResultLayout;
