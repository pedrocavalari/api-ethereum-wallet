## Criando uma API com node.js e hardhat de uma carteira ethereum

### Pré requisitos
 - [VSCode](https://code.visualstudio.com/)
 - [Node.js](https://nodejs.org/pt)  

### Intro
Este projeto é a reconstrução [deste projeto](https://github.com/kauemurakami/etherum-wallet) feito com [flutter](https://flutter.dev/), [Ganache Truffle Switch](https://archive.trufflesuite.com/ganache/), [Remix](https://remix-project.org/), [Infura](https://www.infura.io/) mas que resolvi refazer ao descobrir que o [Ganache Truffle Switch](https://archive.trufflesuite.com/ganache/) não tem mais suporte desde o começo do ano de 2024.  
[Ganache Truffle Switch](https://archive.trufflesuite.com/ganache/) é uma ferramenta que fornece um blockchain [Ethereum](https://ethereum.org/pt-br/) local, permitindo o desenvolvimento, teste e depuração de contratos inteligentes em um ambiente controlado. Ele simula a rede [Ethereum](https://ethereum.org/pt-br/), proporcionando uma plataforma onde você pode experimentar sem a necessidade de gastar [Ether](https://en.wikipedia.org/wiki/Ethereum#:~:text=Ether%20(ETH)%20is%20the%20cryptocurrency,adding%20blocks%20to%20the%20blockchain.) real ou esperar por confirmações de transações, leia mais sobre na documentação.<br/><br/>
Mas e dessa vez, o que usar pra emular um ambiente de testes para a blocchain [Ethereum](https://ethereum.org/pt-br/)?  
Pra isso usaremos o [Hardhat](https://hardhat.org/), que também nos possibilita as mesmas funcionalidades do [Ganache Truffle Switch](https://archive.trufflesuite.com/ganache/) e mais algumas como:  
 - **Compilação de Contratos Inteligentes**: <span style="font-size:0.9em;">Compila contratos [Solidity](https://soliditylang.org/) usando o [compilador Solidity (solc)](https://docs.soliditylang.org/en/latest/installing-solidity.html), sem isso usavamos o [Remix](https://remix-project.org/) para compilar nossos contratos e gerar os arquivos necessários.</span>
 - **Deploy de Contratos**: 
  <span style="font-size:0.9em;">Facilita o processo de implantação de contratos inteligentes em várias redes [Ethereum](https://ethereum.org/pt-br/), incluindo redes de teste e a rede principal.</span>  
 - **Testes**: <span style="font-size:0.9em;">Integração com frameworks de teste como Mocha e Chai para escrever e executar testes automatizados para seus contratos inteligentes.</span>  
 - **Scripts de Execução**: <span style="font-size:0.9em;">Permite escrever scripts personalizados para realizar tarefas específicas, como deploy, migrações e interações com contratos.</span>  
 - **Debugging**: <span style="font-size:0.9em;">Ferramentas avançadas de debugging que ajudam a identificar e corrigir problemas em seus contratos inteligentes.</span>  
 - **Hardhat Network**: <span style="font-size:0.9em;">Um nó local que pode ser usado para desenvolvimento, permitindo mineração instantânea, contas locais, e uma blockchain que pode ser resetada facilmente.</span>  
 Dentre outras que podem ser exploradas e veremos aqui neste tutorial.  
 -> Projeto antigo: https://github.com/kauemurakami/etherum-wallet  
### Iniciando projeto

Antes de iniciar o projeto irei passar minha referência, e serei o mais fiel possível à ela, a própria documentação do [Hardhat doc](https://hardhat.org/docs) e [Hardhat tutorial](https://hardhat.org/hardhat-runner/docs/getting-started#overview)  

#### Então vamos começar!!!

Primeiro crie um diretório, via [VSCode](https://code.visualstudio.com/), terminal ou pelo explorador de arquivos pro nosso projeto, no meu caso nomeei de `api-ethereum-wallet`, mas pode colocar o nome que desejar.<br/><br/>

Abra esse diretório no [VSCode](https://code.visualstudio.com/), abra um terminal no diretório via Terminal do [VSCode](https://code.visualstudio.com/), ou apenas cliquei com o botão direito sobre a pasta e selecionar a opção `Open in integrated Terminal`.<br/><br/>

Você verá no terminal algo como `PS C:\projetos\api-ethereum-wallet>`, e então tudo estara ok.<br/><br/>

No terminal vamos começar instalando o [Hardhat](https://hardhat.org/) com o seguinte comando:  
`npm install --save-dev hardhat`  <br/><br/>

Agora vamos rodar um comando do [Hardhat](https://hardhat.org/) para que gerar a estrutura básica pro nosso projeto, no terminal digite:  
`npx hardhat init`  
Você irá se deparar com essa tela:  
```shell
$ npx hardhat init
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.22.6 👷‍

? What do you want to do? …
❯ Create a JavaScript project
  Create a TypeScript project
  Create a TypeScript project (with Viem)
  Create an empty hardhat.config.js
  Quit
```  
Selecione a primeira opção `> Create a JavaScript project`, usaremos `JavaScript` neste tutorial, mas nada impede que faça com `TypeScript` também.<br/><br/>

Você verá essas mensagens no terminal:  
```shell
√ What do you want to do? · Create a JavaScript project  
? Hardhat project root: » C:\projetos\api-ethereum-wallet
```  
Confirme    

Agora de um enter e irá se deparar com uma mensagem como:  
`Create .gitignore` que por padrão vem `y`, tecle `n`, pois o mesmo conteúdo desse `.gitignore` que poderia ser gerado, já é adicionado ao `.gitignore` existente ao instalarmos o [Hardhat](https://hardhat.org/) com `npm`.<br/><br/>

Agora você deve ter uma estrutura parecida com:  
```go
- api-ethereum-wallet (ou seu diretório raiz)
  - contracts/
  - ignition/
  - node_modules/
  - test/
  - hardhat.config.js 
  ... arquivos padrão do nodejs
```
Para ter uma ideia rápida do que está disponível e do que está acontecendo execute `npx hardhat`, o único problema até agora é que devemos rodar esse comando do módulo do [hardhat](https://hardhat.org/) em `node_modules/hardhat`, você pode entrar nesse caminho e testar, mas já trago a solução pro nosso comando não ficar tão extensos e termos que trabalhar de dentro de uma pasta `node_modules` diretamente, pra isso faça:  
 - Vá até o arquivo `package.json`, lá, caso não tenha adicionado outras configurações, o arquivo estará assim:  
 ```json
 {
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^5.0.0",
    "hardhat": "^2.22.6"
  },
 }
 ```
 - Vamos fazer um alteração, adicionando a seção `scripts` para criar uma script que rode o `npx hardhat` direto de `node_modules/hardhat`:
 ```json
 {
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^5.0.0",
    "hardhat": "^2.22.6"
  },
   "scripts": {
    "hardhat": "cd node_modules/hardhat && npx hardhat"
  }
}
 ```  
Agora basta rodar `npm run hardhat`, e o comando `npx hardhat` será executado de dentro de `node_modules/hardhat`, esse comando mostra tudo que está disponível via `npx hardhat`, caso tudo ocorra vem significar que nossa instalação foi um sucesso. Com isso vamos continuar.<br/>

### Compilando nossos contratos inteligentes

#### Criando contrato e eventos
Repare que na pasta `/contracts/` já existe um contrato de exemplo `Lock.sol` mas vamos criar nosso próprio `contract` para compila-lo.  
Em `/contratcs/` crie um arquivo chamado `SimpleWallet.sol` com o seguinte conteúdo:  
```solidity
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

```  
Habilitaremos o console.log do [hardhat](https://hardhat.org/) depois, por enquanto deixe os `console.sol e .log` comentados <br/><br/>

Pronto temos um contrato em mãos, agora basta compilarmos ele.<br/><br/>

#### Compilando seu contrato
Antes de rodarmos o comando no terminal, vamos criar mais dois scripts no `package.json` para encurtar nosso trabalho e não precisar ir para `node_modules/hardhat` e rodar de dentro, criando dois novos `scripts`:
```json
{
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^5.0.0",
    "hardhat": "^2.22.6"
  },
   "scripts": {
    "hardhat": "cd node_modules/hardhat && npx hardhat",
    "hardhat-compile": "cd node_modules/hardhat && npx hardhat compile",
    "hardhat-compile-v": "cd node_modules/hardhat && npx hardhat compile --show-stack-traces --verbose"
  }
}
```
Criamos dois comandos `npm run hardhat-compile` para compilar o contrato e `npm run hardhat-compile-v` que é um modo verboso do compile com toda stack trace gerada.  
Aqui podemos apagar nosso contrato `Lock.sol`, pra não gerarmos arquivos desnecessários.  
Agora vamos rodar nosso comando no terminal da raiz do nosso projeto `npm run hardhat-compile`, se tudo ocorrer bem você verá dois novos diretórios sendo eles `cache/` e `artifacts/`, explore esses arquivos para saber mais.<br/><br/>

### Criando nossos testes
Primeiro vamos garantir que alguns modulos depreciados não estejam no n osso projeto, rode:  
`npm uninstall @nomiclabs/hardhat-waffle ethereum-waffle @nomiclabs/hardhat-ethers @nomiclabs/hardhat-etherscan chai@4 ethers hardhat-gas-reporter solidity-coverage @typechain/hardhat typechain @typechain/ethers-v5 @ethersproject/abi @ethersproject/providers
`<br/><br/>

Agora vamos garantir que `hardhat-toolbox` esteja instalado, rode:  
`npm install --save-dev @nomicfoundation/hardhat-toolbox`  
Agora na pasta `test/` exclua o `Lock.js` e crie o `SimpleWallet.js` arquivo com o seguinte conteúdo:  
```JavaScript
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
    // get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Load the contract SimpleWallet
    const SimpleWalletFactory = await ethers.getContractFactory("SimpleWallet");
    SimpleWallet = await SimpleWalletFactory.deploy();
    await SimpleWallet.waitForDeployment();

  });


  describe("deposit", function () {
    it("Should deposit funds", async function () {
      // Doing a deposit
      await SimpleWallet.deposit(100);

      // Check if balance of the owner address after the deposit
      const ownerBalance = await SimpleWallet.getBalance();
      expect(ownerBalance).to.equal(100, "Owner's balance should be 100 after deposit");
    });
  });

  describe("charge", function () {
    it("Should charge funds", async function () {
      const chargeAmount = ethers.parseEther("1");

      await SimpleWallet.connect(addr1).charge(chargeAmount);

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

      // Link QR code to a valid address
      await SimpleWallet.connect(owner).linkQRCodeToAddress(qrCode, validAddress);

      // Check that the QR code is linked to the correct address
      const linkedAddress = await SimpleWallet.getQRCodeAddress(qrCode);
      expect(linkedAddress).to.equal(validAddress, "QR code should be linked to the correct address");
    });
  });

  describe("getBalance", function () {
    it("Should return the correct balance", async function () {
      // Check opening balance
      const initialBalance = await SimpleWallet.getBalance();
      expect(initialBalance).to.equal(0, "Initial balance should be 0");

      // Make a deposit
      const depositAmount = ethers.parseEther("0.3"); // 0.3 ETH in wei
      await SimpleWallet.deposit(depositAmount);

      // Check balance after deposit
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
```

Pronto, os tests são auto explicativos em seus nomes, agora vamos criar dois novos `scripts` em `package.json` para rodar esses tests, em `package.json` adicione mais esses scripts:  
```json
"hardhat-node": "cd node_modules/hardhat && npx hardhat node",
"hardhat-test": "cd node_modules/hardhat && npx hardhat test"
```
Com `npm run hardhat-node` vamos criar rodar a rede local do [hardhat](https://hardhat.org/) em um terminal, em outro terminal rode `npm run hardhat-test`, aqui todos os 17 testes devem passar. Você não precisa necessariamente rodar o `node` para rodar o `test`, mas lá você pode ter noção das contas que estamos usamos e conferir se está tudo ok para rodarmos nossa aplicação na rede local do [hardhat](https://hardhat.org/).<br/><br/>

### Fazendo deploy do contrato para rede local via ignition

Agora para fazermos o deploy, primeiramente, na rede local, depois faremos em uma rede teste online via [Infura](https://www.infura.io/) para se conectar à rede testnet da [Sepolia](https://ethereum.org/en/developers/docs/networks/#sepolia), recomendada pela própria [Ethereum.org aqui](https://ethereum.org/en/developers/docs/networks/#sepolia), mas antes vamos fazer o seguinte.  
Primeiro crie um arquivo js em `/ignition/modules/` chamado `SimpleWallet.js` com o seguinte conteúdo:
```JavaScript
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleWalletModule",  (m) => {
  const simpleWallet =  m.contract("SimpleWallet", [])
  return { simpleWallet }
});
```
Agora criaremos outro `script` para rodar `npx hardhat ignition deploy ./ignition/modules/SimpleWallet.js --network localhost` no nosso `package.json`:  
```json
"hardhat-ignition-deploy": "cd node_modules/hardhat && npx hardhat ignition deploy ../../ignition/modules/SimpleWallet.js --network %npm_config_name%"
```
A única diferença nesse `script` é que ele vai receber o nome da `network` dinâmicamente com `--name=localhost` por exemplo, pra que no futuro possamos usar outra rede caso necessário, você poderia fazer o mesmo definindo outra variável caso possua mais de uma `ignition` e também devemos nos lembrar que o npx roda de dentro de `node_modules/hardhat`, portanto estamos voltando alguns repositórios para encontrar nossa `/ignition`.<br/><br/>

Pra esse caso será necessário que a rede esteja rodando em um terminal e você execute o `ignition deploy` em outro.  
Em um terminal rode : `npm run hardhat-node`  
Em outro terminal rode : `npm run hardhat-ignition-deploy --name=localhost`<br/><br/>

Se tude ocorrer bem você deve receber uma mensagem no terminal do `node` como:
```shell
eth_call
  Contract deployment: SimpleWallet
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3    
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266    

eth_sendTransaction
  Contract deployment: SimpleWallet
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3    
  Transaction:         0x106888b066befe7989423edd6d6779dce44cb1f2d0f1598acc977b10dc6460d7
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266    
  Value:               0 ETH
  Gas used:            1196395 of 1196395
  Block #1:            0x147493863adf7f7c17a1628a33dcdd99a41f7d58699d8f2e521ad907ff71b94f
```
E um aviso em vermelho `hardhat_setLedgerOutputEnabled - Method not supported` pode ser ignorado com segurança, mas não devemos alertá-lo sobre fazer algo que é totalmente esperado (uma implantação do Ignition) ([comentário](https://github.com/NomicFoundation/hardhat/issues/5406#issuecomment-2178203227)), segundo [essa própria issue](https://github.com/NomicFoundation/hardhat/issues/5406#issuecomment-2178203227) do [NomicFoundation](https://github.com/NomicFoundation) responsável pelo própio [hardhat](https://hardhat.org/).  

E no terminal do `ignition deploy` :  
`SimpleWalletModule#SimpleWallet - 0x5FbDB2315678afecb367f032d93F642f64180aa3` <br/><br/>


### Criando nossos endpoints





