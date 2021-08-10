import React, { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import axios from "axios";

import Layout from "../../Layout/Layout";
import Stepper from "./components/Stepper";
import TypeOfContent from "./components/TypeOfContent";
import Genres from "./components/Genres";
import Rating from "./components/Rating";

const useStyles = createUseStyles((theme) => ({
  submitButton: {
    display: "grid",
    width: "100%",
    placeContent: "center",

    "& > button": {
      color: theme.color.secondary,
      background: theme.color.main,
      padding: "10px 30px",
      borderRadius: theme.button.borderRadius,
      fontSize: "1.1rem",
      fontWeight: "600",
      border: "none",
    },
  },
}));

function Preferences() {
  const [currentStep, setCurrentStep] = useState(0);
  const [type, setType] = useState("movie");
  const [ratings, setRatings] = useState([1, 10]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [ott, setOTT] = useState([]);
  const [ottList, setOTTList] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );
      console.log("Fetched genres");
      setGenreList(data.genres);
    };

    fetchData();
  }, [type]);

  function handleSubmit() {
    const data = {
      type,
      ratings,
      selectedGenres,
    };

    console.log(data);
  }

  return (
    <Layout>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          height: "calc(100vh - 190px)",
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
        {currentStep === 0 && (
          <TypeOfContent
            type={type}
            setType={setType}
            setSelectedGenres={setSelectedGenres}
          />
        )}
        {currentStep === 1 && (
          <Genres
            genreList={genreList}
            setSelectedGenres={setSelectedGenres}
            selectedGenres={selectedGenres}
          />
        )}
        {currentStep === 2 && (
          <Rating ratings={ratings} setRatings={setRatings} />
        )}
        <div className={classes.submitButton}>
          <button onClick={handleSubmit}>Let's go</button>
        </div>
      </div>
    </Layout>
  );
}

export default Preferences;
