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
        <Logo width="59" height="70" viewBox="0 0 59 70" fill="#fff" />
      </div>
    </nav>
  );
}

export default Nav;
