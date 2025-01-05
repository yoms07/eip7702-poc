// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token2 is ERC20, Ownable {
    constructor() ERC20("Token2", "TKN02") Ownable(msg.sender) {
        // Mint an initial supply to the deployer of the contract
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    // Function to mint new tokens (only the owner can mint)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
