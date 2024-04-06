import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { MusicContext } from "./context/MusicContext";
import CurrentSong from "./CurrentSong";
import { GET_PLAYLISTS } from "./queries";
import Sidebar from "./Sidebar";
import SongsList from "./SongsList";

import { average } from "color.js";
import Loader from "./Loader";

const App = () => {
  const { currentSong } = useContext(MusicContext);
  const { loading, error, data } = useQuery(GET_PLAYLISTS);
  const [imageColor, setImageColor] = useState("#0f172a");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [togglePlayer, setTogglePlayer] = useState(false);

  useEffect(() => {
    if (currentSong) {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = currentSong.photo;

      image.onload = () => {
        average(image, { format: "hex", amount: 1 }).then((color) => {
          setImageColor(color);
        });
      };

      setImageColor("#0f172a");
    }
  }, [currentSong]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return "Error fetching data...";
  }

  const playlists = data.getPlaylists;

  return (
    <div
      className="h-screen text-white/[0.4] font-basier"
      style={{ background: imageColor, transition: "background 1s ease" }}
    >
      <div
        className="h-full flex"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))",
        }}
      >
        <Sidebar
          playlists={playlists}
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        />
        <SongsList
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
          togglePlayer={togglePlayer}
        />
        {currentSong && (
          <CurrentSong
            song={currentSong}
            togglePlayer={togglePlayer}
            setTogglePlayer={setTogglePlayer}
            imageColor={imageColor}
          />
        )}
      </div>
    </div>
  );
};

export default App;
