/* eslint-disable @next/next/no-img-element */

import { getCurrentlyPlayingFetcher } from "@/util/fetch";

export const PlaceholderPlayer = () => {
  return (
    <>
      <div className="w-[100vw] h-[100vh] z-20 overflow-hidden top-0 left-0 absolute">
        <div
          className="flex flex-row"
          style={{
            backgroundSize: "cover",
            backgroundColor: "rgba(200,200,200)",
            backgroundPosition: "center",
            filter: "blur(200px)",
            position: "relative",
            top: -800,
            left: -800,
            width: "calc(100% + 1600px)",
            height: "calc(100% + 1600px)",
            overflow: "hidden",
          }}
        />
      </div>
      <div className="w-full h-full flex flex-row min-h-screen justify-center items-center z-50 absolute overflow-hidden">
        <div className="flex w-[75vw]">
          <div
            className="rounded-3xl w-[25vw] h-[25vw] mr-10 aspect-square"
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(255,255,255,0.75)",
            }}
          />
          <div
            className="p-10 h-[25vw] w-full rounded-3xl relative"
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(255,255,255,0.75)",
            }}
          >
            <h2 className="text-6xl font-bold pb-5 font-passion">
              Lädt...
            </h2>
            <h3 className="text-2xl pb-2">
              {" "}
            </h3>
            <div className="absolute bottom-10">
              <p className="align-text-bottom text-gray-600">
                Musikadventskalender am {new Date().toLocaleDateString("de-de")}{" "}
                ({dayToProgress(new Date().getDate())}/15)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Player = async ({ token }: { token: string }) => {
  const track = await getCurrentlyPlayingFetcher(token);

  if (!track || !track.is_playing) {
    return <PlaceholderPlayer />;
  }

  return (
    <>
      <div className="w-[100vw] h-[100vh] z-20 overflow-hidden top-0 left-0 absolute">
        <div
          className="flex flex-row"
          style={{
            backgroundImage: `url(${track.item.album.images[0].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(200px)",
            position: "relative",
            top: -800,
            left: -800,
            width: "calc(100% + 1600px)",
            height: "calc(100% + 1600px)",
            overflow: "hidden",
          }}
        />
      </div>
      <div className="w-full h-full flex flex-row min-h-screen justify-center items-center z-50 absolute overflow-hidden">
        <div className="flex w-[75vw]">
          <img
            src={track.item.album.images[0].url}
            alt={track.item.album.name}
            className="rounded-3xl w-[25vw] h-[25vw] mr-10 "
          />
          <div
            className="p-10 h-[25vw] w-full rounded-3xl relative"
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(255,255,255,0.75)",
            }}
          >
            <h2 className="text-6xl font-bold pb-5 font-passion">
              {track.item.name}
            </h2>
            <h3 className="text-2xl pb-2">
              {track.item.artists.map((a) => a.name).join(", ")} in{" "}
              <i className="text-gray-600">{track.item.album.name}</i>
            </h3>
            <div className="absolute bottom-10">
              <p className="align-text-bottom text-gray-600">
                Musikadventskalender am {new Date().toLocaleDateString("de-de")}{" "}
                ({dayToProgress(new Date().getDate())}/15)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function dayToProgress(day: number) {
  switch (day) {
    case 2:
      1;
    case 3:
      2;
    case 4:
      3;
    case 5:
      4;
    case 6:
      5;
    case 9:
      6;
    case 10:
      7;
    case 11:
      8;
    case 12:
      9;
    case 13:
      10;
    case 16:
      11;
    case 17:
      12;
    case 18:
      13;
    case 19:
      14;
    case 20:
      15;
    default:
      return 0;
  }
}
