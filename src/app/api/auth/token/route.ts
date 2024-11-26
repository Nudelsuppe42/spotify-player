import { NextApiRequest, NextApiResponse } from "next";

import { randomBytes } from "crypto";
import { redirect } from "next/navigation";

var generateRandomString = function (length: number) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export async function GET(req: NextApiRequest) {
  var scope =
    "streaming user-read-email user-read-private user-read-currently-playing user-read-playback-state user-read-recently-played";

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT || "",
    state: state,
  });

  redirect(
    "https://accounts.spotify.com/authorize?" + auth_query_parameters.toString()
  );
}
