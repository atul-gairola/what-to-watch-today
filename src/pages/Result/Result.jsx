import React from "react";
import { useParams } from "react-router-dom";

function Result() {
  const { id } = useParams();
  return <div>Result : {id}</div>;
}

export default Result;