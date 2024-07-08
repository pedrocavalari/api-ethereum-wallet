// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract SimpleWallet {
    mapping(address => uint256) private balances;
    mapping(string => address) private qrCodeToAddress;

    // Event to log deposits
    event Deposit(address indexed account, uint256 amount);

    // Event to log withdrawals
    event Withdrawal(address indexed account, uint256 amount);

    // Event to log charges
    event Charge(address indexed account, uint256 amount);

    // Event to log sent funds
    event Sent(address indexed from, address indexed to, uint256 amount);

    // Function to deposit funds
    function deposit(uint256 _amount) public {
        require(_amount > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += _amount;
        console.log("Deposited %s to %s", _amount, msg.sender);
        emit Deposit(msg.sender, _amount);
    }

    // Function to withdraw funds
    function withdraw(uint256 _amount) public {
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        console.log("Withdrew %s from %s", _amount, msg.sender);
        emit Withdrawal(msg.sender, _amount);
    }

    // Function to charge funds (add a balance for specific service)
    function charge(uint256 _amount) public {
        require(_amount > 0, "Charge amount must be greater than zero");
        balances[msg.sender] += _amount;
        console.log("Charged %s to %s", _amount, msg.sender);
        emit Charge(msg.sender, _amount);
    }

    // Function to send funds to another account
    function send(
        uint256 _amount,
        address payable _to,
        string memory _qrCodeHash
    ) public {
        require(_amount > 0, "Send amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        address payable recipient = _to;

        // If a QR code hash is provided, use it to find the recipient address
        if (bytes(_qrCodeHash).length > 0) {
           recipient = payable(qrCodeToAddress[_qrCodeHash]); // Convert to address payable
           require(recipient != address(0), "Invalid QR code");
        }

        require(recipient != address(0), "Recipient address must be provided");

        balances[msg.sender] -= _amount;
        // balances[recipient] += _amount;  você está atualizando o saldo do 
        // destinatário diretamente no mapeamento balances. Este método é 
        // comum quando você deseja apenas registrar uma transação no contrato
        // e não precisa enviar Ether imediatamente para o destinatário 
        // externo ao contrato
        // balances[recipient] += _amount;

        //O método recipient.transfer(_amount); é usado para transferir Ether 
        //imediatamente para um endereço externo ao contrato.
        recipient.transfer(_amount);
        console.log("Sent %s from %s to %s", _amount, msg.sender, recipient);
        emit Sent(msg.sender, recipient, _amount);
    }

    // Function to associate a QR code hash with an address
    function linkQRCodeToAddress(
        string memory _qrCodeHash,
        address _address
    ) public {
        require(_address != address(0), "Invalid address");
        qrCodeToAddress[_qrCodeHash] = _address;
         console.log("Linked QR code %s to address %s", _qrCodeHash, _address);
    }

    // Function to check balance
    function getBalance() public view returns (uint256) {
        uint256 balance = balances[msg.sender];
        console.log("Balance of %s is %s", msg.sender, balance);
        return balances[msg.sender];
    }
}
