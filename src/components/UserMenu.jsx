import React, { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import ClickAwayListener from "react-click-away-listener";

import { ReactComponent as UserIcon } from "../images/userIcon.svg";
import { ReactComponent as LogoutIcon } from "../images/logoutIcon.svg";
import { useAuth } from "../contexts/AuthContext";

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
  container: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    zIndex: 2,
    right: 0,
    border: "1px solid " + theme.color.main,
    background: theme.color.secondary,
    borderRadius: 7,
  },
  dropdownItem: {
    padding: "20px 20px",
    minWidth: 200,
    borderRadius: 7,
    color: "inherit",
    textDecoration: "none",
    cursor: "pointer",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridGap: 20,
    alignItems: "center",
    transition: ".5s",
    "&:hover": {
      background: theme.color.secondaryHover,
    },
  },
}));

function Avatar({ name, image, onClick }) {
  const classes = useStyles();
  return (
    <div
      onClick={onClick}
      className={classes.avatar}
      style={{ backgroundImage: `url(${image})` }}
    >
      {!image && name.slice(0, 1).toUpperCase()}
    </div>
  );
}

function UserMenu({ name, image }) {
  const classes = useStyles();
  const theme = useTheme();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  function DropdownMenu() {
    function DropdownItem({ children, LeftIcon, type, ...props }) {
      return (
        <li
          style={type === "danger" ? { color: theme.color.error } : {}}
          className={classes.dropdownItem}
          {...props}
        >
          {LeftIcon && (
            <LeftIcon
              width={20}
              fill={type === "danger" ? theme.color.error : theme.color.main}
            />
          )}
          {children}
        </li>
      );
    }

    const handleLogout = () => {
      logout()
        .then(() => setOpen(false))
        .catch((e) => console.log(e));
    };

    return (
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <ul className={classes.dropdownMenu}>
          <DropdownItem LeftIcon={UserIcon}>
            {" "}
            <p>Profile</p>{" "}
          </DropdownItem>
          <DropdownItem
            onClick={handleLogout}
            type="danger"
            LeftIcon={LogoutIcon}
          >
            Logout
          </DropdownItem>
        </ul>
      </ClickAwayListener>
    );
  }

  return (
    <div className={classes.container}>
      <Avatar
        onClick={() => setOpen((prev) => !prev)}
        name={name}
        image={image}
      />
      {open && <DropdownMenu />}
    </div>
  );
}

export default UserMenu;
