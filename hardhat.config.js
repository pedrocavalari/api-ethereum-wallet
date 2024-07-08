require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  settings: {
    optimizer: {
      enabled: true,
      runs: 500,
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      blockGasLimit: 60000000 // Network block gasLimit
    },
  },
};
