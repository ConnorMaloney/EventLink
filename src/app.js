/* global window */
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, { Marker, Popup } from "react-map-gl";
import CityPin from "./city-pin";
import CityInfo from "./city-info";
import CITIES from "../data/cities.json";
import { TweetContext } from "./contexts/TweetContext";
import { appConfig } from "./app.config";
import { getTweets } from "./services/tweets.service";
import { PhaseTwo } from "./components/PhaseTwo";

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
          <div className="nav-bar-options">
            <a href="#phase-one">PHASE 1</a>
          </div>
          <div className="nav-bar-options">
            <a href="#phase-two">PHASE 2</a>
          </div>
          <div className="nav-bar-options">
            <a href="#phase-three">PHASE 3</a>
          </div>
        </div>
      </div>
    );
  }
}

class ClaimStake extends React.Component {
  render() {
    return (
      <div className="claim-stake">
        <form className="stake-form">
          <label htmlFor="eth-address">Ethereum Address</label>
          <input
            type="text"
            id="eth-address"
            name="Eth Address"
            placeholder="Your ETH address.."
          />
          <label htmlFor="keybase-user">Keybase Username</label>
          <input
            type="text"
            id="keybase-user"
            name="keybase-user"
            placeholder="Your Keybase user.."
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class SignKeybaseMessage extends React.Component {
  render() {
    return (
      <div className="sign-keybase">
        <div className="sign-message-container">
          <div className="sign-message-render">
            Sign this message via Keybase.io
          </div>
        </div>
      </div>
    );
  }
}

class VerifySignedMessage extends React.Component {
  render() {
    return (
      <div className="verify-signed-message">
        <form className="verify-message-container">
          <textarea defaultValue="Paste in your signed message from Keybase.io..." />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

class PhaseThree extends React.Component {
  render() {
    return (
      <div className="phase-three-body" id="phase-three">
        <div className="phase-three-title">
          Phase 3: Verify Owner of the Event
        </div>
        <ClaimStake />
        <SignKeybaseMessage />
        <VerifySignedMessage />
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
      popupInfo: null,
      tweets: {}
    };
  }

  componentDidMount() {
    this._pollForTweets();
  }

  _pollForTweets() {
    getTweets()
      .then(t => this.setState({ tweets: t }))
      .then(() => setTimeout(() => this._pollForTweets(), 250));
  }
  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderCityMarker = (city, index) => {
    return (
      <TweetContext.Provider value={this.state.tweets} key={`marker-${index}`}>
        <div
          onClick={() =>
            this.setState({ popupInfo: this.state.popupInfo ? null : city })
          }
        >
          <Marker longitude={city.longitude} latitude={city.latitude}>
            <CityPin name={city.city} size={20} />
          </Marker>
        </div>
      </TweetContext.Provider>
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
          closeOnClick={true}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <TweetContext.Provider value={this.state.tweets}>
            <CityInfo info={popupInfo} />
          </TweetContext.Provider>
        </Popup>
      )
    );
  }

  _getCursor() {
    return "cursor";
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
        mapboxApiAccessToken={appConfig.mapBoxToken}
        scrollZoom={false}
        reuseMaps={false}
        dragPan={false}
        dragRotate={false}
        touchZoom={false}
        touchRoate={false}
        preventStyleDiffing={true}
        zoom={1.3}
        latitude={15.7917}
        longitude={7.0926}
        getCursor={this._getCursor}
      >
        {CITIES.map(this._renderCityMarker)}
        {this._renderPopup()}
      </MapGL>
    );
  }
}

function App() {
  return (
    <div className="entire-app">
      <NavBar />
      <div className="phase-one" id="phase-one">
        {/* <div className="count-down" id="phase-one">
          Time Left To Vote &nbsp; {<Countdown date={Date.now() + 2.592e9} />}
        </div> */}

        <Map />
      </div>
      <PhaseTwo />
      <PhaseThree />
    </div>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}

// alarm clock countdown
//display leaders and give eth address
//make timer not reset
