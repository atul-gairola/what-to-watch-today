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
  const [type, setType] = useState("movie");
  const [ratings, setRatings] = useState([1, 10]);
  const [genres, setGenres] = useState([]);
  const [ott, setOTT] = useState([]);

  const [userPreferences, setUserPreferences] = useState({
    type: "movie",
    ratings: [0, 10],
    genres: [],
    ottProviders: [],
  });

  const classes = useStyles();

  useEffect(() => {
    const fetchOTT = async () => {
      await axios.get();
    };
  }, []);

  return (
    <Layout>
      <div style={{ marginBottom: 50 }}>
        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
      {currentStep === 0 && <TypeOfContent type={type} setType={setType} />}
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
