import { providers, Contract, utils, ethers } from "ethers";
const HYPERSTAKE_CONTRACT = require("../contracts/HyperStake.json");

const DEFAULT_GAS_PRICE = { gasPrice: ethers.utils.parseUnits("30", "gwei") };

let signer;
function getSigner() {
  if (signer) {
    return Promise.resolve(signer);
  }
  return window.ethereum.enable().then(([account]) => {
    const provider = new providers.Web3Provider(window.ethereum);
    signer = provider.getSigner(account);
    return signer;
  });
}

function connectToHyperStakeContract(contractAddress) {
  return getSigner().then(
    s => new Contract(contractAddress, HYPERSTAKE_CONTRACT.abi, s)
  );
}

export function stakeToHyperstakeContract(contractAddress, value) {
  connectToHyperStakeContract(contractAddress).then(contract => {
    console.log(`Staking ${value}ETH to contract ${contract.address}....`);

    return contract
      .stake({
        ...DEFAULT_GAS_PRICE,
        value: ethers.utils.parseEther(value)
      })
      .then(t => t.wait())
      .then(() =>
        console.log(`Staking ${value}ETH to contract ${contract.address} done!`)
      );
  });
}

export function getBalanceOfContract(contractAddress) {
  return connectToHyperStakeContract(contractAddress)
    .then(contract => contract.getBalance())
    .then(b => utils.formatEther(b));
}

export function claimStake(contractAddress) {
  connectToHyperStakeContract(contractAddress).then(contract => {
    console.log("Claiming stake..");
    return contract
      .requestPayout("db2898aa", DEFAULT_GAS_PRICE)
      .then(t => t.wait())
      .then(() => console.log("paid out!"));
  });
}
