import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies }) {
  if (!movies?.length) return null;

  return (
    <div className="mt-12 sm:mt-14 relative">

      {/* 🎬 ROW TITLE */}
      <h2
        className="
          text-xl sm:text-2xl lg:text-3xl
          font-bold
          mb-6
          
          text-white
          
          tracking-wide
          
          px-4 sm:px-0
        "
      >
        {title}
      </h2>

      {/* 🎞️ SCROLL CONTAINER */}
      <div className="relative group">

        {/* LEFT FADE */}
        <div
          className="
            pointer-events-none
            absolute left-0 top-0
            h-full w-16
            bg-gradient-to-r
            from-black via-black/70 to-transparent
            z-10
          "
        />

        {/* RIGHT FADE */}
        <div
          className="
            pointer-events-none
            absolute right-0 top-0
            h-full w-16
            bg-gradient-to-l
            from-black via-black/70 to-transparent
            z-10
          "
        />

        {/* 🎬 MOVIE RAIL */}
        <div
          className="
            flex gap-4 sm:gap-5
            
            overflow-x-auto
            overflow-y-hidden
            
            scroll-smooth
            
            px-4 sm:px-1
            pb-4
            
            scrollbar-hide
            
            [&::-webkit-scrollbar]:hidden
          "
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="
                flex-shrink-0
                transition-transform duration-300
                hover:scale-105
              "
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
