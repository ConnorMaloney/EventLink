/* global window */
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";

import ControlPanel from "./control-panel";
import CityPin from "./city-pin";
import CityInfo from "./city-info";

import CITIES from "../data/cities.json";

import Countdown from "react-countdown-now";

const TOKEN =
  "pk.eyJ1IjoiZm9vcGVydCIsImEiOiJjanM1bDlxbmgwMDUwNGFtZHFxZ3M2NGx1In0.N6t4n3TBDjXSGXeZ2QyosQ"; // Set your mapbox token here

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

class NavBar extends React.Component {
  render() {
    return (
      <div className="nav-container">
        <div className="nav-grid">
          <div className="nav-bar-options">PHASE 1</div>
          <div className="nav-bar-options">
            <a href="#phase-two">PHASE 2</a>
          </div>
          <div className="nav-bar-options">PHASE 3</div>
        </div>
      </div>
    );
  }
}

class PhaseTwo extends React.Component {
  render() {
    return (
      <div className="phase-two-body" id="phase-two">
        <h2>Time to Stake</h2>
        <p>
          Staking ensures that the next ETHGlobal event is held that the city of
          your choosing. Staking also acts as your payment for a ticket. If your
          city of choice does not win majority vote, your funds will be released
          back to you at the end of the staking period.
        </p>
        <div className="winner-one" />
        <div className="winner-two" />
      </div>
    );
  }
}

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderCityMarker = (city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
      >
        <CityPin
          name={city.city}
          size={20}
          onClick={() => this.setState({ popupInfo: city })}
        />
      </Marker>
    );
  };

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CityInfo info={popupInfo} />
          <h1> Test </h1>
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN}
      >
        {CITIES.map(this._renderCityMarker)}

        {this._renderPopup()}

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>
      </MapGL>
    );
  }
}

function App() {
  return (
    <div className="entire-app">
      <NavBar />
      <div className="phase-one">
        <div className="count-down">
          <Countdown date={Date.now() + 2.592e+9} />
        </div>
        <Map />
      </div>
      <PhaseTwo />
    </div>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
