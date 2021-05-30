import React from "react";

import Layout from "../Layout/Layout";
import Hero from "./components/Hero";
import TypeOfContent from "./components/TypeOfContent";
import Genres from "./components/Genres";

function Home() {
  return (
    <Layout>
      <Hero />
      {/* <TypeOfContent />
      <Genres /> */}
    </Layout>
  );
}

export default Home;
