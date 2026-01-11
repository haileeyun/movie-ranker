"use client";

import { useState, useTransition } from "react";
import { setBucket } from "@/app/actions/setBucket";

export default function BucketModal({ movieId }: { movieId: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function choose(bucket: "bad" | "ok" | "good") {
    startTransition(async () => {
      await setBucket(movieId, bucket);
      window.location.href = "/rank";
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 px-4 py-2 bg-white text-black rounded"
      >
        Rank
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded w-80 space-y-4">
            <h2 className="text-lg font-semibold text-center">
              How was this movie?
            </h2>

            <button onClick={() => choose("bad")} className="bucket-btn">
              👎 Bad
            </button>

            <button onClick={() => choose("ok")} className="bucket-btn">
              😐 OK
            </button>

            <button onClick={() => choose("good")} className="bucket-btn">
              👍 Good
            </button>
          </div>
        </div>
      )}
    </>
  );
}
