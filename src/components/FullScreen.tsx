"use client";

import { revalidateAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function FullScreen() {
  const router = useRouter();
  router.prefetch("/api/rev");
  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      console.log(e);
      if (e.key === "f") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.getElementById("main-content")?.requestFullscreen();
        }
      } else if (e.key === "r") {
        router.push("/api/rev");
      }
    });
  });

  return (
    <button
      onClick={() => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.getElementById("main-content")?.requestFullscreen();
        }
      }}
      className="absolute bottom-1 left-1 z-50 btn"
    >
      Fullscreen
    </button>
  );
}

export function Reload() {
  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key === "r") {
        revalidateAction();
      }
    });
  });

  return (
    <button
      onClick={() => revalidateAction()}
      className="absolute bottom-1 right-1 z-50 btn"
    >
      Reload
    </button>
  );
}
