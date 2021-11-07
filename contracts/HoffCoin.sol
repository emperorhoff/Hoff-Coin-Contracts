// SPDX-License-Identifier: None

pragma solidity ^0.8.9;

import "./ERC20.sol";
import "./HoffCoinConfig.sol";

contract HoffCoin is HoffCoinConfig, ERC20 {



    constructor(
        string memory TOKEN_NAME,
        string memory TOKEN_SYMBOL,
        uint8 TOKEN_DECIMALS,
        uint256 TOTAL_SUPPLY,
        address INITIAL_MINT_ADDRESS)
        ERC20(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_DECIMALS,
            TOTAL_SUPPLY,
            INITIAL_MINT_ADDRESS)
    {}
}
