import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }) {
  return (
    <Link href={`/explore/${movie.id}`}>
      <div className="group cursor-pointer">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={movie.poster_url}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        </div>
      </div>
    </Link>
  );
}
