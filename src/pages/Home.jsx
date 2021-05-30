import React from "react";

import Layout from "../Layout/Layout";
import TypeOfContent from "./components/TypeOfContent";
import Genres from "./components/Genres";

function Home() {
  return (
    <Layout>
      <TypeOfContent />
      <Genres />
    </Layout>
  );
}

export default Home;
