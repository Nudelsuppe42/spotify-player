import { type NextRequest } from "next/server";

import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const spotify_client_id = process.env.SPOTIFY_CLIENT_ID || "";
    const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET || "";
  const code = searchParams.get("code") || "";
  const cookieStore = await cookies();

    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
     
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await fetch(authOptions.url, {
      method: "POST",
      body: new URLSearchParams({
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT || "",
        grant_type: "authorization_code",
      }),
      headers: authOptions.headers,
    });
    const res_data = await response.json();

    cookieStore.set("sp_token", (res_data as any).access_token);
    redirect("/?done=true");
}
 export const runtime = "edge";