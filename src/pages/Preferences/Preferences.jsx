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
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [ott, setOTT] = useState([]);
  const [ottList, setOTTList] = useState([]);

  const [userPreferences, setUserPreferences] = useState({
    type: "movie",
    ratings: [0, 10],
    genres: [],
    ottProviders: [],
  });

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

  return (
    <Layout>
      <div style={{ marginBottom: 50 }}>
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
        <Rating
          ratings={ratings}
          setRatings={setRatings}
          setUserPreferences={setUserPreferences}
          userPreferences={userPreferences}
        />
      )}
    </Layout>
  );
}

export default Preferences;
