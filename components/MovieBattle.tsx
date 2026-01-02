"use client";

import { vote } from "@/app/actions/vote";
import Image from "next/image";
import { useTransition } from "react";

export default function MovieBattle({
  movies,
  sessionId,
}: {
  movies: any[];
  sessionId: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleVote(winnerId: string) {
    startTransition(async () => {
      await vote({
        movieAId: movies[0].id,
        movieBId: movies[1].id,
        winnerId,
        sessionId,
      });

      window.location.reload();
    });
  }

  return (
    <div className="grid grid-cols-2 h-screen">
      {movies.map(movie => (
        <button
          key={movie.id}
          onClick={() => handleVote(movie.id)}
          disabled={isPending}
          className="relative group"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <h2 className="text-white text-2xl font-semibold">
              {movie.title}
            </h2>
          </div>
        </button>
      ))}
    </div>
  );
}
