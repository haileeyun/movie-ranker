"use server";

import { supabase } from "@/lib/supabase";

export async function addWatchedMovie(
  movieId: string,
  sessionId: string
) {
  await supabase.from("watched_movies").insert({
    movie_id: parseInt(movieId),
    session_id: sessionId,
  });
}
