import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMovieTrailer,
  getNowPlaying,
} from "../../services/movieService";

import TrailerModal from "./TrailerModal";

/* ✅ ENV IMAGE URL */
const IMAGE_URL =
  import.meta.env.VITE_TMDB_IMAGE_URL;

export default function HeroCarousel() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);
  const [trailerKey, setTrailerKey] = useState(null);

  const navigate = useNavigate();

  /* ---------------- FETCH MOVIES ---------------- */
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getNowPlaying();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  /* ---------------- AUTO SLIDE ---------------- */
  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === movies.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  /* ---------------- MANUAL ---------------- */
  const nextSlide = () => {
    setIndex((prev) =>
      prev === movies.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? movies.length - 1 : prev - 1
    );
  };

  /* ---------------- TRAILER ---------------- */
  const openTrailer = async () => {
    const trailer = await getMovieTrailer(
      movies[index].id
    );

    if (trailer) {
      setTrailerKey(trailer.key);
    } else {
      alert("Trailer not available");
    }
  };

  /* ---------------- BOOK NOW ---------------- */
  const handleBooking = () => {
    const movie = movies[index];

    navigate(`/showtimes/${movie.id}`, {
      state: {
        movieId: movie.id,
        movieTitle: movie.title,
        poster: movie.backdrop_path,
      },
    });
  };

  /* ---------------- LOADING ---------------- */
  if (!movies.length) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-gray-400">
        Loading Hero...
      </div>
    );
  }

  const movie = movies[index];

  /* ✅ DYNAMIC BACKDROP */
  const backdrop = `${IMAGE_URL}${movie.backdrop_path}`;

  return (
    <>
      {/* HERO */}
      <div
        className="relative h-[70vh] rounded-2xl overflow-hidden transition-all duration-700"
        style={{
          backgroundImage: `url(${backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70" />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-end p-10">

          <div className="bg-black/70 p-6 rounded-xl max-w-xl backdrop-blur">

            <h1 className="text-4xl font-bold mb-3">
              {movie.title}
            </h1>

            <p className="text-gray-300 text-sm mb-4">
              {movie.overview
                ? movie.overview.slice(0, 150)
                : "No description available"}...
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <button
                onClick={handleBooking}
                className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Book Now
              </button>

              <button
                onClick={openTrailer}
                className="bg-white/20 px-6 py-2 rounded-lg backdrop-blur hover:bg-white/30 transition"
              >
                Watch Trailer
              </button>

            </div>
          </div>
        </div>

        {/* LEFT */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full z-20"
        >
          ❮
        </button>

        {/* RIGHT */}
        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-3 rounded-full z-20"
        >
          ❯
        </button>

        {/* DOTS */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {movies.slice(0, 6).map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === index
                  ? "bg-red-500"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* TRAILER MODAL */}
      <TrailerModal
        videoKey={trailerKey}
        onClose={() => setTrailerKey(null)}
      />
    </>
  );
}
