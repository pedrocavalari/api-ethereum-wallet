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
Em `/contratcs/` crie um arquivo chamado `SimpleWallet.sol`.  
Agora vamos criar os eventos que iremos usar em `SimpleWallet.sol`:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
//import "hardhat/console.sol";

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
    
    //...functions <<<<<
}
```
Criamos então duas variáveis:
 - balances uint256  
 - qrCodeToAddress string<br/>

E também 4 eventos:
 - Deposit  
 - Withdrawal  
 - Charge  
 - Sent  <br/><br/>

#### Criando funções e habilitando o console.log do hardhat

Habilitaremos o console.log do [hardhat](https://hardhat.org/) depois, por enquanto deixe os `console.sol e .log` comentados <br/><br/>

#### Funções
Agora vamos adicionar as funções ao código:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleWallet {
    mapping(address => uint256) private balances;
    mapping(string => address) private qrCodeToAddress;

   // >>>>>>>>>>>> EVENTS <<<<<<<<<<

    // Function to deposit funds
    function deposit(uint256 _amount) public {
        require(_amount > 0, "Deposit amount must be greater than zero");
        balances[msg.sender] += _amount;
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
            // If a QR code hash is provided, use it to find the recipient address
            recipient = payable(qrCodeToAddress[_qrCodeHash]);
            require(recipient != address(0), "Invalid QR code");

            emit QRCodeAddressRetrieved(_qrCodeHash, recipient);
        } else {
            // No QR code provided, send directly to the provided address
            recipient = _to;

            emit Sent(msg.sender, recipient, _amount);
        }

        require(recipient != address(0), "Recipient address must be provided");

        balances[msg.sender] -= _amount;
        // balances[recipient] += _amount;  you are updating your balance
        // recipient directly in the balances mapping. This method is
        // common when you just want to record a transaction on the contract
        // and do not need to send Ether immediately to the recipient
        //external to the contract
        // balances[recipient] += _amount;

        //The method recipient.transfer(_amount); is used to tranfer Ether
        //immediately to an address outside the contract.
        recipient.transfer(_amount);
        // console.log("Sent %s from %s to %s", _amount, msg.sender, recipient);
        emit Sent(msg.sender, recipient, _amount);
    }

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
        return balances[msg.sender];
    }
}

```
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





