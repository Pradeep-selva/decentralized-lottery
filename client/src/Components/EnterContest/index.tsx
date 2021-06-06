import React, { useState } from "react";
import "./index.css";
import { Lottery, web3 } from "../../Utils";
import { IProps } from "../types";

const EnterContest = ({ refetch }: IProps) => {
  const [ether, setEther] = useState("0");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Waiting for transaction confirmation...");

    try {
      const accounts = await web3.eth.getAccounts();
      await Lottery.methods
        ?.enterContest()
        ?.send({ from: accounts[0], value: web3.utils.toWei(ether, "ether") });

      setMessage("Joined successfully!");

      refetch();
    } catch (err) {
      console.log(err);
      setMessage("Could not join successfully.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>
        <u>Test your luck</u>
      </h4>
      <div className={"form-control"}>
        <label style={{ fontSize: "1.5rem" }}>
          <b>Ether (min: 0.001)</b>
        </label>
        <input
          className={"input"}
          type={"number"}
          step={0.001}
          value={ether}
          style={{ marginTop: 10 }}
          onChange={({ target: { value } }) => setEther(value)}
        />
      </div>
      <button type={"submit"} className={"submit"}>
        <b>Join</b>
      </button>
      <h5>{message}</h5>
    </form>
  );
};

export default EnterContest;
