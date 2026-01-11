import { supabase } from "@/lib/supabase";

export async function getTwoWatchedMovies(sessionId: string) {
  const { data, error } = await supabase
    .from("watched_movies")
    .select("movies(id, title, poster_url)")
    .eq("session_id", sessionId)
    .limit(2);

  if (error || !data || data.length < 2) {
    return null;
  }

  return data.map(row => row.movies);
}
