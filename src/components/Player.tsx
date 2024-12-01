/* eslint-disable @next/next/no-img-element */

import { getCurrentlyPlayingFetcher } from "@/util/fetch";
import { CurrentlyPlaying } from "@/util/types";
import { redirect } from "next/navigation";

export const PlaceholderPlayer = () => {
  return (
    <>
      <div
        className="w-2/3 h-full flex flex-col justify-center items-center brdr relative"
        id="right"
      >
          <div
            id="background"
            className="h-max"
            style={{
              backgroundPosition: "center",
              filter: "blur(200px)",
              position: "absolute",
              zIndex: -10,
              top: -800,
              left: -800,
              width: "calc(100% + 1600px)",
              height: "calc(100vh + 1600px)",
              overflow: "hidden",
              animation: "rotate-gradient linear 30s infinite",
              background:
                "radial-gradient(circle, rgba(162,15,55,1) 0%, rgba(236,91,0,1) 100%)",
            }}
          />
        <h1
          className="text-5xl font-bold py-5 font-passion p-10  rounded-3xl relative brdr mb-10"
          style={{
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255,255,255,0.75)",
          }}
        >
          Musikadventskalender am{" "}
          {new Date().toLocaleDateString("de-DE", {
            day: "numeric",
            month: "numeric",
          })}{" "}
          ({dayToProgress(new Date().getDate())}/15)
        </h1>
        <div className="w-full flex justify-center brdr">
          <div
            className="rounded-3xl w-[25vw] h-[25vw] mb-10 brdr"
            style={{
              background:
                "radial-gradient(circle, rgba(162,15,55,1) 0%, rgba(236,91,0,1) 100%)",
            }}
            id="cover"
          />
        </div>
        <div
          className="p-10 w-[95%] rounded-3xl relative brdr mx-10"
          style={{
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255,255,255,0.75)",
          }}
          id="info"
        >
          <h2 className="text-6xl font-bold pb-5 font-passion brdr">Gleich geht&apos;s los!</h2>
          <h3 className="text-2xl pb-2 brdr">🎵🎵</h3>
        </div>
      </div>
    </>
  );
};

export const Player = async ({ token }: { token: string }) => {
  const track = await getCurrentlyPlayingFetcher(token);

  if (!track || !track.is_playing) {
    if (track?.error == true) {
      return redirect("/api/auth/token");
    }
    return <PlaceholderPlayer />;
  }

  const item = (track as CurrentlyPlaying).item;

  return (
    <div
      className="w-2/3 h-full flex flex-col justify-center items-center brdr relative"
      id="right"
    >
      <div
        id="background"
        className="h-max"
        style={{
          backgroundPosition: "center",
          backgroundImage: `url(${item.album.images[0].url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(200px)",
          position: "absolute",
          zIndex: -10,
          top: -800,
          left: -800,
          width: "calc(100% + 1600px)",
          height: "calc(100vh + 1600px)",
          overflow: "hidden",
          animation: "rotate-gradient linear 35s infinite",
        
        }}
      />
      <h1
        className="text-5xl font-bold py-5 font-passion p-10  rounded-3xl relative brdr mb-10"
        style={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255,255,255,0.75)",
        }}
      >
        Musikadventskalender am{" "}
        {new Date().toLocaleDateString("de-DE", {
          day: "numeric",
          month: "numeric",
        })}{" "}
        ({dayToProgress(new Date().getDate())}/15)
      </h1>
      <div className="w-full flex justify-center brdr">
        <img
          src={item.album.images[0].url}
          alt={item.album.name}
          className="rounded-3xl w-[25vw] h-[25vw] mb-10 brdr"
          id="cover"
        />
      </div>
      <div
        className="p-10 w-[95%] rounded-3xl relative brdr mx-10"
        style={{
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(255,255,255,0.75)",
        }}
        id="info"
      >
        <h2 className="text-6xl font-bold pb-5 font-passion brdr">
          {convertTitle(item.name)}
        </h2>
        <h3 className="text-2xl pb-2 brdr">
          {item.artists.map((a) => a.name).join(", ")}, aus{" "}
          <i className="text-gray-600">{item.album.name}</i>
        </h3>
      </div>
    </div>
  );
};

function convertTitle(title: string) {
  switch (title) {
    case "Bye Bye Bye - From Deadpool and Wolverine Soundtrack":
      return "Bye Bye Bye - Deadpool and Wolverine";
    case `My Heart Will Go On - Love Theme from "Titanic"`:
      return "My Heart Will Go On - Titanic";
    case "It's Beginning to Look a Lot Like Christmas (with Mitchell Ayres & His Orchestra)":
      return "It's Beginning to Look a Lot Like Christmas";
    default:
      return title.replace("- Radio Version", "");
  }
}
function dayToProgress(day: number) {
  switch (day) {
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 3;
    case 5:
      return 4;
    case 6:
      return 5;
    case 9:
      return 6;
    case 10:
      return 7;
    case 11:
      return 8;
    case 12:
      return 9;
    case 13:
      return 10;
    case 16:
      return 11;
    case 17:
      return 12;
    case 18:
      return 13;
    case 19:
      return 14;
    case 20:
      return 15;
    default:
      return 0;
  }
}
