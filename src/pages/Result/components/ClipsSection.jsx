import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme) => ({
  section: {
    padding: "10px 50px",
    paddingTop: "50px",
  },
  container: {
    display: "flex",
    marginTop: 20,
  },
  video: {
    marginRight: 30,
    border: "none",
    borderRadius: 10,
  },
}));

function ClipsSection({ videos }) {
  const classes = useStyles();
  console.log(videos);
  return (
    <section className={classes.section}>
      <h2>Clips</h2>
      <div className={classes.container}>
        {videos.map((cur) => (
          <iframe
            width={422}
            className={classes.video}
            height={222}
            src={`https://www.youtube.com/embed/${cur.key}`}
          ></iframe>
        ))}
      </div>
    </section>
  );
}

export default ClipsSection;
