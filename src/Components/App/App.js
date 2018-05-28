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
      searchResults: [
        {
          name: "Everything Now",
          artist: "Arcade Fire",
          album: "The Suburbs",
          id: "af1"
        },
        {
          name: "The Suburbs",
          artist: "Arcade Fire",
          album: "The Suburbs",
          id: "af2"
        }
      ],
      playlistName: "Test Playlist",
      playlistTracks: [
        {
          name: "Glycorine",
          artist: "Bush",
          album: "Sixteen Stone",
          id: "bush01"
        },
        {
          name: "Karma Police",
          artist: "Radiohead",
          album: "OK Computer",
          id: "radiohead01"
        },
        {
          name: "Burn the witch",
          artist: "Radiohead",
          album: "New album",
          id: "radiohead02"
        }
      ]
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
      console.log("track already in playlist");
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
    const trackURIs = this.state.playlistTracks.map(trackURI => {
      return this.state.playlistTracks.uri;
    });
    console.log("playlist is saved");
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({
        searchResults: tracks
      });
    });
    console.log(term);
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
