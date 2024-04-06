import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { MusicContext } from "./context/MusicContext";

const Search = ({ songs, setFilteredSongs }) => {
  const { search, setSearch } = useContext(MusicContext);
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (search.trim() !== "") {
      const filtered = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(value.toLowerCase()) ||
          song.artist.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  };
  return (
    <div className="py-2 px-4 flex items-center bg-white/[.08] rounded-md">
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={search}
        onChange={handleSearchChange}
        className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/[0.4]"
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
