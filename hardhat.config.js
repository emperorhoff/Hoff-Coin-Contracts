/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 require(`@nomiclabs/hardhat-waffle`);
 require(`hardhat-gas-reporter`);
 
 // https://hardhat.org/config/
 module.exports = {
     defaultNetwork: `hardhat`,
     networks: {
         hardhat: {
             chainId: 33,
             allowUnlimitedContractSize: false,
             accounts: {
                 count: 250
             }
         }
     },
     solidity: {
         compilers: [
             {
                 version: `0.8.9`,
                 settings: {
                     optimizer: {
                         enabled: true,
                         runs: 800
                     },
                     metadata: {
                         // do not include the metadata hash, since this is machine dependent
                         // and we want all generated code to be deterministic
                         // https://docs.soliditylang.org/en/v0.7.6/metadata.html
                         bytecodeHash: `none`,
                     }
                 }
             }
         ]
     },
     paths: {
         sources: `./contracts`,
         tests: `./test`,
         cache: `./cache`,
         artifacts: `./artifacts`
     },
     mocha: {
         timeout: 20000
     },
     gasReporter: {
         currency: `USD`,
         gasPrice: 150,
         coinmarketcap: ``,
         showTimeSpent: true,
         showMethodSig: true
     }
 };
 