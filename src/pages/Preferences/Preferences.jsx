import React, { useState, useEffect } from "react";
import { createUseStyles, useTheme } from "react-jss";
import axios from "axios";
import { useHistory } from "react-router";

import Layout from "../../Layout/Layout";
import Stepper from "./components/Stepper";
import TypeOfContent from "./components/TypeOfContent";
import Genres from "./components/Genres";
import Rating from "./components/Rating";
import { getSuggestion } from "../../utils";
import { ReactComponent as LoadingAnimation } from "../../images/loadingAnimation.svg";

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
  const [ratings, setRatings] = useState([0, 10]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );
      setGenreList(data.genres);
    };

    fetchData();
  }, [type]);

  async function handleSubmit() {
    setLoading(true);
    const data = {
      type,
      ratings,
      selectedGenres,
    };

    const { typeOfContent, item } = await getSuggestion(true, data);

    setLoading(false);
    history.push(
      `/watch-today/${typeOfContent}/${
        item.id
      }?method=preferences&type=${type}&genres=${selectedGenres.join(
        ","
      )}&ratings=${ratings.join(",")}`
    );
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
          <button onClick={handleSubmit}>
            {loading ? (
              <LoadingAnimation
                width={40}
                height={30}
                fill={theme.color.secondary}
              />
            ) : (
              "Let's Go"
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Preferences;
