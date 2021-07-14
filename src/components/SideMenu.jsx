import React from "react";
import { createUseStyles, useTheme } from "react-jss";

import { useAuth } from "../contexts/AuthContext";
import Avatar from "./Avatar";

import { ReactComponent as CloseIcon } from "../images/closeIcon.svg";

const useStyles = createUseStyles((theme) => ({
  container: {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    top: 0,
    left: 0,
    zIndex: 50,
    background: theme.color.secondary,
    color: theme.color.main,
    display: "grid",
    gridTemplateRows: "auto auto 1fr",
  },
  header: {
    padding: "16px 50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  userSection: {
    display: "grid",
    placeItems: "center",
    padding: "30px 0 20px 0",
    borderBottom: "1px solid " + theme.color.main,
    margin: "0 50px",
  },
  authButton: {
    padding: "9px 24px",
    borderRadius: 7,
    fontSize: "0.9rem",
    fontWeight: 500,
    background: theme.color.main,
    color: theme.color.secondar,
    border: "none",
    transition: ".7s",
    marginBottom: 20,
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
  menuItem: {
    background: "transparent",
    color: theme.color.main,
    padding: "25px 0",
    width: "100%",
    display: "grid",
    placeContent: "center",
    placeItems: "center",
    fontSize: "1.2rem",
    transition: ".3s",
    "&:active": {
      transform: "translateY(-4px)",
    },
  },
  menu: {
    height: "100%",
    display: "grid",
    placeContent: "center",
    maxHeight: 450,
  },
}));

function SideMenu({ setOpenSideMenu, handleModal }) {
  const classes = useStyles();
  const theme = useTheme();
  const { currentUser, logout } = useAuth();

  function MenuItem({ children, Icon, type, ...props }) {
    return (
      <li
        {...props}
        style={type === "danger" ? { color: theme.color.error } : {}}
        className={classes.menuItem}
      >
        {children}
      </li>
    );
  }

  function handleLogout() {
    logout()
      .then(() => setOpenSideMenu(false))
      .catch((e) => console.log(e));
  }

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div style={{ marginTop: 10 }} onClick={() => setOpenSideMenu(false)}>
          <CloseIcon width={30} height={30} fill={theme.color.main} />
        </div>
      </header>
      <section className={classes.userSection}>
        {currentUser ? (
          <>
            <Avatar
              style={{ width: 65, height: 65 }}
              name={currentUser.name}
              image={currentUser.profilePicture}
            />
            <p style={{ marginTop: 5 }}>{currentUser.name.toLowerCase()}</p>
          </>
        ) : (
          <button className={classes.authButton} onClick={handleModal}>
            Login / Signup
          </button>
        )}
      </section>
      <ul className={classes.menu}>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Preferences</MenuItem>
        <MenuItem>Watched</MenuItem>
        <MenuItem>Liked</MenuItem>
        <MenuItem onClick={handleLogout} type="danger">
          Logout
        </MenuItem>
      </ul>
    </div>
  );
}

export default SideMenu;
