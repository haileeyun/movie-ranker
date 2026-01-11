import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TMDB_KEY = process.env.TMDB_API_KEY!;

async function fetchMovies(page: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&page=${page}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch TMDB page " + page);
  }

  const json = await res.json();
  return json.results;
}

async function seed() {
  console.log("🎬 Seeding movies from TMDB...");

  let allMovies: any[] = [];

  for (let page = 1; page <= 5; page++) {
    const movies = await fetchMovies(page);
    allMovies.push(...movies);
    console.log(`Fetched page ${page} (${movies.length} movies)`);
  }

  const formatted = allMovies.map(movie => ({
    tmdb_id: movie.id,
    title: movie.title,
    year: movie.release_date?.slice(0, 4),
    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  }));

  const { error } = await supabase
    .from("movies")
    .upsert(formatted, { onConflict: "tmdb_id" });

  if (error) {
    console.error("❌ Error inserting movies:", error);
  } else {
    console.log(`✅ Seeded ${formatted.length} movies`);
  }
}

seed();
