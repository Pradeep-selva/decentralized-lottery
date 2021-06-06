import React, { useState } from "react";
import InfoContext from "../../App/context";
// import "./index.css";
import { Lottery } from "../../Utils";

const EnterContest = () => {
  const handleClick = async (
    user: string | undefined,
    refetch: Function | undefined
  ) => {
    try {
      await Lottery.methods?.pickWinner()?.send({ from: user });
      refetch?.();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <InfoContext.Consumer>
      {(context) =>
        context?.curUser === context?.manager ? (
          <button
            style={{ marginTop: "1rem" }}
            onClick={() => handleClick(context?.curUser, context?.refetch)}
          >
            Pick Winner
          </button>
        ) : (
          <></>
        )
      }
    </InfoContext.Consumer>
  );
};

export default EnterContest;
