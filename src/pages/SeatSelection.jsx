import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* ---------------- LAYOUT ---------------- */

const layout = [
  {
    category: "PLATINUM",
    price: 550,
    rows: ["A", "B"],
    seats: 12,
  },
  {
    category: "GOLD",
    price: 400,
    rows: ["C", "D", "E", "F"],
    seats: 14,
  },
  {
    category: "SILVER",
    price: 250,
    rows: ["G", "H"],
    seats: 16,
  },
];

/* BOOKED SEATS */
const lockedSeats = ["A3", "B5", "C7", "D4", "G10"];

export default function SeatSelection() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);

  const movie = state?.movie;
  const theatre = state?.theatre;
  const time = state?.time;

  /* TOGGLE */
  const toggleSeat = (seat, price) => {
    if (lockedSeats.includes(seat)) return;

    setSelected((prev) =>
      prev.find((s) => s.seat === seat)
        ? prev.filter((s) => s.seat !== seat)
        : [...prev, { seat, price }]
    );
  };

  const total = selected.reduce(
    (sum, s) => sum + s.price,
    0
  );

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-28 px-6">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">
          {movie}
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          {theatre} • {time}
        </p>
      </div>

      {/* CURVED SCREEN */}
      <div className="flex flex-col items-center mb-16">

        <svg
          width="600"
          height="120"
          viewBox="0 0 600 120"
          className="mb-3"
        >
          <path
            d="M20 100 Q300 10 580 100"
            stroke="#d1d5db"
            strokeWidth="6"
            fill="transparent"
            opacity="0.8"
          />
        </svg>

        <p className="text-gray-400 tracking-[6px] text-xs">
          SCREEN THIS WAY
        </p>
      </div>

      {/* SEATS */}
      <div className="flex flex-col items-center">

        {layout.map((section) => (
          <div
            key={section.category}
            className="mb-14 w-full max-w-5xl"
          >
            {/* CATEGORY HEADER */}
            <div className="flex justify-between mb-4 px-4">
              <h2 className="text-gray-300 tracking-widest text-sm">
                {section.category}
              </h2>

              <span className="text-gray-400 text-sm">
                ₹{section.price}
              </span>
            </div>

            {/* ROWS */}
            {section.rows.map((row) => (
              <div
                key={row}
                className="flex items-center justify-center gap-3 mb-3"
              >
                {/* LEFT LABEL */}
                <span className="w-5 text-gray-500 text-sm">
                  {row}
                </span>

                {/* SEATS */}
                {Array.from({
                  length: section.seats,
                }).map((_, i) => {
                  const seat = `${row}${i + 1}`;

                  const isLocked =
                    lockedSeats.includes(seat);

                  const isSelected =
                    selected.find(
                      (s) => s.seat === seat
                    );

                  return (
                    <div
                      key={seat}
                      onClick={() =>
                        toggleSeat(
                          seat,
                          section.price
                        )
                      }
                      className={`
                        w-9 h-9 rounded-md text-xs flex items-center justify-center
                        transition-all duration-200
                        
                        ${
                          isLocked
                            ? "bg-[#1a1a1a] text-gray-600 cursor-not-allowed"
                            : isSelected
                            ? "bg-red-500 scale-110 shadow-lg shadow-red-500/40"
                            : "bg-[#2a2a2a] hover:bg-[#3a3a3a] hover:scale-105 cursor-pointer"
                        }
                      `}
                    >
                      {i + 1}
                    </div>
                  );
                })}

                {/* RIGHT LABEL */}
                <span className="w-5 text-gray-500 text-sm">
                  {row}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-6 mt-6 text-sm">

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#2a2a2a] rounded" />
          Available
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-500 rounded" />
          Selected
        </div>

        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-black border rounded" />
          Booked
        </div>

      </div>

      {/* SUMMARY */}
      <div className="mt-14 bg-white/5 border border-white/10 p-6 rounded-xl max-w-md mx-auto backdrop-blur">

        <h2 className="text-lg mb-3 font-semibold">
          Booking Summary
        </h2>

        <p className="text-sm text-gray-300">
          Movie: {movie}
        </p>

        <p className="text-sm text-gray-300">
          Theatre: {theatre}
        </p>

        <p className="text-sm text-gray-300">
          Time: {time}
        </p>

        <p className="text-sm mt-2">
          Seats:{" "}
          {selected.length
            ? selected
                .map((s) => s.seat)
                .join(", ")
            : "None"}
        </p>

        <p className="mt-2 font-semibold">
          Total: ₹{total}
        </p>

        <button
          disabled={!selected.length}
          onClick={() =>
            navigate("/checkout", {
              state: {
                movie,
                theatre,
                time,
                seats: selected,
                total,
              },
            })
          }
          className="mt-4 w-full bg-red-500 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-600 transition"
        >
          Proceed to Pay
        </button>

      </div>
    </div>
  );
}