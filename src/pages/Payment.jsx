import axios from "axios";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

/* ICONS */
import {
  CreditCard,
  IndianRupee,
  Lock,
} from "lucide-react";

/* ✅ ENV BACKEND URL */
const API_BASE =
  import.meta.env.VITE_API_BASE_URL;

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const amount = state?.total || 0;

  /* HANDLE PAYMENT */
  const handlePayment = async () => {
    try {
      /* SAVE BOOKING */
      await axios.post(
        `${API_BASE}/api/bookings`,
        {
          userId: "demoUser",
          movie: state.movie,
          theatre: state.theatre,
          seats: state.seats.map(
            (s) => s.seat
          ),
          time: state.time,
          total: state.total,
          showtimeId:
            state.showtimeId,
        }
      );

      /* SUCCESS NAV */
      setTimeout(() => {
        navigate("/success", {
          state,
        });
      }, 1000);
    } catch (err) {
      console.log(
        "Booking save error:",
        err
      );
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        
        pt-24 sm:pt-28
        px-4 sm:px-8 lg:px-10
        
        flex items-center justify-center
      "
    >
      {/* PAYMENT CARD */}
      <div
        className="
          w-full max-w-md
          bg-gradient-to-b
          from-white/10 to-white/5
          backdrop-blur-xl
          border border-white/10
          p-6 sm:p-8
          rounded-2xl
          shadow-[0_0_40px_rgba(0,0,0,0.8)]
        "
      >
        {/* TITLE */}
        <h1
          className="
            text-2xl sm:text-3xl
            font-semibold mb-6
            flex items-center gap-3
          "
        >
          <CreditCard className="text-red-500" />
          Payment
        </h1>

        {/* AMOUNT */}
        <div
          className="
            flex items-center gap-2
            text-lg mb-6 text-gray-200
          "
        >
          <IndianRupee className="text-green-400" />
          Amount: ₹{amount}
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Card Number"
            className="
              w-full bg-black/60
              border border-white/10
              rounded-lg px-4 py-3
              focus:outline-none
              focus:border-red-500
              focus:ring-1
              focus:ring-red-500
              transition
            "
          />

          <input
            type="text"
            placeholder="Expiry (MM/YY)"
            className="
              w-full bg-black/60
              border border-white/10
              rounded-lg px-4 py-3
              focus:outline-none
              focus:border-red-500
              focus:ring-1
              focus:ring-red-500
              transition
            "
          />

          <div className="relative">
            <input
              type="password"
              placeholder="CVV"
              className="
                w-full bg-black/60
                border border-white/10
                rounded-lg px-4 py-3
                focus:outline-none
                focus:border-red-500
                focus:ring-1
                focus:ring-red-500
                transition
              "
            />

            <Lock
              size={16}
              className="
                absolute right-4
                top-1/2 -translate-y-1/2
                text-gray-400
              "
            />
          </div>
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          className="
            mt-6 w-full
            bg-red-600 py-3
            rounded-lg font-semibold
            hover:bg-red-700
            hover:scale-105
            transition-all duration-300
            shadow-lg shadow-red-900/50
            hover:shadow-red-700/60
          "
        >
          Pay Now
        </button>

        {/* SECURITY NOTE */}
        <p
          className="
            text-xs text-gray-500
            mt-4 text-center
          "
        >
          Secure payment • SSL encrypted
        </p>
      </div>
    </div>
  );
}
