import { useState } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    const isTrackInPlaylist = playlistTracks.filter(
      (playlistTrack) => playlistTrack.id === track.id
    ).length;
    if (isTrackInPlaylist) return;
    setPlaylistTracks((prev) => [...prev, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks((prev) =>
      prev.filter((playlistTrack) => playlistTrack.id !== track.id)
    );
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = async () => {
    Spotify.getAccessToken();
    const trackUris = playlistTracks.map((track) => track.uri);
    await Spotify.savePlaylist(playlistName, trackUris);
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
  };

  const search = async (searchTerm) => {
    Spotify.getAccessToken();
    const tracks = await Spotify.search(searchTerm);
    setSearchResults(tracks);
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}
