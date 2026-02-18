export default function TrailerModal({ videoKey, onClose }) {
  if (!videoKey) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

      {/* Click Outside Close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Video Box */}
      <div className="relative w-[85%] h-[80%]">

        <iframe
          className="w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />

        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl"
        >
          ✕
        </button>

      </div>
    </div>
  );
}
