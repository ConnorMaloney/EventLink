import React from "react";
import {
  claimStake,
  getChallenge,
  verifyReceiver
} from "../services/staking.service";
import { StakedAmount } from "./StakedAmount";

export class PhaseThree extends React.Component {
  render() {
    const { contracts } = this.props;
    const claims = Object.keys(contracts).map(_origin => {
      const { address, origin } = contracts[_origin];
      return <ClaimStake address={address} origin={origin} />;
    });

    return (
      <div className="phase-three-body" id="phase-three">
        <div className="phase-three-title">
          Phase 3: Verify Owner of the Event and Claim Stake
        </div>
        {claims}
      </div>
    );
  }
}

class ClaimStake extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageToSign: "",
      signedMessage: ""
    };
  }

  componentDidMount() {
    getChallenge("henrynguyen5").then(messageToSign =>
      this.setState({
        messageToSign
      })
    );
  }

  render() {
    return (
      <div className="sign-keybase">
        <div className="sign-message-container">
          <div>
            {`Sign this message via Keybase.io to claim for stake for city: ${
              this.props.origin
            }`}
          </div>
          <StakedAmount address={this.props.address} />
          <textarea
            className="sign-message-render"
            value={this.state.messageToSign}
          />
          <label htmlFor="signed-message">Signed Message</label>
          <textarea
            type="text"
            id="signed-message"
            name="signed-message"
            value={this.state.signedMessage}
            onChange={e => {
              this.setState({
                signedMessage: e.target.value
              });
            }}
          />

          <input
            type="submit"
            value="Submit"
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              verifyReceiver("henrynguyen5", this.state.signedMessage).then(
                () => claimStake(this.props.address)
              );
            }}
          />
        </div>
      </div>
    );
  }
}
