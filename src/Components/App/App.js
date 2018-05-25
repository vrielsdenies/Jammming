import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "",
          artist: "",
          album: "",
          id: ""
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
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (track.id !== this.state.playListTracks) {
      this.setState({
        playlistTracks: this.state.playlistTracks.push(track)
      });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
