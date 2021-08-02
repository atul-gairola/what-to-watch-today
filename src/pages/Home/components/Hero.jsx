import React, { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import endpoints from "../../../config/endpoints";
import { ReactComponent as RandomizeIcon } from "../../../images/randomize-icon.svg";
import { ReactComponent as PreferenceIcon } from "../../../images/preference-icon.svg";
import Loading from "../../../components/Loading";

const useStyles = createUseStyles((theme) => ({
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
  [`@media (max-width: ${theme.viewports.tablet})`]: {
    heroContent: {
      "& > h1": {
        fontSize: "1.7rem",
        marginBottom: "20px",
      },
      "& > p": {
        fontSize: "1.3rem",
      },
    },

    button: {
      "& > div > h3": {
        fontSize: "1.2rem",
        marginBottom: "3px",
      },
      "& > div > p": {
        fontSize: "14px",
        maxWidth: "500px",
      },
    },
  },
  [`@media (max-width: ${theme.viewports.smallTablet})`]: {
    container: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto",
      gridGap: 50,
      height: "100%",
      alignContent: "center",
    },
    heroContent: {
      textAlign: "center",
      "& > h1": {
        fontSize: "1.9rem",
        marginBottom: "10px",
      },
      "& > p": {
        fontSize: "1.3rem",
      },
    },
    buttonContainer: {
      justifyItems: "center",
      gridGap: 50,
      transform: "none",
    },
    button: {
      "& > div > h3": {
        fontSize: "1.3rem",
        marginBottom: "5px",
      },
      "& > div > p": {
        fontSize: "16px",
        maxWidth: "500px",
      },
    },
  },
  [`@media (max-width: ${theme.viewports.tablet})`]: {
    heroContent: {
      "& > h1": {
        fontSize: "1.7rem",
        marginBottom: "20px",
      },
      "& > p": {
        fontSize: "1.3rem",
      },
    },

    button: {
      "& > div > h3": {
        fontSize: "1.2rem",
        marginBottom: "3px",
      },
      "& > div > p": {
        fontSize: "14px",
        maxWidth: "500px",
      },
    },
  },
  [`@media (max-width: ${theme.viewports.mobile})`]: {
    container: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto",
      gridGap: 70,
      height: "100%",
      alignContent: "center",
    },
    heroContent: {
      "& > h1": {
        fontSize: "1.7rem",
        marginBottom: "20px",
      },
      "& > p": {
        fontSize: "1.2rem",
      },
    },
    buttonContainer: {
      gridGap: 30,
    },
    button: {
      gridGap: "30px",
      width: "300px",
      padding: "15px",
      gridTemplateColumns: "auto auto",
      placeContent: "center",
    },
  },
  [`@media (max-width: 400px)`]: {
    container: {
      gridGap: 50,
    },
    heroContent: {
      "& > h1": {
        fontSize: "1.6rem",
        marginBottom: "15px",
      },
      "& > p": {
        fontSize: "1rem",
      },
    },
    button: {
      gridGap: "30px",
      width: "300px",
      padding: "15px 20px",
      width: 250,
      "& > div > h3": {
        fontSize: "1.1rem",
      },
    },
  },
}));

function Hero() {
  const [iconColor1, setIconColor1] = useState("#fff");
  const [iconColor2, setIconColor2] = useState("#fff");
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const isMobile = useMediaQuery({
    query: `(max-device-width: ${theme.viewports.mobile})`,
  });
  const isSmallMobile = useMediaQuery({
    query: `(max-device-width: 400px)`,
  });

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
                width={isMobile ? (isSmallMobile ? 40 : 60) : 99}
                height={isMobile ? (isSmallMobile ? 42 : 62) : 92}
                fill={iconColor1}
              />
              <div>
                <h3>Surprise Me</h3>
                {!isMobile && (
                  <p>
                    Feel like having some excitement? Want to see what life
                    brings you? Roll the dice and see what you’re gonna watch
                    today.
                  </p>
                )}
              </div>
            </div>
            <Link
              to="/set-preferences"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div
                onMouseEnter={() => handleMouseHover("enter", 2)}
                onMouseLeave={() => handleMouseHover("leave", 2)}
                className={classes.button}
              >
                <PreferenceIcon
                  width={isMobile ? (isSmallMobile ? 40 : 60) : 100}
                  height={isMobile ? (isSmallMobile ? 40 : 60) : 83}
                  fill={iconColor2}
                />
                <div>
                  <h3>I'll tailor it</h3>
                  {!isMobile && (
                    <p>
                      If you have an idea of what type of content you wanna
                      watch, then tell us your preferences and we'll give you
                      something.
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export default Hero;
