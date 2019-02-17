import {
  initStaking,
  stakeToHyperstakeContract,
  getBalanceOfContract
} from "../services/staking.service";
import { StakedAmount } from "./StakedAmount";
import React from "react";

export class PhaseTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasInited: false
    };
  }

  componentDidMount() {
    initStaking("henrynguyen5").then(contracts => {
      this.props.setContracts(contracts);
      this.setState({ hasInited: true });
    });
  }

  renderBody() {
    const text = this.state.hasInited
      ? `These two cities have made it to the second round! Congratulations!
      Are you truly committed to having us in your city? Let us know by
      putting in your staking amount. The higher the amount, the greater
      the chance your city will be selected!`
      : `Initializing staking contracts...`;
    return <div className="phase-two-blurp">{text}</div>;
  }

  renderContracts() {
    const { contracts } = this.props;
    return Object.keys(contracts).map(_origin => {
      const { address, origin } = contracts[_origin];

      return (
        <form>
          <label htmlFor="city-name">City Name</label>
          <input
            type="text"
            id="city-name"
            name="city-name"
            value={origin}
            disabled
          />

          <label htmlFor="eth-address">Staking Contract Address</label>
          <input
            type="text"
            id="eth-address"
            name="Eth Address"
            value={address}
            disabled
          />

          <StakedAmount address={address} />

          <label htmlFor="ether">Ether amount to stake</label>
          <input
            type="text"
            id="ether"
            name="ether amount"
            value={this.state[origin] || "0"}
            onChange={event => {
              this.setState({ [origin]: event.target.value });
            }}
          />

          <input
            type="submit"
            value="Submit"
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              stakeToHyperstakeContract(address, this.state[origin]);
            }}
          />
        </form>
      );
    });
  }

  render() {
    return (
      <div className="phase-two-body" id="phase-two">
        <div className="phase-two-intro">
          <div className="phase-two-title">
            Phase Two: Stake Your City Of Choice
          </div>
          {this.renderBody()}
        </div>
        {this.renderContracts()}
      </div>
    );
  }
}
