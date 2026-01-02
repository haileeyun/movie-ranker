import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchPopularMovies(page = 1) {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
  );

  if (!res.ok) {
    throw new Error("failed to fetch from TMDB");
  }

  const data = await res.json();
  return data.results;
}

async function seedMovies() {
  console.log("🎬 seeding movies from TMDB...");

  const movies = await fetchPopularMovies(1);

  const formattedMovies = movies.map((movie: any) => ({
    title: movie.title,
    year: movie.release_date
      ? parseInt(movie.release_date.split("-")[0])
      : null,
    poster_url: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    elo_rating: 1500,
    comparison_count: 0,
  }));

  const { error } = await supabase
    .from("movies")
    .insert(formattedMovies);

  if (error) {
    console.error("❌ error inserting movies:", error);
  } else {
    console.log("✅ successfully seeded movies!");
  }
}

seedMovies().catch(console.error);
