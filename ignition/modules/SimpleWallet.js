const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleWalletModule", async (m) => {
  const SimpleWallet = await m.deploy({
    contract: "SimpleWallet",
    args: [], // Array vazio se não há argumentos no construtor
  });

  return { SimpleWallet };
});