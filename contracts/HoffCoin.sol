pragma solidity ^0.8.9;

import "./ERC20.sol";

contract HoffCoin is ERC20 {

    string internal constant TOKEN_SYMBOL = "HOFF";
    string internal constant TOKEN_NAME = "Hoff Coin";
    uint8 internal constant TOKEN_DECIMALS = 8;
    uint256 internal constant TOTAL_SUPPLY = '1000000000000000000';
    address internal constant INITIAL_MINT_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

    constructor()
        ERC20(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_DECIMALS,
            TOTAL_SUPPLY,
            INITIAL_MINT_ADDRESS)
        public
    {}
}
