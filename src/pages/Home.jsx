import React from "react";

import Layout from "../Layout/Layout";
import Hero from "./components/Hero";
import Loading from "../components/Loading";
import TypeOfContent from "./components/TypeOfContent";
import Genres from "./components/Genres";

function Home() {
  return (
    <Layout>
      <Hero />
      {/* <Loading /> */}
      {/* <TypeOfContent />
      <Genres /> */}
    </Layout>
  );
}

export default Home;
