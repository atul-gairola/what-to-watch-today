import React from "react";
import { createUseStyles } from "react-jss";

import { useConfig } from "../../../contexts/ConfigContext";
import personPlaceholder from "../../../images/placeholderImage.png";

const useStyles = createUseStyles((theme) => ({
  section: {
    margin: "0px 50px",
    paddingTop: "100px",
  },
  container: {
    display: "flex",
    marginTop: 20,
    maxWidth: "60vw",
    height: "auto",
    overflowY: "auto",
    paddingBottom: 10,
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

function Crew({ details, imagesConfig }) {
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
        <p>{details.job}</p>
      </div>
    </div>
  );
}

function CrewSection({ crew }) {
  const classes = useStyles();
  const { images } = useConfig();
  return (
    <section className={classes.section}>
      <h2>Crew</h2>
      <div className={classes.container}>
        {crew.slice(0, 10).map((cur, i) => (
          <Crew key={i} details={cur} imagesConfig={images} />
        ))}
      </div>
    </section>
  );
}

export default CrewSection;
