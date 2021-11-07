/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-etherscan");
 require("solidity-coverage");
 require("@nomiclabs/hardhat-waffle");
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
         },
         rinkeby: {
             chainId: 4,
             url: "https://eth-rinkeby.alchemyapi.io/v2/lpyqWJSI2iubqKojrorkO-ixU6EoPTHi",
             accounts: [`40512c1f3b29840c7c61065e46a78227aa9a8c5ab9ca610a91b73a41cd88f95d`, `40512c1f3b29840c7c61065e46a78227aa9a8c5ab9ca610a91b73a41cd88f94d`]
         },
         mainnet: {
             chainId: 1,
             url: "https://eth-mainnet.alchemyapi.io/v2/9EaCL_TBLgJco7-VDR_-MxMTvYhJeEQS",
             accounts: [`private_key_here`]
         }             
     },
     etherscan: {
        apiKey: "FICAAGUI1YVXRTYYVEF9ERXBFNE2KIK4D3"
     },
     solidity: {
         compilers: [
             {
                 version: `0.8.9`,
                 settings: {
                     optimizer: {
                         enabled: true,
                         runs: 0
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
 