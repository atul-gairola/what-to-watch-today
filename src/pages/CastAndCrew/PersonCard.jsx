import React from "react";
import { createUseStyles } from "react-jss";
import { useConfig } from "../../contexts/ConfigContext";

import personPlaceholder from "../../images/placeholderImage.png";

const useStyles = createUseStyles((theme) => ({
  container: {
    width: "100%",
    borderRadius: 10,
  },
  imageContainer: {
    width: "100%",
    marginBottom: 10,
    "& > img": {
      width: "100%",
      maxWidth: "100%",
      borderRadius: 10,
    },
  },
  contentContainer: {
    fontSize: 16,
    "& p:first-of-type": {
      fontWeight: 600,
    },
  },
}));

function PersonCard({ details }) {
  const classes = useStyles();
  const { images: imagesConfig } = useConfig();

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img
          src={
            details.profile_path
              ? imagesConfig.base_url +
                imagesConfig.poster_sizes[1] +
                details.profile_path
              : personPlaceholder
          }
          alt={details.name}
        />
      </div>
      <div className={classes.contentContainer}>
        <p>{details.name}</p>
        <p>{details.character || details.job}</p>
      </div>
    </div>
  );
}

export default PersonCard;
