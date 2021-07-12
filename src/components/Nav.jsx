import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

import { ReactComponent as Logo } from "../images/Logo.svg";
import { useIp } from "../contexts/IpContext";

const useStyles = createUseStyles((theme) => ({
  navContainer: {
    padding: "16px 50px",
    display: "flex",
    alignItems: "center",
  },
  countryContainer: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    "& img": {
      width: 40,
      height: 40,
      borderRadius: "50%",
    },
    alignItems: "center",
    gridGap: "20px",
  },
  navEndContainer: {
    "& button": {
      padding: "9px 24px",
      borderRadius: 7,
      fontSize: "0.9rem",
      fontWeight: 500,
      background: theme.color.main,
      color: theme.color.secondar,
      border: "none",
      transition: ".7s",
      "&:hover": {
        transform: "translateY(-4px)",
      },
    },
  },
}));

function Nav() {
  const classes = useStyles();
  const { ipData } = useIp();

  return (
    <nav className={classes.navContainer}>
      <div style={{ flexGrow: 1 }}>
        <Link to="/">
          <Logo width="45" height="50" viewBox="0 0 59 70" fill="#fff" />
        </Link>
      </div>
      <div className={classes.navEndContainer}>
        <button>Login / Signup</button>
      </div>
    </nav>
  );
}

export default Nav;
