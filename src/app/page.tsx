import { FullScreen, Reload } from "@/components/FullScreen";
/* eslint-disable @next/next/no-img-element */
import { PlaceholderPlayer, Player } from "@/components/Player";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { useSearchParams } from "next/navigation";

export default async function Home({
  params,
  searchParams,
}: {
  params: null;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("sp_token")?.value;
  const showAd = searchParams?.showAd === "true";
  return (
    <main className="w-[100vw] h-[100vh] overflow-hidden" id="main-content">
      <div
        className="w-full h-full flex min-h-screen justify-center items-center z-50 absolute overflow-hidden"
        id="container"
      >
        {showAd && <div
          className="w-1/3 h-full flex justify-center items-center"
          id="left"
        >
          <img
            src={"/img.png"}
            alt={"Winterball"}
            className="rounded-3xl"
            style={{
              aspectRatio: "9 / 16",
            }}
          />
        </div> }
        {token ? <Player token={token} /> : <PlaceholderPlayer />}
      </div>
      <Reload hasToken={!!token} />
      <FullScreen />
    </main>
  );
}
export const runtime = "edge";
