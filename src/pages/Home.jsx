import React from "react";

import Nav from "./components/Nav";
import Genres from "./components/Genres";
import TypeOfContent from "./components/TypeOfContent";

function Home() {
  return (
    <div>
      <Nav />
      <TypeOfContent />
      <Genres />
    </div>
  );
}

export default Home;
