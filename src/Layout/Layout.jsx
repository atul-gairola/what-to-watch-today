import React from "react";

import Nav from "../components/Nav";

function Layout({ children }) {
  return (
    <div>
      <Nav />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
