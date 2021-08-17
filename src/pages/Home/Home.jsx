import React, { useState } from "react";
import { createUseStyles } from "react-jss";

import Layout from "../../Layout/Layout";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeaturesSection";
import InfoSection from "./components/InfoSection";
import Loading from "../../components/Loading";

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
  const [loading, setLoading] = useState(false);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={classes.section}>
            <Hero setLoading={setLoading} />
          </div>
          <InfoSection />
          <FeaturesSection />
        </>
      )}
    </Layout>
  );
}

export default Home;
