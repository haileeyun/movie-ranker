import { supabase } from "@/lib/supabase";
import { getSessionId } from "@/lib/session";

export default async function WatchedPage() {
  const sessionId = await getSessionId();

  const { data } = await supabase
    .from("watched_movies")
    .select(`
      movie:movies (
        id,
        title,
        poster_path,
        elo_rating
      )
    `)
    .eq("session_id", sessionId)
    .order("elo_rating", { ascending: false });

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {data?.map(row => (
        <div key={row.movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w300${row.movie.poster_path}`}
          />
          <h3>{row.movie.title}</h3>
          <p>{row.movie.elo_rating}</p>
        </div>
      ))}
    </div>
  );
}
