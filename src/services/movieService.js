import axios from "axios";

/* ✅ ENV VARIABLES */
const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL;

/* NOW PLAYING */
export const getNowPlaying = async () => {
  const res = await axios.get(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
  );
  return res.data.results;
};

/* TRENDING */
export const getTrendingMovies = async () => {
  const res = await axios.get(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );
  return res.data.results;
};

/* TOP RATED */
export const getTopRated = async () => {
  const res = await axios.get(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  return res.data.results;
};

/* UPCOMING */
export const getUpcoming = async () => {
  const res = await axios.get(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
  );
  return res.data.results;
};

/* REGION */
export const getMoviesByRegion = async (
  country
) => {
  const res = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=${country}&watch_region=${country}&sort_by=popularity.desc`
  );
  return res.data.results;
};

/* DETAILS */
export const getMovieDetails = async (
  id
) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return res.data;
};

/* TRAILER */
export const getMovieTrailer = async (
  movieId
) => {
  const res = await axios.get(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  const videos = res.data.results;

  /* 1️⃣ Official Trailer */
  let trailer = videos.find(
    (vid) =>
      vid.type === "Trailer" &&
      vid.site === "YouTube"
  );

  /* 2️⃣ Teaser Fallback */
  if (!trailer) {
    trailer = videos.find(
      (vid) =>
        vid.type === "Teaser" &&
        vid.site === "YouTube"
    );
  }

  /* 3️⃣ Any YouTube Video */
  if (!trailer) {
    trailer = videos.find(
      (vid) =>
        vid.site === "YouTube"
    );
  }

  return trailer;
};
