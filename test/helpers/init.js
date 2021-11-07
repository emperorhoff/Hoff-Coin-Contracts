const { expect } = require(`chai`);
const { ethers } = require(`hardhat`);
const { 
    deployment,
    getAccounts,
    randHexStr,
    randBetween
} = require(`./utils`);

const EYR = 5000000;
const BigNumber = ethers.BigNumber;
const debugLogs = false;

const initialize = async (epochLength) => {
    let unit = Math.pow(10, 6);
    let actors;
    let powrERC20;
    let plStaking;
    let totalPowrStaked = BigNumber.from(0);
    let balancesMap = new Map();
    let minPowrDeposit = 100000;
    let maxPowrPerStake = 3000000;
    let stakeEpochsLock = 20;
    let withdrawEpochsLock = 4;
    let epochPeriod = epochLength * 24 * 3600;
    let epochRewards = Math.trunc((EYR * epochLength) / 365);
    let penaltyFactor = 1600;

    actors = await getAccounts(50);
    powrERC20 = await deployment(`PowerLedger`, actors.owner, [`0x${randHexStr(40)}`]);
    plStaking = await deployment(`PowerLedgerStakingV1`, actors.owner, [
        powrERC20.address,
        minPowrDeposit,
        maxPowrPerStake,
        stakeEpochsLock,
        withdrawEpochsLock,
        epochPeriod,
        epochRewards,
        penaltyFactor,
        actors.owner.address,
        actors.statsUpdater.address,
        actors.pauser.address
    ]);
    for (let stkr of actors.stakers) {
        let depositAmount = BigNumber.from(randBetween(minPowrDeposit + 1, Math.trunc(maxPowrPerStake / actors.len))).mul(BigNumber.from(unit));
        await powrERC20.transfer(stkr.address, depositAmount);
        let balance = await powrERC20.balanceOf(stkr.address);
        balancesMap.set(stkr.address, balance);
        totalPowrStaked = totalPowrStaked.add(balance);
        await expect(depositAmount.eq(balance)).to.be.true;
    }
    for (let nonStkr of actors.nonStakers) {
        let depositAmount = BigNumber.from(randBetween(minPowrDeposit + 1, Math.trunc(maxPowrPerStake / actors.len))).mul(BigNumber.from(unit));
        await powrERC20.transfer(nonStkr.address, depositAmount);
        let balance = await powrERC20.balanceOf(nonStkr.address);
        await expect(depositAmount.eq(balance)).to.be.true;
    }
    return {
        actors: actors,
        powrERC20: powrERC20,
        plStaking: plStaking,
        totalPowrStaked: totalPowrStaked,
        balancesMap: balancesMap,
        minPowrDeposit: minPowrDeposit,
        maxPowrPerStake: maxPowrPerStake,
        stakeEpochsLock: stakeEpochsLock,
        withdrawEpochsLock: withdrawEpochsLock,
        epochPeriod: epochPeriod,
        epochRewards: epochRewards,
        penaltyFactor: penaltyFactor,
        unit: unit,
        debugLogs: debugLogs
    }
}

module.exports = initialize;
