const HDWalletProvider = require("@truffle/hdwallet-provider"),
  Web3 = require("web3"),
  secrets = require("./secrets");

const {
  evm: {
    bytecode: { object: ByteCode }
  },
  abi
} = require("./compile");

const provider = new HDWalletProvider(secrets.mnemonic, secrets.infuraEndpoint);
const { eth } = new Web3(provider);

(async () => {
  const accounts = await eth.getAccounts();
  console.log("\nAttempting to deploy from -", accounts[0]);

  console.log("ABI -", JSON.stringify(abi));

  const {
    options: { address }
  } = await new eth.Contract(abi)
    .deploy({ data: `0x${ByteCode}` })
    .send({ from: accounts[0], gas: "1000000" });
  console.log("\nDeployed to -", address);
})();
