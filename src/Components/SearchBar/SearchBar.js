import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={searchTerm}
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
}
