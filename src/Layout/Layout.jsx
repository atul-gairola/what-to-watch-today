import React from "react";
import { makeStyles } from "@material-ui/styles";

import Nav from "../components/Nav";

const useStyles = makeStyles({
  container: {
    padding: "50px",
  },
});

function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <Nav />
      <div className={classes.container}>{children}</div>
    </div>
  );
}

export default Layout;
