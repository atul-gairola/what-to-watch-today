import React, { useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useHistory, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { ReactComponent as RandomizeIcon } from "../../../images/randomize-icon.svg";
import { ReactComponent as PreferenceIcon } from "../../../images/preference-icon.svg";
import { ReactComponent as HeroIllustration } from "../../../images/heroIllustration (4).svg";
import Loading from "../../../components/Loading";
import { getSuggestion } from "../../../utils";

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
    // "& > svg": {
    //   width: "100%",
    // },
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
      // "& > svg": {
      //   width: "80%",
      // },
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
      alignContent: "start",
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
      // width: "300px",
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
  const isSmallTablet = useMediaQuery({
    query: `(max-device-width: ${theme.viewports.smallTablet})`,
  });

  const getRandomMovieWithoutPreference = async () => {
    setLoading(true);

    const { typeOfContent, item } = await getSuggestion();

    setLoading(false);
    setIconColor1("#fff");
    setIconColor2("#fff");

    history.push(`/watch-today/${typeOfContent}/${item.id}?method=random`);
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

  function setIllustrationWidth() {
    if (isSmallMobile) {
      return "100%";
    }
    if (isMobile) {
      return "100%";
    }
    if (isSmallTablet) {
      return "60%";
    }
    return "100%";
  }

  function setIllustrationHeight() {
    if (isSmallMobile) {
      return 200;
    }
    if (isMobile) {
      return 300;
    }
    if (isSmallTablet) {
      return 300;
    }
    return 504;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className={classes.container}>
          <div className={classes.heroContent}>
            {/* <h1>Frustrated in deciding what to watch today?</h1>
            <p>
              This will help you in that. Get a random movie or show to watch
              and explore genres you've never seen before. Find hidden gems and
              widen your spectrum.
            </p> */}
            <HeroIllustration
              width={setIllustrationWidth()}
              height={setIllustrationHeight()}
            />
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
                    Feeling lucky today? Or maybe just wanna go with the flow?
                    Click me to roll the dice and get a completely random show
                    or movie to watch today.
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
                      Have a vague idea of what you want but can't exactly
                      decide what to watch? Set up your preferences and get
                      something as per your liking to watch today.
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
