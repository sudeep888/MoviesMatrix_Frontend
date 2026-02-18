import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const img = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750";

  return (
    <div
      onClick={() =>
        navigate(`/movie/${movie.id}`)
      }
      className="
        relative
        group
        cursor-pointer
        
        min-w-[160px] sm:min-w-[180px]
        
        rounded-xl
        overflow-hidden
        
        transition-all duration-300
        
        hover:scale-110
        hover:z-20
        
        shadow-lg
        shadow-black/40
        
        hover:shadow-2xl
        hover:shadow-black/70
      "
    >

      {/* 🎬 POSTER */}
      <img
        src={img}
        alt={movie.title}
        className="
          w-40 sm:w-48
          h-60 sm:h-72
          object-cover
          
          transition duration-500
          group-hover:brightness-75
        "
      />

      {/* 🎥 DARK GRADIENT OVERLAY */}
      <div
        className="
          absolute inset-0
          
          bg-gradient-to-t
          from-black/90
          via-black/40
          to-transparent
          
          opacity-80
          group-hover:opacity-100
          
          transition
        "
      />

      {/* 🎬 INFO OVERLAY */}
      <div
        className="
          absolute bottom-0
          p-3
          w-full
          
          translate-y-2
          group-hover:translate-y-0
          
          transition-all duration-300
        "
      >

        {/* TITLE */}
        <h2
          className="
            text-xs sm:text-sm
            font-semibold
            line-clamp-2
          "
        >
          {movie.title}
        </h2>

        {/* RATING */}
        <div className="flex items-center gap-1 mt-1">

          <Star
            size={14}
            className="text-yellow-400 fill-yellow-400"
          />

          <span className="text-xs text-gray-300">
            {movie.vote_average?.toFixed(1)}
          </span>

        </div>
      </div>

      {/* 🎬 HOVER GLOW BORDER */}
      <div
        className="
          absolute inset-0
          rounded-xl
          
          border border-transparent
          group-hover:border-white/20
          
          transition
        "
      />

    </div>
  );
}
