import React, { PureComponent } from "react";
import { TweetContext } from "./contexts/TweetContext";
import { getTweetsForCity } from "./repositories/tweets.repo";

class TweetNumber extends React.Component {
  render() {
    return (
      <TweetContext.Consumer>
        {tweets => {
          const tweetsForCity = getTweetsForCity(tweets, this.props.city);
          return (
            <div className={"stakeable-city"}>
              <h1>{tweetsForCity && tweetsForCity.length}</h1>
            </div>
          );
        }}
      </TweetContext.Consumer>
    );
  }
}

export default class CityPin extends PureComponent {
  render() {
    const { name } = this.props;
    return (
      <div>
        <h2 id="tweet-count-svg">
          <TweetNumber city={name} />
        </h2>
      </div>
    );
  }
}
