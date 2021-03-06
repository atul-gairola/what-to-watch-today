import React from "react";
import { createUseStyles } from "react-jss";

import { ReactComponent as Logo } from "../images/Logo.svg";

const useStyles = createUseStyles({
  container: {
    display: "grid",
    placeContent: "center",
    color: "#fff",
    fontWeight: 400,
    height: "100%",
  },
  svg: {
    animation: "$bounce 2s ease-in-out alternate infinite",
  },
  "@keyframes bounce": {
    "0%": {
      transform: "translateY(0px)",
    },

    "50%": {
      transform: "translateY(-20px)",
    },
    "100%": {
      transform: "translateY(0)",
    },
  },
});

function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Logo
        width="49"
        height="60"
        viewBox="0 0 59 70"
        fill="#fff"
        className={classes.svg}
      />
    </div>
  );
}

export default Loading;
