import { CurrentlyPlaying } from "./types";

export const getCurrentlyPlayingFetcher = async (token: string) => {
  const playingOptions = {
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(playingOptions.url, {
    method: "get",
    headers: playingOptions.headers,
    next: { revalidate: 15, tags: ["player"] },
  });
  if (response.status !== 200) {
    console.log(response.status, await response.json());
    // return response.status;
    if (response.status === 401)
      return { error: true, message: "Token Expired", is_playing: false };
    return null;
  }
  const res_data = await response.json();

  return { ...(res_data as any), error: false } as CurrentlyPlaying;
};
