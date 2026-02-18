import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/movieService";
import MovieCard from "./MovieCard";

export default function MovieGrid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies);
  }, []);

  if (!movies.length) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading Movies...
      </div>
    );
  }

  return (
    <div className="mt-16">

      <h1 className="text-3xl font-bold mb-8">
        Trending Now 🔥
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

    </div>
  );
}
