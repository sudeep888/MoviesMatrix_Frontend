import { Route, Routes } from "react-router-dom";

import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Movies from "../pages/Movies";
import Payment from "../pages/Payment";
import Profile from "../pages/Profile";
import SeatSelection from "../pages/SeatSelection";
import ShowTimings from "../pages/ShowTimings";
import Success from "../pages/Success";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route
        path="/movies"
        element={<Movies />}
      />

      <Route
        path="/movie/:id"
        element={<MovieDetails />}
      />

      <Route
        path="/showtimes/:id"
        element={<ShowTimings />}
      />

      <Route
        path="/seats"
        element={<SeatSelection />}
      />

      <Route
        path="/checkout"
        element={<Checkout />}
      />

      <Route
        path="/payment"
        element={<Payment />}
      />

      <Route
        path="/success"
        element={<Success />}
      />

      {/* ✅ ADD THIS */}
      <Route
        path="/profile"
        element={<Profile />}
      />

    </Routes>
  );
}
