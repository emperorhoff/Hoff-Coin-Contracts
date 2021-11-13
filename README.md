# Hoffcoin ERC20 contract

This project implements the base Hoff Coin ERC20 contract. It uses hardhat, waffle and ether.js in order to manage testing and deployment.

# Hoffcoin Contract Structures

Contract inheritence graph
[Contract inheritence graph](graphs/Contract-Inheritence.png)

Contract interaction graph
[Contract interaction graph](graphs/Contract-Interactions.png)


# Prerequesites
In order to compile, test and deploy the project using hardhat, the following dependencies will need to be installed:
- node 12
- npm 8

# Initializing contracts
First, clone the git repository into a local directory, I will be cloning to ~/Hoff-Coin

Enter the directory and install the packages using npm
```shell
cd ~/Hoff-Coin
npm install
```

After installing the node packages, you should be able to utilize the hardhat commands.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
```
In order to test this contract, we only need to run the following and confirm that all 15 tests are passing and the coverage is at 100%

```shell
npx hardhat test
npx hardhat coverage
```

# Deploying contract to local development environment or rinkeby testnet

Run the following commands to deploy to a local development environment and the rinkeby testnet, respectively

```shell
npx hardhat run scripts/deploy.js
npx hardhat run scripts/deploy.js --network rinkeby
```

in order to deploy the contract on the mainnet, first edit the file hardhat.config.js to input your private key in 'accounts' space on line 26
then run the following command

```shell
npx hardhat run scripts/deploy.js --network mainnet
```

# Hoff-Coin-Contracts
