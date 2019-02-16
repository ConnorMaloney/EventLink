// TODO: 
// 1) Add list of top leading cities based on number of tweets, display outside map
// 5) RENDER circles dynamically by changing css in component based on tweets
import React, {PureComponent} from 'react';

//const API = 'https://api.myjson.com/bins/17vo6i'
const API = 'https://api.myjson.com/bins/6fpy2'

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'crosshair',
  fill: '#d00',
  stroke: 'none'
};


function isBig(tweetCount) {
  return tweetCount > 5
}

class GetTweetNumber extends React.Component {
  state = { allTweets: null, stakeableCity: "nostake"}


  componentDidMount() {
    fetch(API)
    .then(function(response){
      return response.json()
    })


    .then(
      (responseData) => {
        
        this.setState({
          allTweets: responseData.result[this.props.city.toLowerCase()].length
        })
        return allTweets
      }); 

  }

  onChange(prevProps, prevState) {
    if (prevState.allTweets <= 100) {
      this.setState({ stakeableCity: "stakeable"})
    }
    
  }

  /*
  isStakeable() {
    if (this.allTweets < 100) {
      this.setState({
        stakeableCity: "100+"
      })
    }
  }
  */
  render() {
    return <div className={isBig(this.state.allTweets) ? 'stakeable-city' : 'unstakeable-city'}><h1>{this.state.allTweets}</h1></div>
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
