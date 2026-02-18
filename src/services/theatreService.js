import axios from "axios";

/* ✅ ENV BACKEND BASE URL */
const API_BASE =
  import.meta.env.VITE_API_BASE_URL;

/* FINAL THEATRE API */
const API = `${API_BASE}/api/theatres`;

/* GET theatres by city */
export const getTheatresByCity =
  async (city) => {
    try {
      const res = await axios.get(
        `${API}/${city}`
      );

      return res.data;
    } catch (err) {
      console.error(
        "Theatre fetch error:",
        err
      );

      return [];
    }
  };
