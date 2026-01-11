"use client";

import { addWatchedMovie } from "@/app/actions/addWatched";
import { useTransition } from "react";

export default function AddWatched({
  movies,
  sessionId,
}: {
  movies: any[];
  sessionId: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleAdd(movieId: string) {
    startTransition(async () => {
      await addWatchedMovie(movieId, sessionId);
      window.location.reload();
    });
  }

  return (
    <div className="p-6 pt-24 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        mark movies you’ve watched
      </h1>

      <ul className="space-y-2">
        {movies.map(movie => (
          <li
            key={movie.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{movie.title}</span>
            <button
              disabled={isPending}
              onClick={() => handleAdd(movie.id)}
              className="text-sm px-3 py-1 border rounded"
            >
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
