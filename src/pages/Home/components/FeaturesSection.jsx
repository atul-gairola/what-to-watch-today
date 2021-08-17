import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useMediaQuery } from "react-responsive";

import { ReactComponent as ChooseIcon } from "../../../images/chooseIcon.svg";
import { ReactComponent as GemIcon } from "../../../images/gemIcon.svg";
import { ReactComponent as DiceIcon } from "../../../images/diceIcon.svg";

const useStyles = createUseStyles((theme) => ({
  section: {
    background: theme.color.main,
    color: theme.color.secondary,
    padding: "100px 50px",
    "& > h2": {
      textAlign: "center",
      marginBottom: 100,
    },
  },
  featureWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyContent: "center",
    justifyItems: "center",
    gridGap: 50,
  },
  featureContainer: {
    textAlign: "center",
    display: "grid",
    justifyItems: "center",
    gridGap: 20,
    "& > p": {
      fontSize: 16,
      fontWeight: 500,
      maxWidth: "70%",
    },
  },
  featureIcon: {
    background: theme.color.secondary,
    width: 200,
    height: 200,
    borderRadius: "50%",
    display: "grid",
    placeContent: "center",
  },
  [`@media (max-width: ${theme.viewports.smallTablet})`]: {
    featureContainer: {
      gridGap: 10,
    },
    featureIcon: {
      background: theme.color.secondary,
      width: 150,
      height: 150,
    },
  },
  [`@media (max-width: ${theme.viewports.mobile})`]: {
    featureWrapper: {
      display: "grid",
      gridTemplateColumns: "1fr",
    },
    featureContainer: {
      gridGap: 10,
    },
    featureIcon: {
      background: theme.color.secondary,
      width: 150,
      height: 150,
    },
  },
  [`@media (max-width: ${theme.viewports.smallMobile})`]: {
    section: {
      padding: "70px 50px",
      "& > h2": {
        textAlign: "center",
        marginBottom: 60,
      },
    },
    featureIcon: {
      background: theme.color.secondary,
      width: 100,
      height: 100,
    },
    featureContainer: {
      "& > p": {
        fontSize: 16,
        fontWeight: 400,
        maxWidth: "70%",
      },
    },
  },
}));

function FeaturesSection() {
  const theme = useTheme();
  const classes = useStyles();

  const isMobile = useMediaQuery({
    query: `(max-device-width: ${theme.viewports.mobile})`,
  });

  return (
    <section className={classes.section}>
      <h2>What can it help you with ?</h2>
      <div className={classes.featureWrapper}>
        <div className={classes.featureContainer}>
          <div className={classes.featureIcon}>
            <ChooseIcon
              width={isMobile ? "50px" : "70px"}
              height={isMobile ? "50px" : "70px"}
              fill={theme.color.main}
            />
          </div>
          <p>Don't get stuck on choosing what to watch, let it help.</p>
        </div>
        <div className={classes.featureContainer}>
          <div className={classes.featureIcon}>
            <GemIcon
              width={isMobile ? "50px" : "70px"}
              height={isMobile ? "50px" : "70px"}
              fill={theme.color.main}
            />
          </div>
          <p>Find some hidden gems to watch and brag about later.</p>
        </div>
        <div className={classes.featureContainer}>
          <div className={classes.featureIcon}>
            <DiceIcon
              width={isMobile ? "50px" : "70px"}
              height={isMobile ? "50px" : "70px"}
              fill={theme.color.main}
            />
          </div>
          <p>
            Roll the dice and be less picky about the results to have more fun.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
