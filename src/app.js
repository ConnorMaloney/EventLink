/* global window */
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, { Marker, Popup, NavigationControl } from "react-map-gl";

import ControlPanel from "./control-panel";
import CityPin from "./city-pin";
import CityInfo from "./city-info";

import CITIES from "../data/cities.json";

import Countdown from "react-countdown-now";


console.log(CityPin.bigCities)

//const API = "https://api.myjson.com/bins/6fpy2";
//const API = 'https://24b895ea.ngrok.io/tweets'
//const API = 'https://api.myjson.com/bins/1gblje'
const API = 'http://acceeda9.ngrok.io/tweets'
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
          <div className="nav-bar-options">
            <a href="#phase-three">PHASE 3</a>
          </div>
        </div>
      </div>
    );
  }
}

class PhaseTwo extends React.Component {
  //state = { cityOne: null}
  render() {
    //console.log(bigCities)
    return (
      <div className="phase-two-body" id="phase-two">
        <div className="phase-two-intro">
          <div className="phase-two-title">
            Phase Two: Stake Your City Of Choice
          </div>
          <div className="phase-two-blurp">
            These two cities have made it to the second round! Congratulations!
            Are you truly committed to having us in your city? Let us know by
            putting in your staking amount. The higher the amount, the greater
            the chance your city will be selected!
          </div>
        </div>
        <div className="phase-two-stake">
          <div className="phase-two-top-city">City 1 and Address </div>
          <div className="phase-two-top-city">City 2 and Address</div>
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
          <label for="eth-address">Ethereum Address</label>
          <input
            type="text"
            id="eth-address"
            name="Eth Address"
            placeholder="Your ETH address.."
          />
          <label for="keybase-user">Keybase Username</label>
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
          <button
            id="keybase-message-render"
            value="myvalue"
            onclick="myFunction()"
          >
            Render Your Message
          </button>
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
          <textarea>Paste in your signed message from Keybase.io...</textarea>
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
          closeOnClick={true}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }

  _getCursor() {
    return 'cursor'
  };

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
  console.log(CityPin.bigCities)
  return (
    <div className="entire-app">
      <NavBar />
      <div className="phase-one">
        <div className="count-down">
          <Countdown date={Date.now() + 2.592e9} />
        </div>
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

//form for staking
//phase 3
// alarm clock countdown
//display leaders and give eth address
//make timer not reset
