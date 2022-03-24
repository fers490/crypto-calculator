//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Calculator {

    function add(int256 a, int256 b) public pure returns (int256) {
        return a + b;
    }

    function sub(int256 a, int256 b) public pure returns (int256) {
        return a - b;
    }

    function mul(int256 a, int256 b, uint256 decimals) public pure returns (int256) {
        return a * b / int256(10**decimals);
    }

    function div(int256 a, int256 b, uint256 decimals) public pure returns (int256) {
        require(b != 0, "Division by zero not allowed");
        int256 res1 = a*int256(10**(decimals+1))/b;
        if (res1 >= 0) {
            return (res1 + 5)/10;
        } else {
            return (res1 - 5)/10;
        }
    }

}
