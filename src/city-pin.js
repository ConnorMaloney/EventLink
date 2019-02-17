// TODO: 
// 1) Add list of top leading cities based on number of tweets, display outside map
// 5) RENDER circles dynamically by changing css in component based on tweets
import React, {PureComponent} from 'react';

//const API = 'https://api.myjson.com/bins/6fpy2'
//const API = 'https://24b895ea.ngrok.io/tweets'
//const API = 'https://api.myjson.com/bins/1gblje'
const API = 'http://acceeda9.ngrok.io/tweets'


var bigCities = {}

function isBig(tweetCount, cityName) {
  if (tweetCount > 5) {
    bigCities[cityName] = tweetCount
    //console.log(bigCities)
    return true
  }
  else {
    return false
  }
}

class GetTweetNumber extends React.Component {
  state = { allTweets: null, stakeableCity: "nostake", cityName: null}


  componentDidMount() {
    fetch(API)
    .then(function(response){
      return response.json()
    })


    .then(
      (responseData) => {
        
        this.setState({
          allTweets: responseData.result[this.props.city.toLowerCase()].length,
          cityName: this.props.city.toLowerCase()
        })
        return allTweets
      }); 

  }

  onChange(prevProps, prevState) {
    if (prevState.allTweets <= 100) {
      this.setState({ stakeableCity: "stakeable"})
    }
    
  }

  render() {
    return <div className={isBig(this.state.allTweets, this.state.cityName) ? 'stakeable-city' : 'unstakeable-city'}><h1>{this.state.allTweets}</h1></div>
    /*if (this.state.allTweets > 5) {
      return <div className="stake-city"><h1 id="stake-city-count"> 100+ </h1></div>
    }*/

    //return <h1>{this.state.allTweets} {/*this.state.stakeableCity*/} </h1>    
  }

}

export default class CityPin extends PureComponent {

  render() {
    const {size = 20, onClick} = this.props;

    return (
      <>
      <div onClick={onClick}>
        <h2 id="tweet-count-svg"> <GetTweetNumber city={this.props.name}/></h2>
      </div>
      </>
    );
  }
}

console.log(bigCities);
export {bigCities};
