import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useState } from "react";

/* ✅ ENV VARIABLES */

const API_BASE =
  import.meta.env
    .VITE_API_BASE_URL;

const API_KEY =
  import.meta.env
    .VITE_TMDB_API_KEY;

const BASE_URL =
  import.meta.env
    .VITE_TMDB_BASE_URL;

const IMAGE_URL =
  import.meta.env
    .VITE_TMDB_IMAGE_URL;

export default function Profile() {
  const [bookings, setBookings] =
    useState([]);

  /* ---------------- FETCH BOOKINGS ---------------- */

  const fetchBookings =
    async () => {
      try {
        const res =
          await axios.get(
            `${API_BASE}/api/bookings/demoUser`
          );

        /* FETCH POSTERS FROM TMDB */
        const enriched =
          await Promise.all(
            res.data.map(
              async (b) => {
                try {
                  const tmdb =
                    await axios.get(
                      `${BASE_URL}/search/movie`,
                      {
                        params: {
                          api_key:
                            API_KEY,
                          query:
                            b.movie,
                        },
                      }
                    );

                  return {
                    ...b,
                    poster:
                      tmdb.data
                        .results?.[0]
                        ?.poster_path ||
                      null,
                  };
                } catch {
                  return {
                    ...b,
                    poster: null,
                  };
                }
              }
            )
          );

        setBookings(enriched);
      } catch (err) {
        console.log(
          "Fetch error:",
          err
        );
      }
    };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ---------------- DOWNLOAD PDF ---------------- */

  const downloadTicket =
    async (id) => {
      const element =
        document.getElementById(id);

      const canvas =
        await html2canvas(
          element
        );

      const imgData =
        canvas.toDataURL(
          "image/png"
        );

      const pdf = new jsPDF();

      pdf.addImage(
        imgData,
        "PNG",
        10,
        20,
        180,
        100
      );

      pdf.save(
        "MovieTicket.pdf"
      );
    };

  /* ---------------- CANCEL BOOKING ---------------- */

  const cancelBooking =
    async (id) => {
      try {
        await axios.delete(
          `${API_BASE}/api/bookings/${id}`
        );

        setBookings((prev) =>
          prev.filter(
            (b) =>
              b._id !== id
          )
        );
      } catch (err) {
        console.log(
          "Cancel error:",
          err
        );
      }
    };

  /* ---------------- UI ---------------- */

  return (
    <div
      className="
        pt-24 sm:pt-28
        px-4 sm:px-8 lg:px-12
        text-white
        min-h-screen
        bg-black
      "
    >
      {/* TITLE */}
      <h1
        className="
          text-2xl sm:text-3xl
          font-bold
          mb-10
        "
      >
        My Bookings
      </h1>

      {bookings.length === 0 && (
        <p className="text-gray-400">
          No bookings yet…
        </p>
      )}

      <div className="flex flex-col gap-8">

        {bookings.map((b, i) => {

          const posterUrl =
            b.poster
              ? `${IMAGE_URL}${b.poster}`
              : null;

          return (
            <div
              key={b._id}
              id={`ticket-${i}`}
              className="
                bg-gradient-to-r
                from-[#141414]
                via-[#1a1a1a]
                to-[#141414]
                border border-white/10
                rounded-2xl
                p-5 sm:p-6
                flex flex-col lg:flex-row
                justify-between lg:items-center
                gap-5
                hover:border-red-500/30
                transition
              "
            >

              {/* LEFT */}
              <div className="flex gap-5 items-center">

                <div
                  className="
                    w-20 h-28
                    rounded-lg
                    overflow-hidden
                    bg-black
                    shadow-lg shadow-black/60
                    flex items-center justify-center
                    text-xs text-gray-500
                  "
                >
                  {posterUrl ? (
                    <img
                      src={posterUrl}
                      alt={b.movie}
                      className="
                        w-full h-full
                        object-cover
                        hover:scale-110
                        transition duration-500
                      "
                    />
                  ) : (
                    "No Poster"
                  )}
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold mb-1">
                    {b.movie}
                  </h2>

                  <p className="text-gray-400 text-sm">
                    🏢 {b.theatre}
                  </p>

                  <p className="text-gray-400 text-sm">
                    🕒 {b.time}
                  </p>

                  <p className="text-gray-400 text-sm">
                    🎟 Seats:{" "}
                    {b.seats?.join(", ")}
                  </p>
                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-start lg:items-end gap-3">

                <p className="text-xl font-bold text-red-500">
                  ₹{b.total}
                </p>

                <span className="bg-green-600/20 text-green-400 text-xs px-3 py-1 rounded-full">
                  Confirmed
                </span>

                <div className="flex gap-3 mt-2">

                  <button
                    onClick={() =>
                      downloadTicket(
                        `ticket-${i}`
                      )
                    }
                    className="
                      bg-red-600 px-4 py-2 rounded-lg
                      hover:bg-red-700 hover:scale-105
                      transition
                      shadow-lg shadow-red-900/40
                    "
                  >
                    Download
                  </button>

                  <button
                    onClick={() =>
                      cancelBooking(
                        b._id
                      )
                    }
                    className="
                      bg-gray-700 px-4 py-2 rounded-lg
                      hover:bg-gray-600 transition
                    "
                  >
                    Cancel
                  </button>

                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
