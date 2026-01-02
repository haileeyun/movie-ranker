export function calculateElo(
  ratingA: number,
  ratingB: number,
  winner: "A" | "B",
  k = 32
) {
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 - expectedA;

  const scoreA = winner === "A" ? 1 : 0;
  const scoreB = winner === "B" ? 1 : 0;

  return {
    newRatingA: Math.round(ratingA + k * (scoreA - expectedA)),
    newRatingB: Math.round(ratingB + k * (scoreB - expectedB)),
  };
}
