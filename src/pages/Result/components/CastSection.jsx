import React from "react";
import { createUseStyles } from "react-jss";

import { useConfig } from "../../../contexts/ConfigContext";
import personPlaceholder from "../../../images/placeholderImage.png";

const useStyles = createUseStyles((theme) => ({
  section: {
    margin: "0px 50px",
    paddingTop: "70px",
  },
  container: {
    display: "flex",
    marginTop: 20,
    maxWidth: "80vw",
    height: "auto",
    paddingBottom: 10,
    maxWidth: "60vw",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      height: 8,
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "20px",
      background: "rgba(255,255,255,0.5)",
    },
  },
  castContainer: {
    marginRight: 20,
    display: "grid",
    gridGap: 5,
    "& p": {
      fontSize: 15,
    },
    "& p:first-of-type": {
      fontWeight: "bold",
    },
    "& p:last-of-type": {
      fontSize: 15,
    },
  },
  image: {
    width: 150,
    height: 224,
  },
}));

function Cast({ details, imagesConfig }) {
  const classes = useStyles();
  return (
    <div className={classes.castContainer}>
      <div className={classes.image}>
        <img
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          src={
            details.profile_path
              ? imagesConfig.base_url +
                imagesConfig.poster_sizes[2] +
                details.profile_path
              : personPlaceholder
          }
          alt={details.name}
        />
      </div>
      <div style={{ alignSelf: "top" }}>
        <p>{details.name}</p>
        <p>{details.character}</p>
      </div>
    </div>
  );
}

function CastSection({ cast }) {
  const classes = useStyles();
  const { images } = useConfig();
  return (
    <section className={classes.section}>
      <h2>Cast</h2>
      <div className={classes.container}>
        {cast.slice(0, 10).map((cur, i) => (
          <Cast key={i} details={cur} imagesConfig={images} />
        ))}
      </div>
    </section>
  );
}

export default CastSection;
