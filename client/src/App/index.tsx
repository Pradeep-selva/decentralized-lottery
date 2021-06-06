import React from "react";
import "./index.css";
import { Lottery, web3 } from "../Utils";

interface IState {
  manager: string;
  participants: Array<string>;
  balance: string;
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      manager: "",
      participants: [],
      balance: ""
    };
  }

  async componentDidMount() {
    const participants = await Lottery.methods?.getParticipants()?.call();
    const balance = await web3.eth.getBalance(Lottery.options.address);
    const manager = await Lottery.methods?.getManager()?.call();

    this.setState({ manager, participants, balance });
  }

  render() {
    const { manager, participants, balance } = this.state;
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Lottery</h1>
          {!!manager && (
            <h6>
              This contract is managed by {manager}. <br /> There are currently{" "}
              {participants.length} participants competing for a prize pool of{" "}
              {balance} ether.
            </h6>
          )}
        </header>
      </div>
    );
  }
}

export default App;
