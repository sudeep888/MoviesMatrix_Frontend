import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* ✅ ENV BACKEND URL */
const API_BASE =
  import.meta.env.VITE_API_BASE_URL;
console.log(import.meta.env.VITE_API_BASE_URL);
export default function ShowTimings() {
  const navigate = useNavigate();
  const { state } = useLocation();

  /* ---------------- STATES ---------------- */

  const [showtimes, setShowtimes] =
    useState([]);

  const [city, setCity] = useState(
    localStorage.getItem("location") ||
      "Bangalore"
  );

  /* 🔥 AUTO REFRESH WHEN LOCATION CHANGES */
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCity =
        localStorage.getItem("location");

      if (updatedCity !== city) {
        setCity(updatedCity);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [city]);

  /* ---------------- FETCH SHOWTIMES ---------------- */

  const fetchShowtimes = async (
    movieId,
    cityName
  ) => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/showtimes/${movieId}/${cityName}`
      );

      setShowtimes(res.data);
    } catch (err) {
      console.log("Showtimes Error:", err);
    }
  };


  /* ---------------- INITIAL FETCH ---------------- */

  useEffect(() => {
    if (state?.movieId) {
      fetchShowtimes(
        state.movieId,
        city
      );
    }
  }, [state?.movieId, city]);

  /* ---------------- LISTEN LOCATION CHANGE ---------------- */

  useEffect(() => {
    const handleLocationChange = () => {
      const updatedCity =
        localStorage.getItem(
          "location"
        ) || "Mumbai";

      setCity(updatedCity);
    };

    window.addEventListener(
      "locationChanged",
      handleLocationChange
    );

    return () =>
      window.removeEventListener(
        "locationChanged",
        handleLocationChange
      );
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <div
      className="
        pt-24 sm:pt-28
        px-4 sm:px-8 lg:px-16
        pb-12 sm:pb-16
        text-white
        bg-black
        min-h-screen
      "
    >

      {/* PAGE TITLE */}
      <h1
        className="
          text-xl sm:text-2xl md:text-3xl
          font-semibold
          mb-8 sm:mb-10
        "
      >
        Select Theatre & Showtime 🎬
      </h1>

      {/* THEATRE LIST */}
      <div className="flex flex-col gap-4 sm:gap-6">

        {showtimes.map((show) => (
          <div
            key={show._id}
            className="
              flex flex-col lg:flex-row
              lg:justify-between
              lg:items-center
              gap-4 lg:gap-6
              bg-gradient-to-r
              from-white/5 to-white/10
              p-4 sm:p-6
              rounded-2xl
              border border-white/10
              backdrop-blur-md
              hover:border-red-500/40
              transition
            "
          >

            {/* LEFT */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1">
                {show.theatre?.name}
              </h2>

              <p className="text-gray-400 text-xs sm:text-sm mb-2">
                {show.theatre?.location}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-600/20 text-purple-300 text-xs px-3 py-1 rounded-full">
                  IMAX 3D
                </span>

                <span className="bg-pink-600/20 text-pink-300 text-xs px-3 py-1 rounded-full">
                  4DX
                </span>
              </div>
            </div>

            {/* RIGHT — SHOWTIMES */}
            <div
              className="
                flex flex-wrap
                gap-2 sm:gap-3
                lg:justify-end
                max-w-full lg:max-w-xl
              "
            >

              {show.timings?.map((time) => (
                <button
                  key={time}
                  onClick={() =>
                    navigate("/seats", {
                      state: {
                        movie:
                          state?.movieTitle ||
                          state?.movie,
                        movieId:
                          state?.movieId,
                        theatre:
                          show.theatre?.name,
                        time,
                        showtimeId:
                          show._id,
                      },
                    })
                  }
                  className="
                    border border-white/20
                    px-3 sm:px-4
                    py-1.5 sm:py-2
                    rounded-lg
                    text-xs sm:text-sm
                    hover:bg-red-500
                    hover:border-red-500
                    transition
                  "
                >
                  {time}
                </button>
              ))}

            </div>
          </div>
        ))}

        {/* EMPTY STATE */}
        {!showtimes.length && (
          <p className="text-gray-400 text-sm">
            No shows available in {city}
          </p>
        )}

      </div>
    </div>
  );
}
