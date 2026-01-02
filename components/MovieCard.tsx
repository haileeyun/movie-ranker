type MovieCardProps = {
  movie: {
    id: string;
    title: string;
    year: number | null;
    poster_url: string | null;
  };
  onClick?: () => void;
};

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg border p-4 hover:shadow-lg transition"
    >
      {movie.poster_url && (
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full rounded mb-2"
        />
      )}
      <h2 className="text-lg font-semibold">
        {movie.title} {movie.year && `(${movie.year})`}
      </h2>
    </div>
  );
}
