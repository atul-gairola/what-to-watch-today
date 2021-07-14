import React, { useState, useEffect } from "react";
import { createUseStyles, useTheme } from "react-jss";
import ReactModal from "react-modal";
import { useMediaQuery } from "react-responsive";

import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import { ReactComponent as GoogleLogo } from "../../images/google-icon.svg";
import { useAuth } from "../../contexts/AuthContext";
import { ReactComponent as CloseIcon } from "../../images/closeIcon.svg";

const useStyles = createUseStyles((theme) => ({
  overlay: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(5px)",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
    width: "100vw",
    height: "100vh",
  },
  contentContainer: {
    minWidth: 500,
    position: "absolute",
    maxHeight: "80%",
    top: "50%",
    left: "50%",
    overflowY: "auto",
    transform: "translate(-50%, -50%)",
    padding: "20px 30px",
    background: theme.color.secondary,
    borderRadius: 7,
    border: "none",
    "&::-webkit-scrollbar": {
      width: 8,
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0,0,0,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "20px",
      width: "100%",
      background: "rgba(0,0,0,0.7)",
    },
  },
  header: {
    padding: "16px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  googleLoginContainer: {
    display: "grid",
    placeItems: "center",
    padding: "40px 0",
    marginBottom: 40,
    borderBottom: `1px solid ${theme.color.main}`,
  },
  googleButton: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    alignItems: "center",
    gridGap: 10,
    color: theme.color.secondary,
    padding: theme.button.padding,
    fontSize: theme.button.fontSize,
    borderRadius: theme.button.borderRadius,
    fontWeight: theme.button.fontWeight,
    border: 0,
  },
  tabContainer: {
    marginTop: 20,
    marginBottom: 40,
    "& button": {
      background: "transparent",
      color: theme.color.main,
      padding: "10px 20px",
      border: "none",
      transition: "0.3s",
      "&:hover": {
        background: "rgba(255,255,255, 0.4)",
      },
    },
  },
  activeTab: {
    background: [theme.color.main, "!important"],
    color: [theme.color.secondary, "!important"],
  },
  [`@media(max-width: ${theme.viewports.smallMobile})`]: {
    contentContainer: {
      width: "100%",
      height: "100%",
      maxHeight: "100%",
      minWidth: 200,
      padding: "20px 50px",
    },
  },
  [`@media(max-width: 400px)`]: {
    contentContainer: {
      padding: "20px 30px",
    },
  },
  [`@media(max-width: 300px)`]: {
    contentContainer: {
      padding: "20px",
    },
  },
}));

function AuthModal({ isOpen, setOpenModal }) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallMobile = useMediaQuery({
    query: `(max-device-width: ${theme.viewports.smallMobile})`,
  });


  const [isLogin, setIsLogin] = useState(true);
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setOpenModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ReactModal
      appElement={document.getElementById("root")}
      className={classes.contentContainer}
      overlayClassName={classes.overlay}
      isOpen={isOpen}
      onRequestClose={() => setOpenModal(false)}
    >
      {isSmallMobile && (
        <header className={classes.header}>
          <div style={{ marginTop: 10 }} onClick={() => setOpenModal(false)}>
            <CloseIcon width={30} height={30} fill={theme.color.main} />
          </div>
        </header>
      )}
      <div className={classes.googleLoginContainer}>
        <button onClick={handleGoogleLogin} className={classes.googleButton}>
          <GoogleLogo width={25} height={25} fill={theme.color.secondary} />
          <span>Sign in with google</span>
        </button>
      </div>
      <div>
        <div className={classes.tabContainer}>
          <button
            className={isLogin && classes.activeTab}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin && classes.activeTab}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        <div>
          {isLogin ? (
            <SigninForm setOpenModal={setOpenModal} />
          ) : (
            <SignupForm setOpenModal={setOpenModal} />
          )}
        </div>
      </div>
    </ReactModal>
  );
}

export default AuthModal;
