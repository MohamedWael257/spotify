import React, { useContext, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import { MusicContext } from "./context/MusicContext";
import { useTheme } from "@mui/material/styles";

const Controls = ({ audioRef, isPlaying, setIsPlaying }) => {
  const [isMuted, setIsMuted] = useState(false);
  const { songs, currentSong, setCurrentSong } = useContext(MusicContext);
  const theme = useTheme();
  const fontSize = theme.breakpoints.down("sm") ? 50 : 20;

  const play = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };
  const pause = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const currentIndex = songs.indexOf(currentSong);
  const playNext = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentSong(songs[currentIndex + 1]);
    } else {
      setCurrentSong(songs[0]);
    }
  };
  const playPrevious = () => {
    if (currentIndex > 0) {
      setCurrentSong(songs[songs.indexOf(currentSong) - 1]);
    } else {
      setCurrentSong(songs[songs.length - 1]);
    }
  };

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 1;
    }
  }, [audioRef, isMuted]);

  useEffect(() => {
    play();
  }, [audioRef, currentSong]);

  return (
    <div className="flex justify-between items-center">
      <div className="bg-white/[0.1] text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
        <MoreHorizIcon />
      </div>
      <div className="flex items-center gap-6">
        <SkipPreviousIcon
          className="text-white cursor-pointer !text-[2.4rem] sm:!text-3xl"
          onClick={playPrevious}
        />
        <div
          className="bg-white text-slate-950 rounded-full w-16 h-16 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <PauseIcon className="!text-[2.4rem] sm:!text-2xl" />
          ) : (
            <PlayArrowRoundedIcon className="!text-[2.4rem] sm:!text-2xl" />
          )}
        </div>
        <SkipNextIcon
          className="text-white cursor-pointer !text-[2.4rem] sm:!text-3xl"
          onClick={playNext}
        />
      </div>
      <div
        className="bg-white/[0.1] text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
      </div>
    </div>
  );
};

export default Controls;
