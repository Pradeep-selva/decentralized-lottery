const assert = require("assert");

const successfulEntry = async ({ accounts, lottery, utils }) => {
  const participant = accounts[1];

  await lottery.methods
    ?.enterContest()
    ?.send({ from: participant, value: utils.toWei("0.1", "ether") });

  const participants = await lottery.methods?.getParticipants()?.call();

  assert.strictEqual(participants[0], participant);
};

const failedReEntry = async ({ accounts, lottery, utils }) => {
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
};

const failedInsufficient = async ({ accounts, lottery, utils }) => {
  try {
    await lottery.methods
      ?.enterContest()
      ?.send({ from: accounts[1], value: utils.toWei("0.0001", "ether") });

    assert(false);
  } catch (err) {
    assert(err);
  }
};

module.exports = {
  successfulEntry,
  failedReEntry,
  failedInsufficient
};
