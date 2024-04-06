import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MiniPlayer = ({ song, setTogglePlayer, imageColor }) => {
  return (
    <div
      className="sm:hidden fixed bottom-0 w-full rounded-md border-2 border-white/[0.1]"
      style={{ background: imageColor }}
      onClick={() => setTogglePlayer(true)}
    >
      <div className="flex items-center justify-between p-2">
        <div className="flex gap-3">
          <img
            src={song.photo}
            alt={song.title}
            className="w-12 aspect-square object-cover rounded"
          />
          <div className="w-[80%]">
            <h4 className="text-white truncate">{song.title}</h4>
            <p className="text-sm">{song.artist}</p>
          </div>
        </div>
        <div className="text-white mr-2">
          <ChevronRightIcon sx={{ fontSize: 32 }} />
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
