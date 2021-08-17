import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { createUseStyles } from "react-jss";

import Layout from "../../Layout/Layout";
import Loading from "../../components/Loading";
import PersonCard from "./PersonCard";

const useStyles = createUseStyles((theme) => ({
  wrapper: {
    marginBottom: 50,
    "& > h1": {
      fontSize: 30,
      marginBottom: 20,
    },
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, 200px)",
    justifyContent: "center",
    gridGap: 20,
  },
}));
function CastAndCrew() {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id, type } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      const { data: credits } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );

      setCast(credits.cast);
      setCrew(credits.crew);
      setLoading(false);
    };

    fetchCredits();
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <section>
          {cast.length > 0 && (
            <div className={classes.wrapper}>
              <h1>Cast</h1>
              <div className={classes.container}>
                {cast.map((cur, i) => (
                  <PersonCard key={i} details={cur} />
                ))}
              </div>
            </div>
          )}
          {crew.length > 0 && (
            <div className={classes.wrapper} style={{ marginTop: 150 }}>
              <h1>Crew</h1>
              <div className={classes.container}>
                {crew.map((cur, i) => (
                  <PersonCard key={i} details={cur} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </Layout>
  );
}

export default CastAndCrew;
