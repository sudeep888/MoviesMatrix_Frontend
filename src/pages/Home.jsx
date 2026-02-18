import { useEffect, useState } from "react";

import HeroCarousel from "../components/movie/HeroCarousel";
import MovieRow from "../components/movie/MovieRow";

import {
  getMoviesByRegion,
  getTopRated,
  getTrendingMovies,
  getUpcoming,
} from "../services/movieService";

export default function Home() {
  const [india, setIndia] = useState([]);
  const [us, setUS] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    getMoviesByRegion("IN").then(setIndia);
    getMoviesByRegion("US").then(setUS);
    getTrendingMovies().then(setTrending);
    getTopRated().then(setTopRated);
    getUpcoming().then(setUpcoming);
  }, []);

  return (
    <div
      className="
        px-4        /* Mobile */
        sm:px-6     /* Small tablets */
        md:px-8     /* Tablets */
        lg:px-10    /* Desktop */
        xl:px-16    /* Large screens */
        py-6 sm:py-8
        space-y-8 sm:space-y-10
      "
    >

      {/* HERO */}
      <HeroCarousel />

      {/* ROWS */}
      <MovieRow
        title="Popular Indian Movies 🇮🇳"
        movies={india}
      />

      <MovieRow
        title="Hollywood Blockbusters 🇺🇸"
        movies={us}
      />

      <MovieRow
        title="Trending Worldwide 🔥"
        movies={trending}
      />

      <MovieRow
        title="Top Rated ⭐"
        movies={topRated}
      />

      <MovieRow
        title="Upcoming Releases 🎬"
        movies={upcoming}
      />

    </div>
  );
}
