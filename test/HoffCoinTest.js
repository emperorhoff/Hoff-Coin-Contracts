const { expect } = require(`chai`);
const { ethers } = require(`hardhat`);
const initialize = require(`./helpers/init`);
const { 
    deployment,
    getAccounts,
    randHexStr,
    increaseTime,
    randBetween
} = require(`./helpers/utils`);
const BigNumber = ethers.BigNumber;
const Wallet = ethers.Wallet;

let hoffCoinToken;
let owner;
let address1;
let address2;
let address3;
let address4;


beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, address1, address2, address3, address4] = await ethers.getSigners();
    
    hoffCoinToken = await deployment(`HoffCoin`, owner, ["Hoff Coin", "HOFF", 8, "1000000000000000000", owner.address]);
  });

describe("Token contract", function () {

    it("Deployment should assign the total supply of tokens to the owner", async function () {

      const ownerBalance = await hoffCoinToken.balanceOf(owner.address);
      expect(await hoffCoinToken.totalSupply()).to.equal(ownerBalance);
    });


    it("Should return total supply", async function () {

        const totalSupply = await hoffCoinToken.totalSupply();
        expect(totalSupply.toString()).to.equal("1000000000000000000");
    })

  });