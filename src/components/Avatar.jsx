import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    backgroundPosition: "center",
    backgroundSize: "contain",
    cursor: "pointer",
    background: theme.color.main,
    color: theme.color.secondary,
    display: "grid",
    placeItems: "center",
  },
}));

function Avatar({ name, image, ...props }) {
  const classes = useStyles();
  return (
    <div
      {...props}
      className={classes.avatar}
      style={{ backgroundImage: `url(${image})` }}
    >
      {!image && name.slice(0, 1).toUpperCase()}
    </div>
  );
}

export default Avatar;
