import React from "react";
import { createUseStyles } from "react-jss";

import Nav from "../components/Nav";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: "grid",
    minHeight: "100vh",
  },
  nav: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 10,
  },
  container: {
    marginBottom: 50,
  },

  [`@media(max-width: 400px)`]: {
    container: {
      padding: "30px",
    },
  },
  [`@media(max-width: 300px)`]: {
    container: {
      padding: "20px",
    },
  },
}));

function ResultLayout({ children }) {
  const classes = useStyles();
  const { authLoading } = useAuth();

  return (
    <div className={classes.wrapper}>
      {authLoading ? (
        <div style={{ height: "100vh" }}>
          <Loading />
        </div>
      ) : (
        <>
          <div className={classes.nav}>
            <Nav />
          </div>
          <div className={classes.container}>{children}</div>
        </>
      )}
    </div>
  );
}

export default ResultLayout;
