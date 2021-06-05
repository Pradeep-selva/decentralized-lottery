const assert = require("assert"),
  ganache = require("ganache-cli"),
  Web3 = require("web3");

const { eth } = new Web3(ganache.provider());

const {
  evm: {
    bytecode: { object: ByteCode }
  },
  abi
} = require("../compile");

let accounts, lottery;

beforeEach(async () => {
  accounts = await eth.getAccounts();

  lottery = await new eth.Contract(abi)
    .deploy({ data: `0x${ByteCode}` })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery Tests", () => {
  it("Deployment", () => {
    assert.ok(lottery?.options?.address);
  });
});
