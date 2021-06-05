const assert = require("assert"),
  ganache = require("ganache-cli"),
  Web3 = require("web3");

const { eth, utils } = new Web3(ganache.provider());

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
  it("Deployment and ownership", async () => {
    const manager = await lottery.methods?.getManager()?.call();
    assert(lottery?.options?.address && manager === accounts[0]);
  });

  it("Entering contest", async () => {
    const participant = accounts[1];

    await lottery.methods
      ?.enterContest()
      ?.send({ from: participant, value: utils.toWei("0.1", "ether") });

    const participants = await lottery.methods?.getParticipants()?.call();

    assert.strictEqual(participants[0], participant);
  });

  it("Re-entering contest", async () => {
    try {
      let numRepeat = 2;

      while (numRepeat--) {
        await lottery.methods
          ?.enterContest()
          ?.send({ from: accounts[1], value: utils.toWei("0.1", "ether") });
      }
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
});
