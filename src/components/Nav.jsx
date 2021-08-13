import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUseStyles, useTheme } from "react-jss";
import { useMediaQuery } from "react-responsive";

import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal/AuthModal";
import UserMenu from "./UserMenu";
import SideMenu from "./SideMenu";

import { ReactComponent as Logo } from "../images/Logo.svg";
import { ReactComponent as HamburgerIcon } from "../images/hamburgerIcon.svg";

const useStyles = createUseStyles((theme) => ({
  navContainer: {
    padding: "16px 50px",
    display: "flex",
    alignItems: "center",
  },
  navEndContainer: {
    display: "flex",
    alignItems: "center",
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
  userItem: {
    width: 45,
    height: 45,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    marginRight: 30,
    border: "2px solid " + theme.color.main,
    cursor: "pointer",
    transition: ".7s",
    filter: "brightness(60%)",
    "&:hover": {
      transform: "translateY(-3px)",
      opacity: 1,
      filter: "brightness(100%)",
    },
  },
  userLinksContainer: {
    display: "grid",
  },
  navLink: {
    color: "inherit",
    fontWeight: 600,
    fontSize: 15,
    textDecoration: "none",
  },
  toggleButton: {
    background: "transparent",
    border: "none",
    padding: 0,
    height: "100%",
    display: "grid",
    placeItems: "center",
    marginRight: 50,
    cursor: "pointer",
  },
  hamburgerButton: {
    cursor: "pointer",
    transform: "translateY(-2px)",
  },
  linkContainer: {
    flexGrow: 1,
    display: "flex",
    gridGap: 30,
    justifyItems: "center",
  },
  [`@media(max-width: 400px)`]: {
    navContainer: {
      padding: "16px 30px",
    },
  },
  [`@media(max-width: 300px)`]: {
    navContainer: {
      padding: "16px 20px",
    },
  },
}));

function Nav() {
  const classes = useStyles();
  const theme = useTheme();
  const { currentUser } = useAuth();

  const [openModal, setOpenModal] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  // const [darkTheme, setDarkTheme] = useState(true);

  const isMobile = useMediaQuery({
    query: `(max-device-width: ${theme.viewports.mobile})`,
  });

  // function ThemeToggle() {
  //   return (
  //     <div
  //       onClick={() => setDarkTheme((prev) => !prev)}
  //       className={classes.toggleButton}
  //     >
  //       {darkTheme ? (
  //         <MoonIcon width={25} height={25} fill={theme.color.main} />
  //       ) : (
  //         <SunIcon width={32} height={32} fill={theme.color.main} />
  //       )}
  //     </div>
  //   );
  // }

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
        <div className={classes.linkContainer}>
          <Link to="/" className={classes.navLink}>Liked Content</Link>
          <Link to="/" className={classes.navLink}>Watched Content</Link>
          <Link to="/" className={classes.navLink}>Watch List</Link>
        </div>
        <div className={classes.navEndContainer}>
          {/* <div>
            <ThemeToggle />
          </div> */}
          {isMobile ? (
            <div
              onClick={() => setOpenSideMenu(true)}
              className={classes.hamburgerButton}
            >
              <HamburgerIcon fill="#fff" width={37} />
            </div>
          ) : currentUser ? (
            <div className={classes.userLinksContainer}>
              <div style={{ marginLeft: 20 }}>
                <UserMenu
                  name={currentUser.name}
                  image={currentUser.profilePicture}
                />
              </div>
            </div>
          ) : (
            <button onClick={handleModal}>Login / Signup</button>
          )}
        </div>
      </nav>
      <AuthModal isOpen={openModal} setOpenModal={setOpenModal} />
      {isMobile && openSideMenu && (
        <SideMenu handleModal={handleModal} setOpenSideMenu={setOpenSideMenu} />
      )}
    </>
  );
}

export default Nav;
