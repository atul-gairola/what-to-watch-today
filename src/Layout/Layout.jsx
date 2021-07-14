import React from "react";
import { createUseStyles } from "react-jss";

import Nav from "../components/Nav";

const useStyles = createUseStyles({
  wrapper: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    minHeight: "100vh"
  },
  container: {
    padding: "50px",
    height: "100%",
  },
});

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