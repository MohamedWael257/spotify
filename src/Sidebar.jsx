import React, { useContext } from "react";
import logo from "./assets/logo.svg";
import profile from "./assets/profile.jpeg";
import { MusicContext } from "./context/MusicContext";

const Sidebar = ({ playlists, toggleSidebar, setToggleSidebar }) => {
  const { selectedPlaylist, setSelectedPlaylist, setSearch } =
    useContext(MusicContext);

  return (
    <div
      className={`w-full sm:w-64 h-full p-6 flex flex-col items-start z-20 sidebar ${
        toggleSidebar ? "active" : ""
      }`}
    >
      <img src={logo} alt="Spotify" className="w-32" />
      <div className="py-6 flex-1 overflow-y-auto w-full">
        {playlists.map((playlist) => {
          return (
            <div
              key={playlist.id}
              className={`text-lg mb-4 cursor-pointer ${
                selectedPlaylist.title === playlist.title
                  ? "text-white"
                  : "hover:text-white/[0.6]"
              }`}
              onClick={() => {
                setSelectedPlaylist(playlist);
                setSearch("");
                setToggleSidebar(false);
              }}
            >
              {playlist.title}
            </div>
          );
        })}
      </div>
      <img
        src={profile}
        alt="Faisal Ansari"
        className="w-10 h-10 object-cover rounded-full"
      />
    </div>
  );
};

export default Sidebar;
