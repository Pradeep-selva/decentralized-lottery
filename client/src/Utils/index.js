import web3 from "./web3";

const contractAddress = "0x721544b08202DdBFDf7FeC3f38cd096E36BCFbf0";

const contractABI = JSON.parse(
  `[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"enterContest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getParticipants","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"participants","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pickWinner","outputs":[],"stateMutability":"nonpayable","type":"function"}]`
);

export default new web3.eth.Contract(contractABI, contractAddress);
