import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  railOuterStyle: {
    position: "absolute",
    width: "100%",
    height: 42,
    transform: "translate(0%, -50%)",
    borderRadius: 7,
    cursor: "pointer",
  },
  railInnerStyle: {
    position: "absolute",
    width: "100%",
    height: 14,
    transform: "translate(0%, -50%)",
    borderRadius: 7,
    pointerEvents: "none",
    background: theme.color.mainHover,
    opacity: 0.5
  },
  handle1: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    zIndex: 5,
    width: 28,
    height: 42,
    cursor: "pointer",
    backgroundColor: "none",
  },
  handle2: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
    width: 24,
    height: 24,
    borderRadius: "50%",
    boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.3)",
  },
  track: {
    position: "absolute",
    transform: "translate(0%, -50%)",
    height: 14,
    zIndex: 1,
    borderRadius: 7,
    cursor: "pointer",
  },
}));

export function SliderRail({ getRailProps }) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.railOuterStyle} {...getRailProps()}></div>
      <div className={classes.railInnerStyle}></div>
    </>
  );
}

export function Handle({ domain, handle, disabled, getHandleProps }) {
  const classes = useStyles();

  return (
    <>
      <div
        style={{
          left: `${handle.percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 28,
          height: 42,
          cursor: 'pointer',
          backgroundColor: 'none',
        }}
        {...getHandleProps(handle.id)}
      />
      <div
        role="slider"
        aria-valuemin={domain.min}
        aria-valuemax={domain.max}
        aria-valuenow={handle.value}
        style={{
          left: `${handle.percent}%`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          width: 24,
          height: 24,
          borderRadius: '50%',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: disabled ? '#666' : '#9BBFD4',
        }}
      />
    </>
  );
}

export function Track({ source, target, getTrackProps, disabled = false }) {
  const classes = useStyles();
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(0%, -50%)',
        height: 14,
        zIndex: 1,
        backgroundColor: disabled ? '#999' : '#607E9E',
        borderRadius: 7,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
}

export function Tick({ tick, count, format = (d) => d }) {
  return (
    <div>
      {/* <div
        style={{
          position: "absolute",
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: "rgb(200,200,200)",
          left: `${tick.percent}%`,
        }}
      /> */}
      <div
        style={{
          position: "absolute",
          marginTop: 22,
          fontSize: 16,
          textAlign: "center",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
}
