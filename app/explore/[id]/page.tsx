import { supabase } from "@/lib/supabase";
import { getSessionId } from "@/lib/session";
import Image from "next/image";
import BucketModal from "@/components/BucketModal";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sessionId = await getSessionId();

  const { data: movie } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!movie) {
    return <div className="p-6 pt-24">Movie not found.</div>;
  }

  const { data: watched } = await supabase
    .from("watched_movies")
    .select("rating")
    .eq("session_id", sessionId)
    .eq("movie_id", id)
    .maybeSingle();

  return (
    <div className="p-6 pt-24 max-w-xl mx-auto">
      <div className="flex gap-6">
        <Image
          src={movie.poster_url}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded"
        />

        <div>
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-4">{movie.year}</p>

          <p className="text-sm mb-4">{movie.overview}</p>

          <div className="space-y-1 text-sm">
            <p>Your rating: {watched?.rating ?? "—"}</p>
            <p>Global rating: {movie.global_rating || "—"}</p>
          </div>

          <BucketModal movieId={id} />
        </div>
      </div>
    </div>
  );
}
