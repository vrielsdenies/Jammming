let accessToken = "";
const clientId = "664b972b62e44bec946cdda0e4d72ff9";
const redirectUri = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
      console.log(`This is ${accessToken}`);
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }

    const url = window.location.href;
    const token = /access_token=([^&]*)/;
    const expires = /expires_in=([^&]*)/;

    const foundToken = url.match(token);
    const foundExpires = url.match(expires);

    accessToken = foundToken;
    const expiresIn = foundExpires;

    window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/");
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse) {
          console.log(`accessToken is ${accessToken}`);

          return jsonResponse.tracks.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].artist,
            album: track.album.name,
            URI: track.uri
          }));
        }
      });
  }
};

export default Spotify;
