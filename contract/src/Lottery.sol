// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Lottery {
    address public manager;
    address[] public participants;
    
    constructor() {
        manager = msg.sender;
    }
    
    function enterContest() public {
        participants.push(msg.sender);
    }
    
    function getPlayers() public view returns (address[] memory) {
        return participants;
    }
}