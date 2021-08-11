import React from "react";
import { createUseStyles } from "react-jss";

import { useConfig } from "../../../contexts/ConfigContext";

const useStyles = createUseStyles((theme) => ({
  section: {
    margin: "0px 50px",
    paddingTop: "50px",
    maxWidth: 500,
    overflowY: "auto",
  },
  container: {
    display: "flex",
    marginTop: 20,
  },
  castContainer: {
    marginRight: 20,
    display: "grid",
    alignItems: "center",
  },
  image: {
      width: 100
  }
}));

function Cast({ details, imagesConfig }) {
  const classes = useStyles();
  return (
    <div className={classes.castContainer}>
      <div className={classes.image} >
        <img style={{width: "100%"}} src={imagesConfig.base_url + imagesConfig.poster_sizes[2] + details.profile_path} alt="" />
      </div>
      <div>
        <p>{details.character}</p>
        <p>{details.name}</p>
      </div>
    </div>
  );
}

function CastSection({ cast }) {
  const classes = useStyles();
  const { images } = useConfig();
  console.log(cast);
  return (
    <section className={classes.section}>
      <h2>Cast</h2>
      <div className={classes.container}>
        {cast.slice(0, 10).map((cur) => (
          <Cast details={cur} imagesConfig={images} />
        ))}
      </div>
    </section>
  );
}

export default CastSection;
