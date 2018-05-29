let accessToken = "";
const clientId = "664b972b62e44bec946cdda0e4d72ff9";
const redirectUri = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }

        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].artist,
          album: track.album.name,
          URI: track.uri
        }));
      });
  },

  savePlaylist(playlistName, trackURIs) {
    console.log("savePLaylist in Spotify.js is called");
    if (playlistName && trackURIs) {
      const accessToken = Spotify.getAccessToken();
      console.log(playlistName);
      const headers = {
        Authorization: `Bearer ${accessToken}` //changed the headers variable
      };

      let userID = "";

      return fetch(`https://api.spotify.com/v1/me`, headers)
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          userID = jsonResponse.id;
          console.log(jsonResponse);
          console.log(`userID is ${userID}`);
        })
        .then(jsonResponse => {
          return fetch(
            `https://api.spotify.com/v1/users/${userID}/playlists`,
            headers,
            {
              method: "POST",
              body: JSON.stringify({ name: playlistName })
            }
          );
        })
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          console.log(jsonResponse);
          //console.log(jsonResponse.items.id);
          let playlistID = jsonResponse.id;
          console.log(`this is playlistID ${playlistID}`);
        });
    } else {
      return;
    }
  }
};

export default Spotify;
