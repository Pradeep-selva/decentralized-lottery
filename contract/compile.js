const path = require("path"),
  fs = require("fs"),
  solc = require("solc");

const contractName = "Lottery";
const inboxPath = path.resolve(__dirname, "src", `${contractName}.sol`);
const content = fs.readFileSync(inboxPath, "utf-8");

const input = JSON.stringify({
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
});

const compiled = JSON.parse(solc.compile(input));

module.exports = compiled.contracts?.[`${contractName}.sol`]?.[contractName];
