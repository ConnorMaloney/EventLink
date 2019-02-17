import React from "react";
import { getBalanceOfContract } from "../services/staking.service";
export class StakedAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { balance: "0" };
  }

  componentDidMount() {
    setInterval(
      () =>
        getBalanceOfContract(this.props.address).then(balance => {
          this.setState({ balance });
        }),
      1000
    );
  }

  render() {
    return (
      <div>
        <label htmlFor="staked-amount">Currently staked amount</label>
        <input
          type="text"
          id="staked-amount"
          value={this.state.balance}
          disabled
        />
      </div>
    );
  }
}
