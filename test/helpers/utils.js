const { ethers, network } = require(`hardhat`);
const createKeccakHash = require(`keccak`);
const BigNumber = ethers.BigNumber;
const chalk = require(`chalk`);

/**
 * Transforms a string into its hexadecimal representation
 * @param {*} str 
 * @param {*} padLen 
 */
const strToHex = (
    str,
    padLen
) => {
    let hex = ``; 
    for (let i = 0; i < str.length; i++) { 
        hex = `${hex}${str.charCodeAt(i).toString(16)}`; 
    }
    if (padLen - hex.length > 0) {
        let hexLength = hex.length;
        for (let i = 0; i < padLen - hexLength; i++) { 
            hex = `0${hex}`; 
        }        
    }
    return `0x${hex}`;
}

/**
 * Transforms an hexadecimal string into its ASCII form
 * @param {*} inputStr 
 */
const hexToStr = inputStr => {
    let hex = inputStr.toString();
    if (hex.length > 2 && hex.substr(0, 2) === `0x`) {
        hex = hex.substr(2)
    }
    let str = ``;
    for (let n = 0; n < hex.length; n += 2) {
        str = `${str}${String.fromCharCode(parseInt(hex.substr(n, 2), 16))}`;
    }
    return str;
}

/**
 * Pauses execution of the current thread for (ms) milliseconds
 * @param {*} ms 
 */
const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generates a random number between 0 and num - 1
 * @param {*} num 
 */
const rand = num => {
    return Math.floor(Math.random() * num)
}

/**
 * Generates a random number between min and max inclusive
 * @param {*} min 
 * @param {*} max 
 */
const randBetween = (min, max) => {
    let x = Math.random();
    return Math.floor((max + 1) * x + min*(1 - x));
}

/**
 * Returns a randomly generated hexadecimal string
 * @param {*} len 
 */
const randHexStr = len => {
    let hex = `0123456789abcdef`;
    if (len > 1)
        return (rand(2) == 0)?(`${hex[rand(16)]}${randHexStr(len - 1)}`):(`${randHexStr(len - 1)}${hex[rand(16)]}`);
    else
        return hex[rand(16)];
}

/**
 * Creates an Array of randomly generated ethereum wallet addresses (with no private keys). For testing purposes.
 * @param {*} qty 
 */
const generateAddresses = qty => {
    return Array(qty).fill(null).map(() => randHexStr(40));
}

const generateKey = () => {
    return Array(64).fill(null).map(() => Math.floor(Math.random() * 256));
}

/**
 * Deploys a smart contract using the account and arguments provided
 * @param {*} contractName
 * @param {*} account
 * @param {*} contractArgs
 */
const deployment = async (contractName, account, contractArgs) => {
    const template = await ethers.getContractFactory(contractName);
    const instance = await template.connect(account).deploy(...contractArgs);
    await instance.deployed();
    return instance;
}

/**
 * Moves block.timestamp forward the amount of seconds provided 
 * @param {*} seconds
 */
const increaseTime = async seconds => {
    await network.provider.send(`evm_increaseTime`, [seconds]);
    await network.provider.send(`evm_mine`);
}

/**
 * Formats a wallet address as specified by EIP-55
 * https://eips.ethereum.org/EIPS/eip-55
 * @param {*} address
 */
const toChecksumAddress = address => {
    address = address.toLowerCase().replace(`0x`, ``)
    let hash = createKeccakHash(`keccak256`).update(address).digest(`hex`)
    let ret = `0x`;

    for (let i = 0; i < address.length; i++) {
        if (parseInt(hash[i], 16) >= 8) {
            ret += address[i].toUpperCase();
        } else {
            ret += address[i];
        }
    }
    return ret;
}

/**
 * Creates different sets of accounts for the different actors of the tests
 * @param {*} num
 */
const getAccounts = async num => {
    let accounts = await ethers.getSigners();
    let n = randBetween(6, (num >= accounts.length)?(accounts.length / 2):(num/2));
    return {
        len: (n-1),
        owner: accounts[0],
        stakers: accounts.slice(1, n),
        validators: Array(n).fill(null).map(() => toChecksumAddress(`0x${randHexStr(40)}`)),
        nonStakers: accounts.slice(n, 2*n-1),
        delegators: accounts.slice(2*n, accounts.length - 3),
        statsUpdater: accounts[accounts.length - 2],
        pauser: accounts[accounts.length - 1]
    }
}


/**
 * Shorten wallet address in order to display a shorter string
 * @param {*} address
 */
const shortenAddr = address => {
    return `${address.substr(0, 6)}...${address.substr(address.length-6, address.length-1)}`;
}


module.exports = {
    strToHex,
    hexToStr,
    sleep,
    rand,
    randBetween,
    randHexStr,
    generateAddresses,
    deployment,
    increaseTime,
    toChecksumAddress,
    getAccounts,
    shortenAddr,
}
