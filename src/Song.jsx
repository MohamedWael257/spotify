import React, { useContext, useEffect, useRef } from "react";
import { MusicContext } from "./context/MusicContext";

const formatDuration = (duration) => {
  const durationString = duration.toString();
  return `${durationString.charAt(0)}:${durationString.substring(1)}`;
};

const Song = ({ song }) => {
  const { title, photo, artist, duration } = song;
  const { currentSong, setCurrentSong, setSearch } = useContext(MusicContext);
  const songRef = useRef(null);

  useEffect(() => {
    if (song === currentSong) {
      const screenWidth = window.innerWidth;
      if (screenWidth > 640) {
        songRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }
  }, [currentSong]);

  return (
    <div
      className={`flex justify-between items-center gap-2 p-4 cursor-pointer rounded-lg ${
        currentSong === song ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
      }`}
      onClick={() => {
        setCurrentSong(song);
        setSearch("");
      }}
      ref={songRef}
    >
      <div className="flex items-center gap-4">
        <img
          src={photo}
          alt={title}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="w-60">
          <h4 className="text-white truncate">{title}</h4>
          <p className="text-xs">{artist}</p>
        </div>
      </div>
      <div className="text-sm">{formatDuration(duration)}</div>
    </div>
  );
};

export default Song;
