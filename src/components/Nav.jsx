import React from "react";
import { Link } from "react-router-dom";
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
        <Link to="/">
          <Logo width="49" height="60" viewBox="0 0 59 70" fill="#fff" />
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
