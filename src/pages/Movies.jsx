import { useEffect, useState } from "react";
import MovieCard from "../components/movie/MovieCard";
import { getNowPlaying } from "../services/movieService";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getNowPlaying().then(setMovies);
  }, []);

  return (
    <div
      className="
        pt-24 sm:pt-28
        
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16
        
        text-white
        
        min-h-screen
        
        bg-black
      "
    >

      {/* 🎬 PAGE HEADER */}
      <div className="mb-10 sm:mb-12">

        {/* TITLE */}
        <h1
          className="
            text-2xl sm:text-3xl md:text-4xl
            
            font-semibold
            
            tracking-wide
            
            mb-3
          "
        >
          Now Playing Movies
        </h1>

        {/* NETFLIX RED UNDERLINE */}
        <div
          className="
            w-20 sm:w-28 h-[3px]
            
            bg-red-600
            
            rounded-full
          "
        />
      </div>

      {/* 🎞️ MOVIE GRID */}
      <div
        className="
          grid
          
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          
          gap-5 sm:gap-6 md:gap-7 lg:gap-8
        "
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="
              transform
              hover:scale-105
              transition
              duration-300
            "
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

    </div>
  );
}
