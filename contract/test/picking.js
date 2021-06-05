const assert = require("assert");

const successfullyPicked = async ({ accounts, lottery, utils }) => {
  try {
    const manager = await lottery.methods?.getManager()?.call();

    await lottery.methods
      ?.enterContest()
      ?.send({ from: accounts[1], value: utils.toWei("0.1", "ether") });

    await lottery.methods?.pickWinner()?.send({ from: manager });

    const participants = await lottery.methods?.getParticipants()?.call();
    assert(!participants.length);
  } catch (err) {
    assert(false);
  }
};

const failedDueToPerms = async ({ accounts, lottery, utils }) => {
  try {
    await lottery.methods
      ?.enterContest()
      ?.send({ from: accounts[1], value: utils.toWei("0.1", "ether") });

    await lottery.methods?.pickWinner()?.send({ from: accounts[1] });
    assert(false);
  } catch (err) {
    assert(err);
  }
};

const failedDueToNoParticipants = async ({ lottery }) => {
  try {
    const manager = await lottery.methods?.getManager()?.call();
    await lottery.methods?.pickWinner()?.send({ from: manager });

    assert(false);
  } catch (err) {
    assert(err);
  }
};

module.exports = {
  successfullyPicked,
  failedDueToPerms,
  failedDueToNoParticipants
};
