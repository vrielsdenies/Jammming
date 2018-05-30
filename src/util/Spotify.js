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
    console.log(trackURIs);

    if (playlistName && trackURIs) {
      const accessToken = Spotify.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}` //changed the headers variable
      };
      let userId = "";

      return fetch(`https://api.spotify.com/v1/me`, {
        headers: headers
      })
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          userId = jsonResponse.id;
          console.log(jsonResponse);
          console.log(`userId is ${userId}`);

          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({ name: playlistName })
          });
        })
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          //console.log(jsonResponse);
          //console.log(jsonResponse.items.id);
          let playlistId = jsonResponse.id;
          console.log(`this is playlistId ${playlistId}`);

          return fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {
              headers: headers,
              method: "POST",
              body: JSON.stringify({ uris: [trackURIs] })
            }
          );
        });
    } else {
      return;
    }
  }
};

export default Spotify;
