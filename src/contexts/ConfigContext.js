import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const ConfigContext = createContext();

export function useConfig() {
  return useContext(ConfigContext);
}

export function ConfigProvider({ children }) {
  const [tmdbConfig, setTmdbConfig] = useState();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data: config } = await axios.get(`
        https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);

        setTmdbConfig(config);
      } catch (e) {
        console.log(e);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={tmdbConfig}>
      {children}
    </ConfigContext.Provider>
  );
}
