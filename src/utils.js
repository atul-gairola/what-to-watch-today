import axios from "axios";

import endpoints from "./config/endpoints";

export async function getSuggestion(hasPreferences, preferences) {
  let count = 0,
    maxCount = 20;

  async function fetchSuggestion(hasPreferences, preferences) {
    count++;

    if (count >= maxCount) {
      return null;
    }

    // select if it will be a  movie or a show
    const flag = Math.floor(Math.random() * 2);
    let typeOfContent = hasPreferences
      ? preferences.type
      : flag
      ? "movie"
      : "tv";

    // get watch region
    const watch_region = JSON.parse(
      localStorage.getItem("location")
    ).countryCode;

    let genreList = [];

    if (
      hasPreferences &&
      Array.isArray(preferences.selectedGenres) &&
      preferences.selectedGenres.length > 0
    ) {
      genreList = preferences.selectedGenres;
    } else {
      // randomize genre
      let genreURL =
        typeOfContent === "movie"
          ? endpoints.getMovieGenres
          : endpoints.getShowGenres;

      const {
        data: { genres },
      } = await axios.get(genreURL);

      let genreCount = Math.floor(Math.random() * 8) + 2;

      while (genreCount > 0) {
        const genreNum = Math.floor(Math.random() * genres.length);

        genreList.push(genres[genreNum].id);
        genres.splice(genres[genreNum], 1);
        genreCount--;
      }
    }

    let min = 0,
      max = 10;

    if (hasPreferences && preferences.ratings.length === 2) {
      max = preferences.ratings[1];
      min = preferences.ratings[0];
    }

    const url = `https://api.themoviedb.org/3/discover/${typeOfContent}?api_key=${
      process.env.REACT_APP_TMDB_API_KEY
    }&language=en-US&include_adult=true&include_video=true&vote_average.gte=${min}&vote_average.lte=${max}&with_genres=${genreList.join(
      "|"
    )}&watch_region=${watch_region}`;

    const { data } = await axios.get(url);

    if (data.total_pages === 0 && count < maxCount) {
      if (hasPreferences) {
        return await fetchSuggestion(true, preferences);
      } else {
        return await fetchSuggestion();
      }
    }

    const randomResultPageNum =
      Math.floor(Math.random() * data.total_pages) + 1;
    const randomArrIndex = Math.floor(Math.random() * 20);

    let item;

    if (randomResultPageNum === 1) {
      item = data.results[randomArrIndex];
    } else {
      const { data: finalData } = await axios.get(
        `${url}&page=${randomResultPageNum}`
      );
      item = finalData.results[randomArrIndex];
    }

    return { typeOfContent, item };
  }

  return await fetchSuggestion(hasPreferences, preferences);
}

export function getYear(str) {
  if (str) return str.split("-")[0];
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}