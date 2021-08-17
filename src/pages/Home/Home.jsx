import React from "react";
import { createUseStyles } from "react-jss";

import Layout from "../../Layout/Layout";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";

const useStyles = createUseStyles((theme) => ({
  section: {
    padding: 50,
  },
  [`@media(max-width: 400px)`]: {
    section: {
      padding: "30px",
    },
  },
  [`@media(max-width: 300px)`]: {
    section: {
      padding: "20px",
    },
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.section}>
        <Hero />
      </div>
      <FeaturesSection />
    </Layout>
  );
}

export default Home;
