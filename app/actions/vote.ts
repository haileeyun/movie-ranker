"use server";

import { supabase } from "@/lib/supabase";
import { calculateElo } from "@/lib/elo";

export async function vote({
  movieAId,
  movieBId,
  winnerId,
  sessionId,
}: {
  movieAId: string;
  movieBId: string;
  winnerId: string;
  sessionId: string;
}) {
  const { data: movies } = await supabase
    .from("movies")
    .select("id, elo_rating")
    .in("id", [movieAId, movieBId]);

  if (!movies || movies.length !== 2) {
    throw new Error("Movies not found");
  }

  const movieA = movies.find(m => m.id === movieAId)!;
  const movieB = movies.find(m => m.id === movieBId)!;

  const result = calculateElo(
    movieA.elo_rating,
    movieB.elo_rating,
    winnerId === movieAId ? "A" : "B"
  );

  await supabase
    .from("movies")
    .update({ elo_rating: result.newRatingA })
    .eq("id", movieAId);

  await supabase
    .from("movies")
    .update({ elo_rating: result.newRatingB })
    .eq("id", movieBId);

  await supabase.from("comparisons").insert({
    movie_a_id: movieAId,
    movie_b_id: movieBId,
    winner_id: winnerId,
    session_id: sessionId,
  });
}
