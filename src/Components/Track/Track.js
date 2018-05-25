import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  renderAction() {
    if (Track.isRemoval === true) {
      return "-";
    } else {
      return "+";
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>Sjalalie Sjalala</h3>
          <p>Sieneke | Best of</p>
        </div>
        <a className="Track-action" onClick={this.addTrack}>
          {this.renderAction()}
        </a>
      </div>
    );
  }
}

export default Track;
