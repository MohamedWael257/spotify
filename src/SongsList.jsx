import { useQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { MusicContext } from "./context/MusicContext";
import { GET_SONGS } from "./queries";
import Search from "./Search";
import Song from "./Song";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const SongsList = ({ toggleSidebar, setToggleSidebar, togglePlayer }) => {
  const { songs, setSongs, selectedPlaylist, search, currentSong } =
    useContext(MusicContext);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const { loading, data } = useQuery(GET_SONGS, {
    variables: { playlistId: selectedPlaylist.id },
  });

  useEffect(() => {
    if (!loading && data && data.getSongs) {
      setSongs(data.getSongs);
    }
  }, [selectedPlaylist, data, loading]);

  const songsToDisplay = search.trim() !== "" ? filteredSongs : songs;

  return (
    <div
      className={`pt-6 sm:pb-6 w-full sm:w-96 h-full flex flex-col  ${
        currentSong ? "pb-20" : ""
      } ${togglePlayer ? "invisible" : "visible"}`}
    >
      <div className="px-6">
        <div className="flex justify-between items-center mb-4 text-white">
          <h2 className="text-2xl font-basier-bold">
            {selectedPlaylist.title}
          </h2>
          <div
            className="lg:hidden cursor-pointer z-20"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            {toggleSidebar ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
        <Search songs={songs} setFilteredSongs={setFilteredSongs} />
      </div>
      <div className={"mt-6 px-2 overflow-y-auto flex-1"}>
        {songsToDisplay.map((song) => {
          return <Song key={song._id} song={song} />;
        })}
        {data && filteredSongs.length === 0 && songsToDisplay.length === 0 && (
          <p className="px-4">No search results found</p>
        )}
      </div>
    </div>
  );
};

export default SongsList;
