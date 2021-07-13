import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import axios from "axios";
import { useHistory } from "react-router-dom";

import endpoints from "../../../config/endpoints";
import { ReactComponent as RandomizeIcon } from "../../../images/randomize-icon.svg";
import { ReactComponent as PreferenceIcon } from "../../../images/preference-icon.svg";
import Loading from "../../../components/Loading";

const useStyles = createUseStyles({
  container: {
    color: "#fff",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    height: "100%",
    alignItems: "center",
    gridGap: "70px",
  },
  heroContent: {
    "& > h1": {
      fontSize: "2rem",
      marginBottom: "20px",
    },
    "& > p": {
      fontSize: "1.5rem",
    },
  },
  buttonContainer: {
    transform: "translateY(-20px)",
    display: "grid",
    gridTemplateRows: "auto auto",
    gridGap: "80px",
    alignSelf: "center",
  },
  button: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    alignItems: "center",
    gridGap: "40px",
    "& > div > h3": {
      fontSize: "1.5rem",
      marginBottom: "3px",
    },
    "& > div > p": {
      fontSize: "16px",
      maxWidth: "500px",
    },
    cursor: "pointer",
    padding: "20px 30px",
    border: "1px solid #fff",
    width: "fit-content",
    borderRadius: "10px",
    transition: "background 0.5s ease-out, transform 0.5s",
    "&:hover": {
      background: "#fff",
      color: "#282c34",
      transform: "translateY(-10px)",
    },
  },
});

function Hero() {
  const [iconColor1, setIconColor1] = useState("#fff");
  const [iconColor2, setIconColor2] = useState("#fff");
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const history = useHistory();

  const getRandomMovieWithoutPreference = async () => {
    setLoading(true);
    // select if it will be a  movie or a show
    const flag = Math.floor(Math.random() * 2);
    let typeOfContent = flag ? "movie" : "tv";

    // get watch region
    const watch_region = JSON.parse(
      localStorage.getItem("country")
    ).countryCode;

    // randomize genre
    let genreURL =
      typeOfContent === "movie"
        ? endpoints.getMovieGenres
        : endpoints.getShowGenres;

    const {
      data: { genres },
    } = await axios.get(genreURL);

    let genreCount = Math.floor(Math.random() * 8) + 2;

    let randomGenre = [];

    while (genreCount > 0) {
      const genreNum = Math.floor(Math.random() * genres.length);

      randomGenre.push(genres[genreNum].id);
      genres.splice(genres[genreNum], 1);
      genreCount--;
    }

    const randomAvgVotesCount = Math.floor(Math.random() * 8) + 1;

    const url = `https://api.themoviedb.org/3/discover/${typeOfContent}?api_key=${
      process.env.REACT_APP_TMDB_API_KEY
    }&language=en-US&include_adult=true&include_video=true&vote_average.gte=${randomAvgVotesCount}&with_genres=${randomGenre.join(
      "|"
    )}&watch_region=${watch_region}`;

    const { data } = await axios.get(url);

    if (data.total_pages === 0) {
      return await getRandomMovieWithoutPreference();
    }

    const randomResultPageNum =
      Math.floor(Math.random() * data.total_pages) + 1;
    const randomArrIndex = Math.floor(Math.random() * 20);

    let item;

    if (randomResultPageNum === 1) {
      item = data.results[randomArrIndex];
    } else {
      const { data: finalData } = await axios.get(
        `${url}&page=${randomResultPageNum}`
      );
      item = finalData.results[randomArrIndex];
    }

    setLoading(false);
    setIconColor1("#fff");
    setIconColor2("#fff");

    history.push(`/watch-today/${typeOfContent}/${item.id}`);
  };

  const handleMouseHover = (type, num) => {
    if (num === 1) {
      if (type === "enter") setIconColor1("#282c34");
      else setIconColor1("#fff");
    } else {
      if (type === "enter") setIconColor2("#282c34");
      else setIconColor2("#fff");
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className={classes.container}>
          <div className={classes.heroContent}>
            <h1>Frustrated in deciding what to watch today?</h1>
            <p>
              This will help you in that. Get a random movie or show to watch
              and explore genres you've never seen before. Find hidden gems and
              widen your spectrum.
            </p>
          </div>
          <div className={classes.buttonContainer}>
            <div
              onClick={getRandomMovieWithoutPreference}
              onMouseEnter={() => handleMouseHover("enter", 1)}
              onMouseLeave={() => handleMouseHover("leave", 1)}
              className={classes.button}
            >
              <RandomizeIcon
                width="99"
                height="92"
                viewBox="0 0 99 92"
                fill={iconColor1}
              />
              <div>
                <h3>Surprise Me</h3>
                <p>
                  Feel like having some excitement? Want to see what life brings
                  you? Roll the dice and see what you’re gonna watch today.
                </p>
              </div>
            </div>
            <div
              onMouseEnter={() => handleMouseHover("enter", 2)}
              onMouseLeave={() => handleMouseHover("leave", 2)}
              className={classes.button}
            >
              <PreferenceIcon
                width="100"
                height="83"
                fill={iconColor2}
              />
              <div>
                <h3>I'll tailor it</h3>
                <p>
                  If you have an idea of what type of content you wanna watch,
                  then tell us your preferences and we'll give you something.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Hero;
