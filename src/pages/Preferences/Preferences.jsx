import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import axios from "axios";

import Layout from "../../Layout/Layout";
import Stepper from "./components/Stepper";
import TypeOfContent from "./components/TypeOfContent";
import Genres from "./components/Genres";
import Rating from "./components/Rating";

const useStyles = createUseStyles((theme) => ({}));

function Preferences() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userPreferences, setUserPreferences] = useState({
    type: "movie",
    rating: 0,
    genres: [],
    ottProviders: [],
  });

  const classes = useStyles();

  return (
    <Layout>
      <div style={{ marginBottom: 50 }}>
        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      {currentStep === 0 && (
        <TypeOfContent
          setUserPreferences={setUserPreferences}
          userPreferences={userPreferences}
        />
      )}
      {currentStep === 1 && (
        <Genres
          setUserPreferences={setUserPreferences}
          userPreferences={userPreferences}
        />
      )}
      {currentStep === 2 && (
        <Rating
          setUserPreferences={setUserPreferences}
          userPreferences={userPreferences}
        />
      )}
    </Layout>
  );
}

export default Preferences;
