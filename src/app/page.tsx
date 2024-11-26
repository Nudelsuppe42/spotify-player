import { PlaceholderPlayer, Player } from "@/components/Player";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sp_token")?.value;
  return (
    <main className="w-[100vw] h-[100vh] overflow-hidden">
      {token ? <Player token={token} /> : <PlaceholderPlayer />}
      <a
        href={token ? "/api/rev" : "/api/auth/token"}
        className="absolute bottom-0 right-0 z-50"
        style={{
          color: "rgba(0,0,0,0.1)",
        }}
      >
        {token ? "Revalidate" : "Login"}
      </a>
    </main>
  );
}
export const runtime = "edge";
