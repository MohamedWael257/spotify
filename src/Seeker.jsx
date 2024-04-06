import React, { useEffect, useRef, useState } from "react";

const Seeker = ({ audioRef, setIsPlaying }) => {
  const seekerRef = useRef(null);
  const progressBar = useRef(null);
  const [seekerValue, setSeekerValue] = useState(0);

  useEffect(() => {
    if (audioRef.current && seekerRef.current) {
      const updateSeeker = () => {
        const percentage =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setSeekerValue(percentage);
        progressBar.current.style.width = `${percentage}%`;

        if (percentage === 100) {
          setIsPlaying(false);
        }
      };

      seekerRef.current.addEventListener("input", handleSeekerInput);
      audioRef.current.addEventListener("timeupdate", updateSeeker);

      updateSeeker();

      return () => {
        seekerRef.current.removeEventListener("input", handleSeekerInput);
        audioRef.current.removeEventListener("timeupdate", updateSeeker);
      };
    }
  }, [audioRef]);

  const handleSeekerInput = (e) => {
    const percentage = e.target.value;
    setSeekerValue(percentage);
    if (audioRef.current) {
      const seekTime = (percentage / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  return (
    <div className="w-full h-[0.3rem] rounded-full bg-white/[0.2] relative seeker-container">
      <input
        type="range"
        min="0"
        max="100"
        value={seekerValue}
        className="seeker-input w-full h-full bg-transparent rounded-full appearance-none cursor-pointer absolute z-20"
        step="any"
        onChange={handleSeekerInput}
        ref={seekerRef}
      />
      <div
        className="absolute bg-white h-full rounded-full"
        ref={progressBar}
      ></div>
    </div>
  );
};

export default Seeker;
