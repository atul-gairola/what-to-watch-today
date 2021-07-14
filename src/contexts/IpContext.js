import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const IpContext = createContext();

export function useIp() {
  return useContext(IpContext);
}

export function IpDataProvider({ children }) {
  const [ipData, setIpData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const { data } = await axios.get("http://ip-api.com/json");
      //   console.log("Ip data: ", data);
      //   setIpData(data);
      // } catch (e) {
      //   console.log(e);
      // }
    };

    fetchData();
  }, []);

  return <IpContext.Provider value={{ ipData }}>{children}</IpContext.Provider>;
}
