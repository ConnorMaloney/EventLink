import { providers, Contract } from "ethers";
const HYPERSTAKE_CONTRACT = require("../contracts/HyperStake.json");

function getSigner() {
  return window.ethereum.enable().then(([account]) => {
    const provider = new providers.Web3Provider(window.ethereum);
    return provider.getSigner(account);
  });
}

function connectToHyperStakeContract(contractAddress) {
  return getSigner().then(
    s => new Contract(contractAddress, HYPERSTAKE_CONTRACT.abi, s)
  );
}

export function stakeToHyperstakeContract(contractAddress, value) {
  connectToHyperStakeContract(contractAddress).then(contract => {
    console.log(
      `Staking ${ethers.utils.formatEther(value)}ETH to contract ${
        contract.address
      }....`
    );

    return contract
      .stake({ ...DEFAULT_GAS_PRICE, value })
      .then(t => t.wait())
      .then(() =>
        console.log(
          `Staking ${ethers.utils.formatEther(value)}ETH to contract ${
            contract.address
          } done!`
        )
      );
  });
}
