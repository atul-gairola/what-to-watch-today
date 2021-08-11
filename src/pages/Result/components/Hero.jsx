import React from "react";
import { createUseStyles } from "react-jss";
import { useConfig } from "../../../contexts/ConfigContext";

import { getYear } from "../../../utils";
import { ReactComponent as StarIcon } from "../../../images/starIcon.svg";
import { ReactComponent as RestartIcon } from "../../../images/restartIcon.svg";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: 136,
    paddingLeft: 50,
    paddingRight: 50,
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridGap: 30,
    paddingBottom: 22,
  },
  poster: {
    width: 248,
    height: 376,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
    borderRadius: 10,
  },
  undername: {
    color: "#B8C4DB",
    fontSize: 15,
    marginTop: -10,
    "& > span": {
      marginRight: 8,
    },
  },
  rating: {
    color: "#FFE600",
    marginTop: 4,
  },
  imdb: {
    fontWeight: 700,
    "& > span": {
      color: "#FAB446",
    },
    marginTop: 15,
    marginBottom: 15,
  },
  overview: {
    fontWeight: 300,
  },
  tagline: {
    marginTop: 16,
    "& > h3": {
      fontSize: 16,
    },
    "& > p": {
      fontWeight: 300,
      fontSize: 16,
    },
  },
  watchNow: {
    padding: "8px 22px",
    borderRadius: 10,
    background: theme.color.secondary,
    color: theme.color.main,
    boxShadow: "0px 4px 37px rgba(0,0,0,0.25)",
    border: "none",
    fontWeight: 600,
    fontSize: 16,
    marginRight: 30,
  },
  tryAnother: {
    color: theme.color.main,
    background: "transparent",
    border: "none",
    fontWeight: 600,
    fontSize: 15,
    paddingBottom: 8,
    borderBottom: `1px solid ${theme.color.main}`,
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridGap: 5,
    alignItems: "center",
  },
}));

function Hero({ details, watchProviders, type }) {
  const classes = useStyles();
  const { images } = useConfig();
  console.log(details);
  console.log(watchProviders);
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(40, 44, 52, 0) 10%, #282C34 100.3%), linear-gradient(180deg, #282C34 0.11%, rgba(40, 44, 52, 0.52) 70%), url("${
          images.base_url + images.backdrop_sizes[3] + details.backdrop_path
        }")`,
      }}
      className={classes.wrapper}
    >
      <div
        className={classes.poster}
        style={{
          backgroundImage: `url("${
            images.base_url + images.poster_sizes[4] + details.poster_path
          }")`,
        }}
      />
      <div>
        <h1>{details.title || details.name}</h1>
        <p className={classes.undername}>
          {" "}
          <span>
            {type === "movie"
              ? getYear(details.release_date)
              : getYear(details.first_air_date) + " - " +
                getYear(details.last_air_date)}
          </span>
          <span style={{ verticalAlign: "super", fontSize: 17 }}>.</span>
          <span>
            {details.genres.reduce((acc, cur, i) => {
              if (i === details.genres.length - 1) {
                return acc + cur.name;
              }
              return acc + cur.name + ", ";
            }, "")}
          </span>
          {details.runtime && (
            <>
              <span style={{ verticalAlign: "super", fontSize: 17 }}>.</span>
              <span>{details.runtime}m</span>
            </>
          )}
          {details.number_of_seasons && (
            <>
              <span style={{ verticalAlign: "super", fontSize: 17 }}>.</span>
              <span>{details.number_of_seasons} seasons</span>
            </>
          )}
        </p>
        <h4 className={classes.rating}>
          {details.vote_average} <StarIcon fill="#FFE600" />
        </h4>
        <p className={classes.imdb}>
          check on <span>IMDb</span>
        </p>
        <p className={classes.overview}>{details.overview}</p>
        {details.tagline && (
          <div className={classes.tagline}>
            <h3>Tagline</h3>
            <p>{details.tagline}</p>
          </div>
        )}
        <div style={{ display: "flex", marginTop: 30 }}>
          {watchProviders.results["US"] && (
            <button className={classes.watchNow}>
              Watch Now <img src="" alt="" />
            </button>
          )}

          <button className={classes.tryAnother}>
            <RestartIcon />
            <span>Try another shot</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
