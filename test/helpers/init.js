const { expect } = require(`chai`);
const { ethers } = require(`hardhat`);
const { 
    deployment,
    getAccounts,
} = require(`./utils`);

const BigNumber = ethers.BigNumber;
const debugLogs = false;

const initialize = async () => {
    let unit = Math.pow(10, 6);
    let actors = await getAccounts(50);;
    let tokenName = "Hoff Coin";
    let tokenSymbol = "HOFF";
    let decimals = 8;
    let totalSupply = BigNumber.from(100000000000000000);
    let mintAddress = address.ownwer;

    tokenName = "Hoff Coin";
    tokenSymbol = "HOFF"
    actors = await getAccounts(50);
    hoffERC20 = await deployment(tokenName, tokenConfig, totalSupply, mintAddress);
    return {
        actors: actors,
        hoffECR20: hoffERC20,
        powrRatio: powrRatio,
        debugLogs: debugLogs
    }
}

module.exports = initialize;
