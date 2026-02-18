import axios from "axios";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import LocationSelector from "./LocationSelector";

/* ✅ FETCH FROM .ENV */
const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- SEARCH ---------------- */

  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState([]);

  const searchRef = useRef();

  /* MOBILE MENU */
  const [menuOpen, setMenuOpen] =
    useState(false);

  /* FETCH SEARCH RESULTS */
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
        );

        setResults(
          res.data.results.slice(0, 5)
        );
      } catch (err) {
        console.log(
          "Search error:",
          err
        );
      }
    };

    const debounce =
      setTimeout(fetchMovies, 400);

    return () =>
      clearTimeout(debounce);
  }, [query]);

  /* CLOSE DROPDOWN */
  useEffect(() => {
    const handleClickOutside = (
      e
    ) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(
          e.target
        )
      ) {
        setResults([]);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  /* ---------------- SCROLL EFFECT ---------------- */

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <nav
      className={`
        fixed top-0 w-full z-50
        
        px-4 sm:px-6 lg:px-10
        py-3
        
        flex items-center justify-between
        
        backdrop-blur-xl
        border-b border-white/10
        
        transition-all duration-300
        
        ${
          scrolled
            ? "bg-black/80 shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
            : "bg-black/40"
        }
      `}
    >
      {/* 🎬 LOGO */}
      <Link to="/" className="group">
        <h1
          className="
            text-red-600
            font-extrabold
            uppercase
            text-xl sm:text-2xl md:text-3xl
            tracking-[4px] sm:tracking-[6px]
            drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]
            group-hover:text-red-500
            transition
          "
          style={{
            fontFamily:
              "'Bebas Neue', sans-serif",
          }}
        >
          The Theatre
        </h1>
      </Link>

      {/* 🔍 SEARCH */}
      <div
        ref={searchRef}
        className="relative hidden md:block w-[260px] lg:w-[420px]"
      >
        <div
          className="
            flex items-center
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            px-4 py-2
            rounded-full
            shadow-inner shadow-black/40
          "
        >
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search movies..."
            className="
              bg-transparent outline-none px-3
              text-white w-full text-sm
              placeholder-gray-400
            "
            value={query}
            onChange={(e) =>
              setQuery(
                e.target.value
              )
            }
          />
        </div>

        {/* AUTOCOMPLETE */}
        {results.length > 0 && (
          <div className="absolute top-12 w-full bg-black/95 backdrop-blur-xl rounded-xl p-2 space-y-2 shadow-2xl z-50 border border-white/10">
            {results.map(
              (movie) => (
                <div
                  key={movie.id}
                  onClick={() => {
                    navigate(
                      `/movie/${movie.id}`
                    );
                    setResults([]);
                    setQuery("");
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg cursor-pointer text-sm transition"
                >
                  {movie.title}
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden md:flex items-center gap-5 lg:gap-7">
        <LocationSelector />

        <Link
          to="/movies"
          className={`
            relative
            text-white/80 hover:text-white
            transition
            
            after:absolute
            after:left-0
            after:-bottom-1
            after:h-[2px]
            after:bg-red-500
            after:transition-all
            after:duration-300
            
            ${
              location.pathname === "/movies"
                ? "after:w-full"
                : "after:w-0 hover:after:w-full"
            }
          `}
        >
          Movies
        </Link>

        <Link
          to="/profile"
          className={`
            relative
            text-white/80 hover:text-white
            transition
            
            after:absolute
            after:left-0
            after:-bottom-1
            after:h-[2px]
            after:bg-red-500
            after:transition-all
            after:duration-300
            
            ${
              location.pathname === "/profile"
                ? "after:w-full"
                : "after:w-0 hover:after:w-full"
            }
          `}
        >
          Bookings
        </Link>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
        className="md:hidden text-white"
      >
        {menuOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div
          className="
            absolute top-full left-0 w-full
            bg-black/95 backdrop-blur-xl
            flex flex-col items-center
            gap-5 py-6
            border-b border-white/10
            md:hidden
          "
        >
          <LocationSelector />

          <Link
            to="/movies"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:text-red-400"
          >
            Movies
          </Link>

          <Link
            to="/profile"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:text-red-400"
          >
            Bookings
          </Link>
        </div>
      )}
    </nav>
  );
}
