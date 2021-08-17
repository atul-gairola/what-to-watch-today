import React from "react";
import { createUseStyles } from "react-jss";

import Nav from "../components/Nav";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    minHeight: "100vh",
  },
  container: {
    // padding: "50px",
    height: "100%",
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

function Layout({ children }) {
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
          <Nav />
          <div className={classes.container}>{children}</div>
        </>
      )}
    </div>
  );
}

export default Layout;
