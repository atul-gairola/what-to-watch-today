import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

import { ReactComponent as Logo } from "../images/Logo.svg";
import { useIp } from "../contexts/IpContext";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal/AuthModal";

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
  const { currentUser, logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  console.log("Current user: ", currentUser);

  const handleLogout = async () => {
    await logout();
  };

  const handleModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <nav className={classes.navContainer}>
        <div style={{ flexGrow: 1 }}>
          <Link to="/">
            <Logo width="45" height="50" viewBox="0 0 59 70" fill="#fff" />
          </Link>
        </div>
        <div className={classes.navEndContainer}>
          {currentUser && <button onClick={handleLogout}>Logout</button>}
          <button onClick={handleModal}>Login / Signup</button>
        </div>
      </nav>
      <AuthModal isOpen={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default Nav;
