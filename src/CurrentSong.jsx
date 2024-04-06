import React, { useRef, useState } from "react";
import Controls from "./Controls";
import Seeker from "./Seeker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MiniPlayer from "./MiniPlayer";

const CurrentSong = ({ song, togglePlayer, setTogglePlayer, imageColor }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  return (
    <>
      <div
        className={`flex flex-1 h-full overflow-y-auto p-6 justify-center items-center player z-30 ${
          togglePlayer ? "active" : ""
        }`}
      >
        <div
          className="sm:hidden text-white absolute top-8 left-6"
          onClick={() => setTogglePlayer(false)}
        >
          <ExpandMoreIcon sx={{ fontSize: 40 }} />
        </div>
        <div className="w-full sm:w-96">
          <h2 className="font-basier-bold text-white text-2xl truncate">
            {song.title}
          </h2>
          <p className="text-sm">{song.artist}</p>
          <img
            src={song.photo}
            alt={song.title}
            className="w-full aspect-square object-cover rounded-md mt-8"
          />
          <audio src={`${song.url}?id=${song._id}`} ref={audioRef} />
          <div className="mt-6 mb-8">
            <Seeker audioRef={audioRef} setIsPlaying={setIsPlaying} />
          </div>
          <Controls
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </div>
      </div>
      {!togglePlayer && (
        <MiniPlayer
          song={song}
          setTogglePlayer={setTogglePlayer}
          imageColor={imageColor}
        />
      )}
    </>
  );
};

export default CurrentSong;
