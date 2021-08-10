import React from "react";
import { createUseStyles } from "react-jss";
import { useConfig } from "../../../contexts/ConfigContext";

import { getYear } from "../../../utils";
import { ReactComponent as StarIcon } from "../../../images/starIcon.svg";

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
    gridGap: 22,
    paddingBottom: 22,
  },
  poster: {
    width: 278,
    height: 376,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 10,
  },
  undername: {
    color: "#B8C4DB",
    fontSize: 15,
    "& > span": {
      marginRight: 5,
    },
  },
  rating: {
    color: "#FFE600",
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
    marginRight: 20
  },
  tryAnother: {
    color: theme.color.main,
    background: "transparent",
    border: "none",
    fontWeight: 600,
    fontSize: 15,
    paddingBottom: 8,
    borderBottom: `1px solid ${theme.color.main}`,
  },
}));

function Hero({ details, watchProviders }) {
  const classes = useStyles();
  const { images } = useConfig();
  console.log(details);
  console.log(watchProviders);
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(40, 44, 52, 0) 10.68%, #282C34 67.34%), linear-gradient(179.88deg, #000000 0.11%, rgba(40, 44, 52, 0.52) 66.78%), url("${
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
            {getYear(details.release_date) || getYear(details.first_air_date)}
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
        </p>
        <h4 className={classes.rating}>
          {details.vote_average} <StarIcon fill="#FFE600" />
        </h4>
        <p>
          check on <span>IMDb</span>
        </p>
        <p>{details.overview}</p>
        {details.tagline && (
          <div>
            <h3>Tagline</h3>
            <p>{details.tagline}</p>
          </div>
        )}

        <button className={classes.watchNow}>
          Watch Now <img src="" alt="" />
        </button>

        <button className={classes.tryAnother}>Try another shot</button>
      </div>
    </section>
  );
}

export default Hero;
