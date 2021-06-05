// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Lottery {
    address public manager;
    address payable[] public participants;
    
    constructor() {
        manager = msg.sender;
    }

    function getManager() public view returns (address) {
        return manager;
    }
    
    function getParticipants() public view returns (address payable[] memory) {
        return participants;
    }

    function enterContest() public payable validParticipant {
        participants.push(payable(msg.sender));
    }
    
    
    function pickWinner() public validPerms {
        uint randomIndex = random() % participants.length;
        
        participants[randomIndex].transfer(address(this).balance);
        participants = new address payable[](0);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.number, participants)));
    }
    
    function isNewParticipant(address sender) private view returns (bool) {
            for(uint i = 0; i < participants.length; i++){
                if(sender == participants[i]) return false;
            }
            
            return true;
    }
    
    modifier validParticipant() {
        require(msg.value > 0.001 ether, "You  must send a minimum of 0.001 ether to join.");
        require(isNewParticipant(msg.sender), "You are already a participant!");
        _;
    }
    
    modifier validPerms() {
        require(msg.sender == manager, "This is an admin function!");
        require(participants.length > 0, "Cant pick winners without players entering.");
        _;
    }
}