import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  avatar: {
    width: 45,
    height: 45,
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

function Avatar({ name, image }) {
  const classes = useStyles();
  return (
    <div
      className={classes.avatar}
      style={{ backgroundImage: `url(${image})` }}
    >
      {!image && name.slice(0, 1).toUpperCase()}
    </div>
  );
}

function UserMenu({ name, image }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Avatar name={name} image={image} />
    </div>
  );
}

export default UserMenu;
