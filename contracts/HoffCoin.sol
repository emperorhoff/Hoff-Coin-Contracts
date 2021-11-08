// SPDX-License-Identifier: None

pragma solidity ^0.8.9;

import "./ERC20.sol";

contract HoffCoinConfig is ERC20 {

    string internal constant TOKEN_SYMBOL = "HOFF";
    string internal constant TOKEN_NAME = "Hoff Coin";
    uint8 internal constant TOKEN_DECIMALS = 8;
    uint256 internal constant TOTAL_SUPPLY = 1000000000000000000;
    address internal constant INITIAL_MINT_ADDRESS = 0x8B1382A3BeC340cA91571293616f18c476949463;

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply,
        address _mintAddress)
        ERC20(
            _name,
            _symbol,
            _decimals,
            _totalSupply,
            _mintAddress)
    {}
}

contract HoffCoin is HoffCoinConfig {

    constructor()
        HoffCoinConfig(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_DECIMALS,
            TOTAL_SUPPLY,
            INITIAL_MINT_ADDRESS
        )
    {}
}
