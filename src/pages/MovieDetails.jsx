import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieTrailer,
} from "../services/movieService";

import TrailerModal from "../components/movie/TrailerModal";

/* ICONS */
import { Play, Ticket } from "lucide-react";

/* ✅ ENV IMAGE URL */
const IMAGE_URL =
  import.meta.env.VITE_TMDB_IMAGE_URL;

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] =
    useState(null);

  /* FETCH DETAILS */
  useEffect(() => {
    getMovieDetails(id).then(setMovie);
  }, [id]);

  /* TRAILER */
  const openTrailer = async () => {
    const trailer =
      await getMovieTrailer(id);
    setTrailerKey(trailer?.key);
  };

  if (!movie)
    return (
      <div className="pt-24 sm:pt-28 px-4 sm:px-10 text-white">
        Loading...
      </div>
    );

  /* ✅ SAFE IMAGE BUILD */
  const backdrop = movie.backdrop_path
    ? `${IMAGE_URL}${movie.backdrop_path}`
    : null;

  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : null;

  return (
    <>
      {/* HERO SECTION */}
      <div className="pt-24 sm:pt-28 text-white">

        <div className="relative h-[70vh] sm:h-[75vh] lg:h-[80vh] w-full">

          {/* BACKDROP */}
          {backdrop && (
            <img
              src={backdrop}
              alt="backdrop"
              className="absolute w-full h-full object-cover"
            />
          )}

          {/* GRADIENT */}
          <div className="absolute w-full h-full bg-gradient-to-r from-black via-black/80 to-transparent" />

          {/* BLUR */}
          <div className="absolute w-full h-full backdrop-blur-sm bg-black/60" />

          {/* CONTENT */}
          <div
            className="
              relative z-10
              flex flex-col lg:flex-row
              items-center
              justify-center lg:justify-start
              h-full
              px-4 sm:px-8 lg:px-16
              gap-6 lg:gap-10
              text-center lg:text-left
            "
          >

            {/* POSTER */}
            <img
              src={
                poster ||
                "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt="poster"
              className="
                w-40 sm:w-52 md:w-60 lg:w-72
                rounded-xl
                shadow-2xl
                border border-white/20
              "
            />

            {/* INFO */}
            <div className="max-w-2xl">

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                {movie.title}
              </h1>

              <p className="text-yellow-400 mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">
                ⭐ {movie.vote_average.toFixed(1)} / 10
              </p>

              <p className="text-gray-300 mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {movie.overview}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">

                {/* TRAILER */}
                <button
                  onClick={openTrailer}
                  className="
                    group px-8 py-3 rounded-md font-semibold
                    bg-white text-black
                    flex items-center justify-center gap-3
                    hover:bg-gray-200 hover:scale-105
                    transition-all duration-300
                    shadow-xl shadow-black/40
                  "
                >
                  <Play
                    size={20}
                    fill="black"
                    className="group-hover:scale-110 transition"
                  />
                  Watch Trailer
                </button>

                {/* BOOK */}
                <button
                  onClick={() =>
                    navigate(`/showtimes/${id}`, {
                      state: {
                        movie: movie.title,
                        movieId: id,
                      },
                    })
                  }
                  className="
                    group px-8 py-3 rounded-md font-semibold
                    bg-red-600 text-white
                    flex items-center justify-center gap-3
                    hover:bg-red-700 hover:scale-105
                    transition-all duration-300
                    shadow-xl shadow-red-900/50
                    hover:shadow-red-700/60
                  "
                >
                  <Ticket
                    size={20}
                    className="group-hover:rotate-6 transition"
                  />
                  Book Tickets
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRAILER MODAL */}
      <TrailerModal
        videoKey={trailerKey}
        onClose={() =>
          setTrailerKey(null)
        }
      />
    </>
  );
}
