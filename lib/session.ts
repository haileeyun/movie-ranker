import { headers } from "next/headers";

export async function getSessionId() {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie") || "";

  const match = cookieHeader.match(/session_id=([^;]+)/);
  return match?.[1] ?? null;
}
