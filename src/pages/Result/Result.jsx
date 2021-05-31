import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../../Layout/Layout";
import Loading from "../../components/Loading";

function Result() {
  const [loading, setLoading] = useState();
  const [details, setDetails] = useState();
  const [config, setConfig] = useState();

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
        `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
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

      // get config
      const { data: config } = await axios.get(`
      https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);

      setDetails(details);
      setConfig(config);
      console.log({ details, config, watchProviders, images, videos, credits });
      setLoading(false);
    };

    fetchDetails();
  }, []);

  return <Layout>{loading ? <Loading /> : <div></div>}</Layout>;
}

export default Result;
