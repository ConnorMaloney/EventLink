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
import { PhaseThree } from "./components/PhaseThree";

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
          <div
            className="nav-bar-options"
            onClick={() => this.props.onClick(1)}
          >
            <a>PHASE 1</a>
          </div>
          <div
            className="nav-bar-options"
            onClick={() => this.props.onClick(2)}
          >
            <a>PHASE 2</a>
          </div>
          <div
            className="nav-bar-options"
            onClick={() => this.props.onClick(3)}
          >
            <a>PHASE 3</a>
          </div>
        </div>
      </div>
    );
  }
}

export default class PhaseOne extends Component {
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
      <div className="phase-one" id="phase-one">
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
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currPhase: 1,
      contracts: {}
    };
  }

  setContracts(contracts) {
    this.setState({ contracts });
  }

  changePhase(num) {
    this.setState({ currPhase: num });
  }

  renderPhase() {
    switch (this.state.currPhase) {
      case 1:
        return <PhaseOne />;
      case 2:
        return (
          <PhaseTwo
            contracts={this.state.contracts}
            setContracts={_contracts => this.setContracts(_contracts)}
          />
        );
      case 3:
        return <PhaseThree contracts={this.state.contracts} />;
    }
  }

  render() {
    return (
      <div className="entire-app">
        <NavBar onClick={num => this.changePhase(num)} />
        {this.renderPhase()}
      </div>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}

// alarm clock countdown
//display leaders and give eth address
//make timer not reset
