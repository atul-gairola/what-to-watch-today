import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { createUseStyles } from "react-jss";

import ResultLayout from "../../Layout/ResultLayout";
import Loading from "../../components/Loading";
import Hero from "./components/Hero";
import ClipsSection from "./components/ClipsSection";
import CastSection from "./components/CastSection";
import CrewSection from "./components/CrewSection";
import WatchPlatforms from "./components/WatchPlatforms";
import StatsSection from "./components/StatsSection";

const useStyles = createUseStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
  },
}));

function Result() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const [watchProviders, setWatchProviders] = useState([]);
  const [credits, setCredits] = useState();
  const [videos, setVideos] = useState([]);
  const [imdbId, setImdbId] = useState("");

  const { id, type } = useParams();
  const classes = useStyles();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);

      // get general details
      const { data: details } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );

      // get watch providers
      const { data: watchProviders } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&watch_region=${
          JSON.parse(localStorage.getItem("location")).countryCode
        }`
      );

      // get credits
      const { data: credits } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );

      // get videos
      const { data: videos } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US
        `
      );

      // get imdb id
      const {
        data: { imdb_id },
      } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/external_ids?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );

      setDetails(details);
      setWatchProviders(watchProviders.results);
      setVideos(videos.results);
      setCredits(credits);
      setImdbId(imdb_id);
      // console.log({ details, watchProviders, images, videos, credits });
      setLoading(false);
    };

    fetchDetails();
  }, []);

  return (
    <ResultLayout>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Hero
            details={details}
            watchProviders={watchProviders}
            type={type}
            imdbId={imdbId}
          />
          <div className={classes.container}>
            <div>
              {videos.length > 0 && <ClipsSection videos={videos} />}
              {credits && credits.cast.length > 0 && (
                <CastSection cast={credits.cast} />
              )}
              {credits && credits.crew.length > 0 && (
                <CrewSection crew={credits.crew} />
              )}
            </div>
            <div>
              <WatchPlatforms watchProviders={watchProviders} />
              <StatsSection details={details} type={type} />
            </div>
          </div>
        </div>
      )}
    </ResultLayout>
  );
}

export default Result;
