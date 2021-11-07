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
const address0 = ethers.constants.AddressZero;

let hoffCoinToken;
let owner;
let address1;
let address2;
let address3;
let address4;


beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    [owner, address1, address2, address3, address4] = await ethers.getSigners();
    
    hoffCoinToken = await deployment(`HoffCoin`, owner, ["Hoff Coin", "HOFF", "8", "1000000000000000000", owner.address]);
  });

  describe("Token contract", function () {

    it("Deployment should assign the total supply of tokens to the ownerAddress", async function () {
      const ownerBalance = await hoffCoinToken.balanceOf(owner.address);
      expect(await hoffCoinToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should return total supply", async function () {
        const totalSupply = await hoffCoinToken.totalSupply();
        expect(totalSupply.toString()).to.equal("1000000000000000000");
    });

    it("Should return decimals", async function () {
        const decimals = await hoffCoinToken.decimals();
        expect(decimals.toFixed()).to.equal("8");
    });

    it("Should return token name", async function () {
        const tokenName = await hoffCoinToken.name();
        expect(tokenName).to.equal("Hoff Coin");
    });

    it("Should return token symbol", async function () {
        const symbol = await hoffCoinToken.symbol();
        expect(symbol).to.equal("HOFF");
    });
  });

  describe("Token transfers", function () {

    it("addresses should have 0 balance", async function () {
        const address1Balance = await hoffCoinToken.balanceOf(address1.address);
        const address2Balance = await hoffCoinToken.balanceOf(address2.address);
        const address3Balance = await hoffCoinToken.balanceOf(address3.address);
        const address4Balance = await hoffCoinToken.balanceOf(address4.address);
        
        expect(address1Balance).to.equal("0");
        expect(address2Balance).to.equal("0");
        expect(address3Balance).to.equal("0");
        expect(address4Balance).to.equal("0");
      });

      it("successfully transfers token to address 1", async function () {
        const address1Balance = await hoffCoinToken.balanceOf(address1.address);
        expect(address1Balance).to.equal("0");

        await expect(hoffCoinToken.transfer(address1.address, 100)).to.emit(hoffCoinToken, "Transfer").withArgs(owner.address, address1.address, 100);
        const address1BalanceAfter = await hoffCoinToken.balanceOf(address1.address);
        const ownerBalanceAfter = await hoffCoinToken.balanceOf(owner.address)
        expect(address1BalanceAfter).to.equal("100");      
        expect(ownerBalanceAfter).to.equal("999999999999999900");  
      });

      it("fails when sending too many tokens", async function () {
        const ownerBalance = await hoffCoinToken.balanceOf(owner.address)
        await expect(
            hoffCoinToken.transfer(address2.address, ownerBalance + 1)).to.be.revertedWith("ERC20:_tranfser: amount exceeds balance"
            );
        expect(await hoffCoinToken.balanceOf(owner.address)).to.equal(ownerBalance);
      });

      it("sucessfully approves address2 to spend 1000 tokens from owner", async function () {
        await expect(hoffCoinToken.approve(address2.address, 1000)).to.emit(hoffCoinToken, "Approval").withArgs(owner.address, address2.address, 1000);
        const address2Allowance = await hoffCoinToken.allowance(owner.address, address2.address);
        await expect(address2Allowance.toString()).to.equal("1000");
      });

      it("fails when trying to spend over address2's allowance", async function () {
        await expect(hoffCoinToken.approve(address2.address, 1000)).to.emit(hoffCoinToken, "Approval").withArgs(owner.address, address2.address, 1000);
        const address2Allowance = await hoffCoinToken.allowance(owner.address, address2.address);
        await expect(address2Allowance.toString()).to.equal("1000");
        await expect(
            hoffCoinToken.transferFrom(owner.address, address3.address, 2000)).to.be.revertedWith("ERC20:transferFrom: transfer amount exceeds allowance"
            );
        const address2AllowanceAfter = await hoffCoinToken.allowance(owner.address, address2.address);
        await expect(address2AllowanceAfter.toString()).to.equal("1000");
        const address3Balance = await hoffCoinToken.balanceOf(address3.address);
        await expect(address3Balance.toString()).to.equal("0");
      });

      it("fails when trying to spend over approve the zero address", async function () {
        await expect(
            hoffCoinToken.approve(address0, 1000)).to.be.revertedWith("ERC20:_approve: cannot approve to the zero address"
            );
            expect(await hoffCoinToken.allowance(owner.address, address0)).to.equal("0");        
      });

      it("fails when trying to call tranferFrom the zero address", async function () {
        const ownerBalance = await hoffCoinToken.balanceOf(owner.address);
        await expect(
            hoffCoinToken.transferFrom(address0, owner.address, 1000)).to.be.revertedWith("ERC20:_transfer: cannot transfer from the zero address"
            );
            expect(await hoffCoinToken.balanceOf(owner.address)).to.equal(ownerBalance);        
      });

      it("fails when trying to call tranferFrom with zero allowance", async function () {
        const address3Balance = await hoffCoinToken.balanceOf(address3.address);
        expect(await hoffCoinToken.allowance(owner.address, address4.address)).to.equal("0");
        await expect(
            hoffCoinToken.connect(address4).transferFrom(owner.address, address3.address, 1000)).to.be.revertedWith("ERC20:transferFrom: transfer amount exceeds allowance"
            );
        expect(await hoffCoinToken.balanceOf(address3.address)).to.equal(address3Balance);        
      });
  });

  describe("Burn function", function () {

    it("Tokens sent to the zero address should be burned", async function () {
      const ownerBalanceBefore = BigNumber.from(await hoffCoinToken.balanceOf(owner.address));
      const supplyBefore = BigNumber.from(await hoffCoinToken.totalSupply());
      await expect(hoffCoinToken.transfer(address0, 1000)).to.emit(hoffCoinToken, "Burn").withArgs(owner.address, 1000);
      const ownerBalanceAfter = BigNumber.from(await hoffCoinToken.balanceOf(owner.address));
      const supplyAfter = BigNumber.from(await hoffCoinToken.totalSupply());
      expect((ownerBalanceBefore - BigNumber.from(1000)).toString()).to.equal(ownerBalanceAfter.toString());
      expect((supplyBefore - BigNumber.from(1000)).toString()).to.equal(supplyAfter.toString());
      expect(await hoffCoinToken.balanceOf(address0)).to.equal(0);        
    });

  })