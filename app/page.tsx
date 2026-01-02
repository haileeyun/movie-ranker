import { getSessionId } from "@/lib/session";
import { getTwoWatchedMovies } from "@/lib/movies";
import MovieBattle from "@/components/MovieBattle";

export default async function HomePage() {
  const sessionId = await getSessionId();

  if (!sessionId) {
    return null;
  }

  const movies = await getTwoWatchedMovies(sessionId);

  if (!movies) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Add watched movies to start ranking 🎬</p>
      </div>
    );
  }

  return <MovieBattle movies={movies} sessionId={sessionId} />;
}
