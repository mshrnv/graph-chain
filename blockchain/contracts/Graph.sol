// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Graph {

    uint public graphPrice = 2 ether;
    uint public userStartBalance = 11 ether;
    address public owner;

    address[] public users;
    mapping(string => address) public graphOwner;
    mapping(address => string[]) public access;

    constructor() {
        owner = msg.sender;
    }

    function login(address user) public returns (bool) {
        // Checks if user already has start payment
        uint usersCount = users.length;
        for (uint i = 0; i < usersCount; i++) {
            if (users[i] == user) {
                return false;
            }
        }

        // Sending start balance

        // Old method
        // bool sent = payable(user).send(userStartBalance * 1 ether);

        // New method
        (bool sent, bytes memory data) = payable(user).call{value: userStartBalance * 1 ether}("");
        require(sent, "Failed to send Ether");

        return true;
    }

    function hasAccess(address user, string memory graph) public view returns (bool) {
        // Graphs which user bought
        string[] memory userUnlockedGraphs = access[user];
        uint graphsLength = userUnlockedGraphs.length;

        // Check if needle graph unlocked
        for (uint  i = 0; i < graphsLength; i++) {
            if (keccak256(abi.encodePacked(userUnlockedGraphs[i])) == keccak256(abi.encodePacked(graph))) {
                return true;
            }
        }

        return false;
    }

    function buyAccess(string memory graph) public payable returns (bool) {
        // Checks for correct amount
        require(msg.value == graphPrice, "Incorrect");

        // Transferring ether to graph owner
        (bool sent, bytes memory data) = payable(graphOwner[graph]).call{value: msg.value}("");

        // Checks operation success
        require(sent, "Failed to send Ether");

        // Store access record
        access[msg.sender].push(graph);

        return true;
    }

    function newGraph(string memory graph) public returns (bool) {
        graphOwner[graph] = msg.sender;
        access[msg.sender].push(graph);

        return true;
    }
}
