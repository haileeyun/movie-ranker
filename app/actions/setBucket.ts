"use server";

import { supabase } from "@/lib/supabase";
import { getSessionId } from "@/lib/session";

export async function setBucket(movieId: string, bucket: "bad" | "ok" | "good") {
  const sessionId = await getSessionId();

  await supabase.from("watched_movies").upsert({
    session_id: sessionId,
    movie_id: parseInt(movieId),
    bucket,
    inserted: false,
  });
}
