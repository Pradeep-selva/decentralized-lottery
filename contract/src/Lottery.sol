// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Lottery {
    address public manager;
    address payable[] public participants;
    
    constructor() {
        manager = msg.sender;
    }
    
    function enterContest() public payable {
        participants.push(payable(msg.sender));
    }
    
    function getParticipants() public view returns (address payable[] memory) {
        return participants;
    }
    
    function pickWinner() public {
        uint randomIndex = random() % participants.length;
        
        participants[randomIndex].transfer(address(this).balance);
        participants = new address payable[](0);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.number, participants)));
    }
}