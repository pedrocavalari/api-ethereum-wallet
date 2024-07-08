// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

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

    // Event emitted when a QR code is linked to an address
    event QRCodeLinked(string indexed qrCodeHash, address indexed account);

    // Event emitted when a QR code address is retrieved
    event QRCodeAddressRetrieved(
        string indexed qrCodeHash,
        address indexed account
    );

    // Function to deposit funds
    function deposit(uint256 _amount) public {
        require(_amount > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += _amount  ;
        //console.log("Deposited %s to %s", _amount, msg.sender);
        emit Deposit(msg.sender, _amount);
    }

    // Function to withdraw funds
    function withdraw(uint256 _amount) public {
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        // console.log("Withdrew %s from %s", _amount, msg.sender);
        emit Withdrawal(msg.sender, _amount);
    }

    // Function to charge funds (add a balance for specific service)
    function charge(uint256 _amount) public {
        require(_amount > 0, "Charge amount must be greater than zero");
        balances[msg.sender] += _amount;
        // console.log("Charged %s to %s", _amount, msg.sender);
        emit Charge(msg.sender, _amount);
    }

    function send(
        uint256 _amount,
        address payable _to,
        string memory _qrCodeHash
    ) public {
        require(_amount > 0, "Send amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        address payable recipient = _to;

        if (bytes(_qrCodeHash).length > 0) {
            recipient = payable(qrCodeToAddress[_qrCodeHash]);
            require(recipient != address(0), "Invalid QR code");
            balances[msg.sender] -= _amount;
            (bool success, ) = recipient.call{value: _amount}("");//_amount, gas: gasleft()
            require(success, "Transfer failed.");
            emit QRCodeAddressRetrieved(_qrCodeHash, recipient);
        } else {
            require(
                recipient != address(0),
                "Recipient address must be provided"
            );
            balances[msg.sender] -= _amount;
            (bool success, ) = recipient.call{value: _amount}("");
            // require(success, "Transfer failed."); // Esta linha pode ser removida
            emit Sent(msg.sender, recipient, _amount);
        }
    }

    // Send function to send funds to another account or retrieve funds linked to a QR code
    // function send(uint256 _amount, address payable _to, string memory _qrCodeHash) public {
    //     require(_amount > 0, "Send amount must be greater than zero");
    //     require(balances[msg.sender] >= _amount, "Insufficient balance");

    //     address payable recipient = _to;

    //     if (bytes(_qrCodeHash).length > 0) {
    //         recipient = payable(qrCodeToAddress[_qrCodeHash]);
    //         require(recipient != address(0), "Invalid QR code");
    //         balances[msg.sender] -= _amount;
    //         (bool success, ) = recipient.call{value: _amount}("");
    //         require(success, "Transfer failed.");
    //         emit QRCodeAddressRetrieved(_qrCodeHash, recipient);
    //     } else {
    //         require(recipient != address(0), "Recipient address must be provided");
    //         balances[msg.sender] -= _amount;
    //         (bool success, ) = recipient.call{value: _amount}("");
    //         require(success, "Transfer failed.");
    //         emit Sent(msg.sender, recipient, _amount);
    //     }
    // }



    // Function to associate a QR code hash with an address
    function linkQRCodeToAddress(
        string memory _qrCodeHash,
        address _address
    ) public {
        require(_address != address(0), "Invalid address");
        qrCodeToAddress[_qrCodeHash] = _address;
        emit QRCodeLinked(_qrCodeHash, _address);
    }

    // Function to retrieve the address linked to a QR code hash
    function getQRCodeAddress(
        string memory _qrCodeHash
    ) public view returns (address) {
        return qrCodeToAddress[_qrCodeHash];
    }

    // Function to check balance
    function getBalance() public view returns (uint256) {
        uint256 balance = balances[msg.sender];
        // console.log("Balance of %s is %s", msg.sender, balance);
        return balance;
    }
}
