import { supabase } from "./supabase";

export async function getTwoRandomMovies() {
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .limit(2);

  if (error) {
    console.error("Supabase error:", error);
    throw new Error("failed to fetch movies");
  }

  if (!data || data.length < 2) {
    console.error("Not enough movies:", data);
    throw new Error("not enough movies in database");
  }

  return data;
}
