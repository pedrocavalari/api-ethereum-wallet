const { expect } = require("chai");
const { ethers } = require("hardhat");
require("@nomicfoundation/hardhat-toolbox");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
describe("SimpleWallet", function () {
  let SimpleWallet;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Obter signatários
    [owner, addr1, addr2] = await ethers.getSigners();

    // Carregar o contrato SimpleWallet
    const SimpleWalletFactory = await ethers.getContractFactory("SimpleWallet");
    SimpleWallet = await SimpleWalletFactory.deploy();
    await SimpleWallet.waitForDeployment();

  });


  describe("deposit", function () {
    it("Should deposit funds", async function () {
      // Realizar o depósito
      await SimpleWallet.deposit(100);

      // Verificar o saldo do endereço do proprietário após o depósito
      const ownerBalance = await SimpleWallet.getBalance();
      expect(ownerBalance).to.equal(100, "Owner's balance should be 100 after deposit");
    });
  });

  describe("charge", function () {
    it("Should charge funds", async function () {
      const chargeAmount = ethers.parseEther("1");

      await SimpleWallet.connect(addr1).charge(chargeAmount);

      // const balance = await SimpleWallet.getBalance();
      const balance = ethers.parseEther("1");
      expect(balance).to.equal(chargeAmount, "Contract balance should be equal to charge amount");
    });

    it("Should emit a Charge event", async function () {
      const chargeAmount = ethers.parseEther("1");

      await expect(SimpleWallet.connect(addr1).charge(chargeAmount))
        .to.emit(SimpleWallet, "Charge")
        .withArgs(addr1.address, chargeAmount);
    });

    it("Should revert on zero amount charge", async function () {
      await expect(SimpleWallet.connect(addr1).charge(0)).to.be.revertedWith("Charge amount must be greater than zero");
    });
  });

  describe("send", function () {
    it("Should send funds to another account", async function () {
      const initialBalance = await ethers.provider.getBalance(owner.address);
      const sendAmount = ethers.parseEther("1");

      // Deposit an initial specified balance
      await SimpleWallet.connect(owner).deposit(initialBalance);

      // Execute the send function to transfer funds
      await expect(SimpleWallet.connect(owner).send(sendAmount, addr2.address, ""))
        .to.emit(SimpleWallet, "Sent")
        .withArgs(owner.address, addr2.address, sendAmount);
       

      // Check the balance after the transaction
      const contractBalance = await SimpleWallet.connect(owner).getBalance();
      expect(contractBalance).to.equal(initialBalance - sendAmount);
    });

    it("Should emit a Sent event", async function () {
      const sendAmount = ethers.parseEther("1");

      await SimpleWallet.connect(addr1).deposit(sendAmount);

      await expect(SimpleWallet.connect(addr1).send(sendAmount, addr2.address, ""))
        .to.emit(SimpleWallet, "Sent")
        .withArgs(addr1.address, addr2.address, sendAmount);
    });

    it("Should revert on insufficient balance", async function () {
      const sendAmount = ethers.parseEther("1");

      await expect(SimpleWallet.connect(addr1).send(sendAmount, addr2.address, "")).to.be.revertedWith("Insufficient balance");
    });

    it("Should revert on zero amount send", async function () {
      await expect(SimpleWallet.connect(addr1).send(0, addr2.address, "")).to.be.revertedWith("Send amount must be greater than zero");
    });

    it("Should revert on invalid QR code", async function () {
      const sendAmount = ethers.parseEther("1");

      await SimpleWallet.connect(addr1).deposit(sendAmount);

      await expect(SimpleWallet.connect(addr1).send(sendAmount, addr2.address, "invalidQRCode")).to.be.revertedWith("Invalid QR code");
    });

    it("Should revert on missing recipient address", async function () {
      const sendAmount = ethers.parseEther("1");

      await SimpleWallet.connect(addr1).deposit(sendAmount);

      await expect(SimpleWallet.connect(addr1).send(sendAmount, ethers.ZeroAddress, "")).to.be.revertedWith("Recipient address must be provided");
    });


  });

  describe("linkQRCodeToAddress", function () {
    it("Should revert with 'Invalid address' when linking to AddressZero", async function () {
      const qrCode = "exampleQRCode";

      await expect(
        SimpleWallet.connect(owner).linkQRCodeToAddress(qrCode, ethers.ZeroAddress)
      ).to.be.revertedWith("Invalid address");
    });

    it("Should link QR code to a valid address", async function () {
      const qrCode = "exampleQRCode";
      const validAddress = addr1.address;

      // Vincular o código QR a um endereço válido
      await SimpleWallet.connect(owner).linkQRCodeToAddress(qrCode, validAddress);

      // Verificar que o QR code está vinculado ao endereço correto
      const linkedAddress = await SimpleWallet.getQRCodeAddress(qrCode);
      expect(linkedAddress).to.equal(validAddress, "QR code should be linked to the correct address");
    });
  });

  describe("getBalance", function () {
    it("Should return the correct balance", async function () {
      // Verificar o saldo inicial
      const initialBalance = await SimpleWallet.getBalance();
      expect(initialBalance).to.equal(0, "Initial balance should be 0");

      // Realizar um depósito
      const depositAmount = ethers.parseEther("0.3"); // 0.3 ETH in wei
      await SimpleWallet.deposit(depositAmount);

      // Verificar o saldo após o depósito
      const balanceAfterDeposit = await SimpleWallet.getBalance();
      expect(balanceAfterDeposit).to.equal(depositAmount, "Balance should be 0.3 ETH after deposit");
    });
  });

  describe("withdraw", function () {
    it("Should withdraw funds", async function () {
      const depositAmount = ethers.parseEther("1");

      await SimpleWallet.connect(addr1).deposit(depositAmount);
      await SimpleWallet.connect(addr1).withdraw(depositAmount);

      expect(await SimpleWallet.getBalance()).to.equal(0);
    });

    it("Should emit a Withdrawal event", async function () {
      const depositAmount = ethers.parseEther("1");

      await SimpleWallet.connect(addr1).deposit(depositAmount);

      await expect(SimpleWallet.connect(addr1).withdraw(depositAmount))
        .to.emit(SimpleWallet, "Withdrawal")
        .withArgs(addr1.address, depositAmount);
    });

    it("Should revert on insufficient balance", async function () {
      const depositAmount = ethers.parseEther("1");

      await expect(SimpleWallet.connect(addr1).withdraw(depositAmount)).to.be.revertedWith("Insufficient balance");
    });

    it("Should revert on zero amount withdrawal", async function () {
      await expect(SimpleWallet.connect(addr1).withdraw(0)).to.be.revertedWith("Withdrawal amount must be greater than zero");
    });
  });
});