import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

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
    height: "100%",
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
  
}));

function Stepper({ currentStep, setCurrentStep }) {
  const classes = useStyles();

  function handleStepClick(stepNum) {
    setCurrentStep(stepNum);
  }

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
          {children}
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
        <Step stepNum={0}>Type of content</Step>
        <Step stepNum={1}>Select Genres</Step>
        <Step stepNum={2}>Choose Ratings</Step>
        <Step stepNum={3} isLast={true}>
          OTT Platforms
        </Step>
      </ul>
    </nav>
  );
}

export default Stepper;
