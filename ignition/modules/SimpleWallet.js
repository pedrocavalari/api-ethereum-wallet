const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleWalletModule",  (m) => {
  // const simpleWallet = await m.deploy({
  //   contract: "SimpleWallet",
  //   args: [], // no args
  // }); 

  const simpleWallet =  m.contract("SimpleWallet", [])
  // m.call(simpleWallet, [], { id: "SimpleW" })
  // m.call()
  return { simpleWallet }
});
// terminal do deploy
// SimpleWalletModule#SimpleWallet - 0x5FbDB2315678afecb367f032d93F642f64180aa3

//terminal do node
//eth_call
// Contract deployment: SimpleWallet
//   Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3    
//   From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266

// eth_sendTransaction
//   Contract deployment: SimpleWallet
//   Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3    
//   Transaction:         0x106888b066befe7989423edd6d6779dce44cb1f2d0f1598acc977b10dc6460d7
//   From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266    
//   Value:               0 ETH
//   Gas used:            1196395 of 1196395
//   Block #1:            0x147493863adf7f7c17a1628a33dcdd99a41f7d58699d8f2e521ad907ff71b94f


//Reveiver transactions 
// RECEIVER 
// Account #14: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097 (10000 ETH)  
// Private Key: 0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa