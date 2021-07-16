import React, { useState } from "react";
import { createUseStyles } from "react-jss";

import Layout from "../../Layout/Layout";
import Stepper from "./components/Stepper";
import TypeOfContent from "./components/TypeOfContent";

const useStyles = createUseStyles((theme) => ({}));

function Preferences() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    type: "",
    ratings: [],
    genres: [],
    ottProviders: [],
  });

  const classes = useStyles();

  return (
    <Layout>
      <div style={{ marginBottom: 50 }}>
        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      <TypeOfContent />
    </Layout>
  );
}

export default Preferences;
