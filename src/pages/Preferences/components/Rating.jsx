import React from "react";
import { createUseStyles } from "react-jss";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

import { SliderRail, Handle, Track, Tick } from "./DoubleSliderComponents";

const useStyles = createUseStyles((theme) => ({
  container: {
    display: "grid",
    placeContent: "center",
    gridGap: 100,
    "& > h3": {
      fontSize: "2.5rem",
    },
  },
  inputContainer: {
    paddingBottom: 20,
  },
}));

function Rating({ ratings, setRatings }) {
  const domain = [0, 10];

  const classes = useStyles();

  const handleUpdate = (update) => {
    setRatings(update);
  };

  const sliderStyle = {
    position: "relative",
    width: "100%",
  };


  return (
    <section className={classes.container}>
      <div style={{ width: "80vw" }}>
        <Slider
          mode={2}
          step={1}
          domain={domain}
          values={ratings}
          onUpdate={handleUpdate}
          rootStyle={sliderStyle}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className={classes.sliderHandles}>
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className={classes.sliderTracks}>
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={10}>
            {({ ticks }) => (
              <div>
                {ticks.map((tick) => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    </section>
  );
}

export default Rating;
