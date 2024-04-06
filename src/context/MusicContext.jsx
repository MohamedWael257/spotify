import { createContext, useState } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    id: 1,
    title: "For You",
  });
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <MusicContext.Provider
      value={{
        selectedPlaylist,
        setSelectedPlaylist,
        songs,
        setSongs,
        currentSong,
        setCurrentSong,
        search,
        setSearch,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
