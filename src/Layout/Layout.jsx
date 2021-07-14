import React from "react";
import { createUseStyles } from "react-jss";

import Nav from "../components/Nav";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    minHeight: "100vh",
  },
  container: {
    padding: "50px",
    height: "100%",
  },

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

function Layout({ children }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Nav />
      <div className={classes.container}>{children}</div>
    </div>
  );
}

export default Layout;
