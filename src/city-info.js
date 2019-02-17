import React, { PureComponent } from "react";
import { TweetContext } from "./contexts/TweetContext";
import { getTweetsForCity } from "./repositories/tweets.repo";

class CityEthAddress extends React.Component {
  state = { ethAddr: null };
  render() {
    return <h1>{this.state.ethAddr}</h1>;
  }
}

class LatestCityTweet extends React.Component {
  render() {
    return (
      <TweetContext.Consumer>
        {tweets => {
          const tweetsForCity = getTweetsForCity(tweets, this.props.city);
          console.log(tweetsForCity[tweetsForCity.length - 1]);

          return <h3>{tweetsForCity[tweetsForCity.length - 1].text}</h3>;
        }}
      </TweetContext.Consumer>
    );
  }
}

export default class CityInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `${info.city}, ${info.state}`;

    return (
      <div>
        <div>{displayName}</div>
        <img width={240} src={info.image} />
        <div>
          <LatestCityTweet city={info.city} />
        </div>
        <div>
          <CityEthAddress city={info.city} />
        </div>
      </div>
    );
  }
}
