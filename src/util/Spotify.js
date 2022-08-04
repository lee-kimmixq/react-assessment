import axios from "axios";

let USER_ACCESS_TOKEN = "";

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.URL;

export const Spotify = {
  getAccessToken: function () {
    // if already have user access token
    if (USER_ACCESS_TOKEN) return USER_ACCESS_TOKEN;

    // if user access token has just been obtained - get from URL
    if (window.location.href.match(/access_token=([^&]*)/)) {
      USER_ACCESS_TOKEN = window.location.href.match(/access_token=([^&]*)/)[1];
      const expirationTime =
        Number(window.location.href.match(/expires_in=([^&]*)/)[1]) * 1000;
      window.setTimeout(() => {
        USER_ACCESS_TOKEN = "";
      }, expirationTime);
      window.history.pushState("Access Token", null, "/");
      return USER_ACCESS_TOKEN;
    }

    // if no user access token - get auth
    window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
  },
  search: async function (searchTerm) {
    const {
      data: {
        tracks: { items },
      },
    } = await axios.get(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${USER_ACCESS_TOKEN}` },
      }
    );
    return items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },
  savePlaylist: async function (playlistName, trackUris) {
    if (!playlistName) return;
    if (!trackUris) return;
    const {
      data: { id: userId },
    } = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: { Authorization: `Bearer ${USER_ACCESS_TOKEN}` },
    });
    const {
      data: { id: playlistId },
    } = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: playlistName,
      },
      {
        headers: { Authorization: `Bearer ${USER_ACCESS_TOKEN}` },
      }
    );
    await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        uris: trackUris,
      },
      {
        headers: { Authorization: `Bearer ${USER_ACCESS_TOKEN}` },
      }
    );
    return;
  },
};

Spotify.getAccessToken();
