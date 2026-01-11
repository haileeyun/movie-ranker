import { getSessionId } from "@/lib/session";
import { supabase } from "@/lib/supabase";
import MovieBattle from "@/components/MovieBattle";
import { getTwoWatchedMovies } from "@/lib/movies";

const MIN_MOVIES = 5;

export default async function RankPage() {
  const sessionId = await getSessionId();

  const { data: watched } = await supabase
    .from("watched_movies")
    .select("movie_id")
    .eq("session_id", sessionId);

  if (!watched || watched.length < MIN_MOVIES) {
    return (
      <div className="p-6 pt-24 text-black">
        Add at least {MIN_MOVIES} movies on Explore to start ranking.
      </div>
    );
  }

  const movies = await getTwoWatchedMovies(sessionId!);

  return <MovieBattle movies={movies!} sessionId={sessionId!} />;
}
