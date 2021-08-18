import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../images/Logo.svg";
import { ReactComponent as GithubIcon } from "../images/githubIcon.svg";
import { ReactComponent as LinkedInIcon } from "../images/linkedInIcon.svg";
import { ReactComponent as TwitterIcon } from "../images/twitterIcon.svg";

const useStyles = createUseStyles((theme) => ({
  footer: {
    background: theme.color.secondary,
    color: theme.color.main,
    borderTop: `1px solid ${theme.color.main}`,
  },
  container: {
    width: "100%",
    height: "100%",
    padding: "20px 50px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  logoContainer: {
    "&  h3": {
      marginLeft: 10,
    },
    "& > a": {
      color: "inherit",
      textDecoration: "inherit",
      display: "inline-flex",
      alignItems: "center",
    },
    flexGrow: 1,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    "& > a": {
      marginRight: 30,
      transition: "0.7s",
      "&:hover": {
        transform: "translateY(-10px)",
      },
    },
  },
  credits: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  [`@media(max-width: 850px)`]: {
    container: {
      flexDirection: "column",
      justifyItems: "center",
    },
    credits: {
      margin: "20px 0",
      position: "relative",
      left: "0%",
      top: "0%",
      transform: "none",
    },
    buttonContainer: {
      display: "grid",
      gridTemplateColumns: "auto auto auto",
      alignItems: "center",
      justifyContent: "center",
      justifyItems: "center",
      transform: "translateX(10px)",
    },
    logoContainer: {
      "&  h3": {
        marginLeft: 0,
      },
      "& > a": {
        display: "grid",
        justifyItems: "center",
        gridGap: 10,
      },
    },
  },
  [`@media(max-width: 370px)`]: {
    container: {
      padding: "10px 50px",
    },
  },
}));

function Footer() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <Link to="/">
            <Logo width="45" height="50" viewBox="0 0 59 70" fill="#fff" />
            <h3>what2watchtoday</h3>
          </Link>
        </div>
        <p className={classes.credits}>
          Made with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/atul-gairola-06875319b/"
            target="_blank"
            style={{
              fontWeight: "bold",
              color: "inherit",
              textDecoration: "inherit",
            }}
          >
            Atul Gairola
          </a>
        </p>{" "}
        <div className={classes.buttonContainer}>
          <a href="https://github.com/atul-gairola" target="_blank">
            <GithubIcon width={30} height={30} fill={theme.color.main} />
          </a>
          <a
            href="https://www.linkedin.com/in/atul-gairola-06875319b/"
            target="_blank"
          >
            {" "}
            <LinkedInIcon width={30} height={30} fill={theme.color.main} />
          </a>
          <a href="https://twitter.com/atul__gairola" target="_blank">
            {" "}
            <TwitterIcon width={30} height={30} fill={theme.color.main} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
