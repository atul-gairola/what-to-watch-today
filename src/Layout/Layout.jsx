import React from "react";
import { createUseStyles } from "react-jss";

import Nav from "../components/Nav";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    minHeight: "100vh",
  },
  container: {
    height: "100%",
  }
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
          <Footer />
        </>
      )}
    </div>
  );
}

export default Layout;
