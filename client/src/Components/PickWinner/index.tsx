import React, { useContext, useState } from "react";
import InfoContext from "../../App/context";
import "./index.css";
import { Lottery } from "../../Utils";

const EnterContest = () => {
  const context = useContext(InfoContext);
  const [message, setMessage] = useState("");

  const handleClick = async (
    user: string | undefined,
    refetch: Function | undefined
  ) => {
    setMessage("Waiting for transaction confirmation...");

    try {
      await Lottery.methods?.pickWinner()?.send({ from: user });

      setMessage("Winner picked successfully!");

      refetch?.();
    } catch (err) {
      console.log(err);
      setMessage("Couldn't pick winner successfully.");
    }
  };

  return context?.curUser === context?.manager ? (
    <React.Fragment>
      <button
        className={"join-button"}
        onClick={() => handleClick(context?.curUser, context?.refetch)}
      >
        <b>Pick Winner</b>
      </button>
      <h5>{message}</h5>
    </React.Fragment>
  ) : (
    <></>
  );
};

export default EnterContest;
