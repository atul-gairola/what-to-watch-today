import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ResultLayout from "../../Layout/ResultLayout";
import Loading from "../../components/Loading";
import Hero from "./components/Hero";
import ClipsSection from "./components/ClipsSection";
import CastSection from "./components/CastSection";

function Result() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState();
  const [watchProviders, setWatchProviders] = useState([]);
  const [credits, setCredits] = useState();
  const [videos, setVideos] = useState([]);

  const { id, type } = useParams();

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

      // get images
      const { data: images } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );

      // get videos

      const { data: videos } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US
        `
      );

      setDetails(details);
      setWatchProviders(watchProviders);
      setVideos(videos.results);
      setCredits(credits);
      console.log({ details, watchProviders, images, videos, credits });
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
          <Hero details={details} watchProviders={watchProviders} type={type} />
          <div>
            <div>
              {videos.length > 0 && <ClipsSection videos={videos} />}
              {credits && <CastSection cast={credits.cast} />}
            </div>
            <div></div>
          </div>
        </div>
      )}
    </ResultLayout>
  );
}

export default Result;
