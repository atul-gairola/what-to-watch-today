import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  section: {
    padding: "10px 50px",
    paddingTop: "50px",
    position: "relative",
  },
  container: {
    display: "flex",
    marginTop: 20,
    maxWidth: "60vw",
    overflowY: "auto",
    paddingBottom: 20,
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
  video: {
    border: "none",
    borderRadius: 10,
    display: "inline-block",
    marginRight: 30,
    background: "rgba(0,0,0,0.8)",
  },
  overlay: {
    position: "absolute",
    background:
      "linear-gradient(269.68deg, #282C34 7%, rgba(40, 44, 52, 0) 61.25%)",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
}));

function ClipsSection({ videos }) {
  const classes = useStyles();
  return (
    <section className={classes.section}>
      <h2>Clips</h2>
      <div className={classes.container}>
        {videos.map((cur, i) => (
          <iframe
            key={i}
            className={classes.video}
            width={400}
            height={222}
            title={cur.key}
            src={`https://www.youtube.com/embed/${cur.key}`}
          ></iframe>
        ))}
      </div>
      <div className={classes.overlay}></div>
    </section>
  );
}

export default ClipsSection;
