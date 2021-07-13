import React, { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import ReactModal from "react-modal";

import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import { ReactComponent as GoogleLogo } from "../../images/google-icon.svg";

const useStyles = createUseStyles((theme) => ({
  overlay: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(5px)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },
  contentContainer: {
    maxWidth: 500,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px 30px",
    background: theme.color.secondary,
    borderRadius: 7,
    border: "none",
  },
  googleLoginContainer: {
    display: "grid",
    placeItems: "center",
    padding: "40px 0",
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
    marginBottom: 20,
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
}));

function AuthModal({ isOpen }) {
  const classes = useStyles();
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <ReactModal
      appElement={document.getElementById("root")}
      className={classes.contentContainer}
      overlayClassName={classes.overlay}
      isOpen={true}
    >
      <div className={classes.googleLoginContainer}>
        <button className={classes.googleButton}>
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
        <div>{isLogin ? <SigninForm /> : <SignupForm />}</div>
      </div>
    </ReactModal>
  );
}

export default AuthModal;
