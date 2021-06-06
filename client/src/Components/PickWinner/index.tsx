import React from "react";
import "./index.css";
// import { Lottery, web3 } from "../../Utils";

const EnterContest = () => {
  const handleClick = async () => {
    try {
      //   const accounts = await web3.eth.getAccounts();
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={handleClick}>Pick Winner</button>;
};

export default EnterContest;
