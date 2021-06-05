const assert = require("assert"),
  ganache = require("ganache-cli"),
  Web3 = require("web3");

const {
  failedReEntry,
  successfulEntry,
  failedInsufficient,
  successfullyPicked,
  failedDueToPerms,
  failedDueToNoParticipants
} = require("./index");

const { eth, utils } = new Web3(ganache.provider());

const {
  evm: {
    bytecode: { object: ByteCode }
  },
  abi
} = require("../compile");

let accounts, lottery, params;

beforeEach(async () => {
  accounts = await eth.getAccounts();

  lottery = await new eth.Contract(abi)
    .deploy({ data: `0x${ByteCode}` })
    .send({ from: accounts[0], gas: "1000000" });

  params = { accounts, lottery, utils };
});

describe("Lottery Tests", () => {
  it("Deployment and ownership", async () => {
    const manager = await lottery.methods?.getManager()?.call();
    assert(lottery?.options?.address && manager === accounts[0]);
  });

  it("Entering contest", () => successfulEntry(params));

  it("Re-entering contest", () => failedReEntry(params));

  it("Entering contest with insufficient ether", () =>
    failedInsufficient(params));

  it("Picking winner", () => successfullyPicked(params));

  it("Non-admin picking winner", () => failedDueToPerms(params));

  it("Picking winner without participants", () =>
    failedDueToNoParticipants(params));
});
