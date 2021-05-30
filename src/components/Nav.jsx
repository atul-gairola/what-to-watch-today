import React from "react";
import { ReactComponent as Logo } from "../images/Logo.svg";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  navContainer: {
    padding: "20px 50px",
  },
});

function Nav() {
  const classes = useStyles();

  return (
    <nav className={classes.navContainer}>
      <div>
        <Logo />
      </div>
    </nav>
  );
}

export default Nav;
