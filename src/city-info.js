import React, {PureComponent} from 'react';

const API = 'https://api.myjson.com/bins/6fpy2'

class LatestCityTweet extends React.Component {
  state = { lastTweet: null}

  componentDidMount() {
    fetch(API)
    .then(function(response){
      return response.json()
    })
    .then(
      (responseData) => {
        this.setState({
          lastTweet: responseData.result[this.props.city.toLowerCase()].length
        })}); 

  }
  render() {
    return <h1>{this.state.lastTweet}</h1>    
  }

}

export default class CityInfo extends PureComponent {

  render() {
    const {info} = this.props;
    const displayName = `${info.city}, ${info.state}`;

    return (
      <div>
        <div>
          {displayName} | <a target="_new"
          href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${displayName}`}>
            Wikipedia
          </a>
        </div>
        <img width={240} src={info.image} />
        <h2> Tweets <LatestCityTweet city={this.props.name}/> </h2>
      </div>
    );
  }
}
