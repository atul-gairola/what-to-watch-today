import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";

import { useConfig } from "../../../contexts/ConfigContext";

const useStyles = createUseStyles((theme) => ({
  section: {
    padding: "50px 50px 0 0",
  },
  container: {
    marginTop: 10,
  },
  wrapper: {
    marginTop: 10,
  },
  iconContainer: {
    marginTop: 10,
    display: "flex",
  },
  icon: {
    width: 50,
    borderRadius: 10,
    marginRight: 10,
  },
}));

function WatchPlatforms({ watchProviders }) {
  const [currentCountry, setCurrentCountry] = useState("");
  const classes = useStyles();
  const { images } = useConfig();

  useEffect(() => {
    setCurrentCountry(JSON.parse(localStorage.getItem("location")).countryCode);
  }, []);

  return (
    <section className={classes.section}>
      <h2>Watch Platforms</h2>
      <div className={classes.container}>
        {watchProviders[currentCountry] ? (
          <div>
            {watchProviders[currentCountry].flatrate &&
              watchProviders[currentCountry].flatrate.length > 0 && (
                <div className={classes.wrapper}>
                  <h4>Stream</h4>
                  <div className={classes.iconContainer}>
                    {watchProviders[currentCountry].flatrate.map((cur, i) => (
                      <a
                        key={i}
                        className={classes.icon}
                        href={watchProviders[currentCountry].link}
                      >
                        <img
                          style={{ width: "inherit", borderRadius: "inherit" }}
                          src={
                            images.base_url +
                            images.poster_sizes[0] +
                            cur.logo_path
                          }
                          alt={cur.provider_name}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            {watchProviders[currentCountry].rent &&
              watchProviders[currentCountry].rent.length > 0 && (
                <div className={classes.wrapper}>
                  <h4>Rent</h4>
                  <div className={classes.iconContainer}>
                    {watchProviders[currentCountry].rent.map((cur, i) => (
                      <a
                        key={i}
                        className={classes.icon}
                        href={watchProviders[currentCountry].link}
                      >
                        <img
                          style={{ width: "inherit", borderRadius: "inherit" }}
                          src={
                            images.base_url +
                            images.poster_sizes[0] +
                            cur.logo_path
                          }
                          alt={cur.provider_name}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

            {watchProviders[currentCountry].buy &&
              watchProviders[currentCountry].buy.length > 0 && (
                <div className={classes.wrapper}>
                  <h4>Buy</h4>
                  <div className={classes.iconContainer}>
                    {watchProviders[currentCountry].buy.map((cur, i) => (
                      <a
                        key={i}
                        className={classes.icon}
                        href={watchProviders[currentCountry].link}
                      >
                        <img
                          style={{ width: "inherit", borderRadius: "inherit" }}
                          src={
                            images.base_url +
                            images.poster_sizes[0] +
                            cur.logo_path
                          }
                          alt={cur.provider_name}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
          </div>
        ) : (
          <p>Sorry could not find any watch providers in your country :(</p>
        )}
      </div>
    </section>
  );
}

export default WatchPlatforms;
