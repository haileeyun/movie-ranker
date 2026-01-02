import { getTwoRandomMovies } from "@/lib/movies";
import MovieCard from "@/components/MovieCard";

export default async function HomePage() {
  const movies = await getTwoRandomMovies();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Which movie is better?</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <MovieCard movie={movies[0]} />
        <span className="text-xl font-semibold">VS</span>
        <MovieCard movie={movies[1]} />
      </div>
    </main>
  );
}
