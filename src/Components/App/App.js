import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      alert("Track already in playlist");
      return;
    } else {
      const currentTrackList = this.state.playlistTracks;
      currentTrackList.push(track);

      this.setState({
        playlistTracks: currentTrackList
      });
      console.log("track added");
    }
  }

  removeTrack(track) {
    const currentList = this.state.playlistTracks;
    const newList = currentList.filter(
      savedTrack => savedTrack.id !== track.id
    );

    this.setState({
      playlistTracks: newList
    });
    console.log("Track removed");
  }

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    });
    console.log("updatePlaylistName is called");
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.URI);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New playlist",
        playlistTracks: []
      });
      console.log("reset playlist name and empty playlist tracks");
    });
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    });
    console.log(`This is the search term: ${term}`);
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
