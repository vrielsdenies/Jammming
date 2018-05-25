import React from "react";
import "./TrackList.css";

import Track from "../Track/Track";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return (
            <Track
              track={track}
              key={track.id}
              onAdd={this.props.onAdd}
              isRemoval={this.props.isRemoval}
            />
          );
        })}
      </div>
    );

    {
      this.props.track.name;
    }
    {
      this.props.track.artist;
    }
    {
      this.props.track.album;
    }
  }
}

export default TrackList;
