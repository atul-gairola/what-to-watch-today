import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";

import { ReactComponent as BackIcon } from "../../../images/backIcon.svg";
import { ReactComponent as ForwardIcon } from "../../../images/forwardIcon.svg";

const useStyles = createUseStyles((theme) => ({
  stepper: {
    width: "100%",
    display: "flex",
    placeContent: "center",
  },
  stepsContainer: {
    display: "flex",
  },
  step: {
    textDecoration: "none",
    display: "block",
    alignItems: "center",
    cursor: "pointer",
    opacity: 0.3,
    paddingBottom: 10,
  },
  line: {
    width: 150,
    margin: "0 30px",
    position: "relative",
    height: 24,

    "& div": {
      position: "absolute",
      top: "50%",
      height: 2,
      transform: "translateY(-50%)",
      width: "100%",
      background: theme.color.main,
      opacity: 0.3,
    },
  },
  active: {
    transition: 0.7,
    opacity: 1,
    transform: "scale(1.1)",
    borderBottom: "1px solid " + theme.color.main,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: theme.color.main,
  },
  mobileNav: {
    display: "flex",
    width: "100%",
    fontSize: ".8rem",
    marginTop: 20,
  },
  button: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    maxWidth: "fit-content",
    gridGap: 10,
    alignItems: "center",
  },
  prev: {
    flexGrow: 1,
  },
  [`@media (max-width: ${theme.viewports.tablet})`]: {
    line: {
      width: 100,
      margin: "0 20px",
    },
    step: {
      fontSize: ".9rem",
    },
  },
  [`@media (max-width: ${theme.viewports.smallTablet})`]: {
    line: {
      width: 80,
      margin: "0 20px",
    },
    step: {
      fontSize: ".9rem",
    },
  },
  [`@media (max-width: ${theme.viewports.mobile})`]: {
    line: {
      width: 50,
      margin: "0 20px",
    },
    step: {
      fontSize: ".9rem",
    },
  },
  [`@media (max-width: ${theme.viewports.smallMobile})`]: {
    stepper: {
      width: "100%",
      display: "grid",
      placeContent: "unset",
    },
    active: {
      borderBottom: "none",
    },
    line: {
      height: 10,
      width: "20%",
    },
    step: {
      paddingBottom: 0,
    },
  },
}));

function Stepper({ currentStep, setCurrentStep }) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallTablet = useMediaQuery({
    query: `(max-device-width: ${theme.viewports.smallTablet})`,
  });
  const isSmallMobile = useMediaQuery({
    query: `(max-device-width: ${theme.viewports.smallMobile})`,
  });

  function handleStepClick(stepNum) {
    setCurrentStep(stepNum);
  }

  function handlePrev() {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep(currentStep - 1);
  }

  function handleNext() {
    if (currentStep === 3) {
      return;
    }
    setCurrentStep(currentStep + 1);
  }

  const steps = ["Type", "Genres", "Ratings", "OTT"];

  function Step({ children, isLast, stepNum, ...props }) {
    return (
      <>
        <li
          {...props}
          onClick={() => handleStepClick(stepNum)}
          className={clsx(
            classes.step,
            currentStep === stepNum && classes.active
          )}
        >
          {isSmallMobile ? <div className={classes.dot}></div> : children}
        </li>
        {!isLast && (
          <div className={classes.line}>
            <div></div>
          </div>
        )}
      </>
    );
  }

  return (
    <nav className={classes.stepper}>
      <ul className={classes.stepsContainer}>
        <Step stepNum={0}>Type {!isSmallTablet && "of content"}</Step>
        <Step stepNum={1}>{!isSmallTablet && "Select"} Genres</Step>
        <Step stepNum={2}>{!isSmallTablet && "Choose"} Ratings</Step>
        <Step stepNum={3} isLast={true}>
          OTT {!isSmallTablet && "Platforms"}
        </Step>
      </ul>
      {isSmallMobile && (
        <div className={classes.mobileNav}>
          <div className={classes.prev}>
            {currentStep !== 0 && (
              <div className={classes.button} onClick={handlePrev}>
                <BackIcon width={10} fill={theme.color.main} />
                {steps[currentStep - 1]}
              </div>
            )}
          </div>
          {currentStep !== steps.length - 1 && (
            <div className={classes.button} onClick={handleNext}>
              {steps[currentStep + 1]}
              <ForwardIcon width={10} fill={theme.color.main} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Stepper;
