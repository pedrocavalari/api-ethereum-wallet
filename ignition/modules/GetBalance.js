const { ethers } = require("hardhat");
const fs = require("fs")
const path = require("path")

module.exports = async function getBalance() {//add signer param
  // const Token = await ethers.getContractFactory("Token")
  // const token = Token.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
    console.log('aqui')

  const mintingContract = new ethers.Contract(
                    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
                    getABI(),
                    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266")
    console.log(mintingContract)
}

 function getABI() {
  try {
    const dir = path.resolve(
      __dirname,
      "./artifacts/contracts/SimpleWallet.sol/SimpleWallet.json"
    )
    const file = fs.readFileSync(dir, "utf8")
    const json = JSON.parse(file)
    const abi = json.abi
    console.log(`abi`, abi)

    return abi
  } catch (e) {
    console.log(`e`, e)
  }
}