import axios from "axios";
import {
  useEffect,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

/* 🎬 PROFESSIONAL ICONS */
import {
  Clock,
  Film,
  IndianRupee,
  MapPin,
  Ticket,
} from "lucide-react";

/* ✅ ENV CONFIG */
const TMDB_BASE =
  import.meta.env
    .VITE_TMDB_BASE_URL;

const TMDB_KEY =
  import.meta.env
    .VITE_TMDB_API_KEY;

export default function Checkout() {
  const { state } =
    useLocation();
  const navigate =
    useNavigate();

  const [movieTitle, setMovieTitle] =
    useState(
      state?.movie
    );

  /* ---------------- FALLBACK FETCH ---------------- */
  useEffect(() => {
    const fetchTitle =
      async () => {
        if (
          !state?.movie &&
          state?.movieId
        ) {
          try {
            const res =
              await axios.get(
                `${TMDB_BASE}/movie/${state.movieId}?api_key=${TMDB_KEY}`
              );

            setMovieTitle(
              res.data.title
            );
          } catch (err) {
            console.log(
              "Movie fetch error:",
              err
            );
          }
        }
      };

    fetchTitle();
  }, [state]);

  if (!state)
    return null;

  return (
    <div
      className="
        pt-24 sm:pt-28
        px-4 sm:px-8 lg:px-10
        text-white
        min-h-screen
        bg-black
      "
    >
      {/* PAGE TITLE */}
      <h1
        className="
          text-xl sm:text-2xl md:text-3xl
          mb-8 sm:mb-10
          font-semibold
          tracking-wide
        "
      >
        Booking Summary
      </h1>

      {/* SUMMARY CARD */}
      <div
        className="
          max-w-md mx-auto
          bg-gradient-to-b
          from-white/10 to-white/5
          backdrop-blur-xl
          border border-white/10
          p-5 sm:p-6
          rounded-2xl
          shadow-[0_0_40px_rgba(0,0,0,0.8)]
          space-y-4
        "
      >
        {/* MOVIE */}
        <div className="flex items-center gap-3">
          <Film
            size={18}
            className="text-red-500"
          />
          <p className="text-gray-200">
            {movieTitle}
          </p>
        </div>

        {/* THEATRE */}
        <div className="flex items-center gap-3">
          <MapPin
            size={18}
            className="text-blue-400"
          />
          <p className="text-gray-300">
            {state.theatre}
          </p>
        </div>

        {/* TIME */}
        <div className="flex items-center gap-3">
          <Clock
            size={18}
            className="text-yellow-400"
          />
          <p className="text-gray-300">
            {state.time}
          </p>
        </div>

        {/* SEATS */}
        <div className="flex items-center gap-3">
          <Ticket
            size={18}
            className="text-pink-400"
          />
          <p className="text-gray-300">
            {state.seats
              .map(
                (s) => s.seat
              )
              .join(", ")}
          </p>
        </div>

        {/* TOTAL */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/10">
          <IndianRupee
            size={18}
            className="text-green-400"
          />
          <p className="font-semibold text-lg">
            ₹{state.total}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() =>
            navigate(
              "/payment",
              { state }
            )
          }
          className="
            mt-4 w-full
            bg-red-600
            py-3
            rounded-lg
            font-semibold
            hover:bg-red-700
            hover:scale-105
            transition-all duration-300
            shadow-lg shadow-red-900/50
            hover:shadow-red-700/60
          "
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
