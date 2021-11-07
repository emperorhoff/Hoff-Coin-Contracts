// SPDX-License-Identifier: None

pragma solidity ^0.8.9;

import "./ERC20.sol";

contract HoffCoinBase is ERC20 {

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

contract HoffCoin is HoffCoinBase {
    
    string internal constant TOKEN_SYMBOL = "HOFF";
    string internal constant TOKEN_NAME = "Hoff Coin";
    uint8 internal constant TOKEN_DECIMALS = 8;
    uint256 internal constant TOTAL_SUPPLY = 1000000000000000000;
    address internal constant INITIAL_MINT_ADDRESS = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    
    constructor()
        HoffCoinBase(
            TOKEN_SYMBOL,
            TOKEN_NAME,
            TOKEN_DECIMALS,
            TOTAL_SUPPLY,
            INITIAL_MINT_ADDRESS
        )
    {}
}
