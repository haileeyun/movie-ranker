import { supabase } from "@/lib/supabase";
import MovieCard from "@/components/MovieCard";

export default async function ExplorePage() {
  const { data: movies } = await supabase
    .from("movies")
    .select("id, title, year, poster_url")
    .limit(100);

  return (
    <div className="p-6 pt-24">
      <h1 className="text-xl font-semibold mb-4">Explore Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
