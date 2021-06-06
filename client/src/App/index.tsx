import React from "react";
import "./index.css";
import { Lottery, web3 } from "../Utils";
import { EnterContest } from "../Components";

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
    const manager = await Lottery.methods?.getManager()?.call();
    this.setState({ manager });

    this.fetchInfo();
  }

  fetchInfo = async () => {
    const participants = await Lottery.methods?.getParticipants()?.call();
    const balance = await web3.eth.getBalance(Lottery.options.address);

    this.setState({ participants, balance });
  };

  render() {
    const { manager, participants, balance } = this.state;
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Lottery</h1>
          {!!manager && (
            <div className={"info"}>
              <h5>
                This contract is managed by {manager}. <br /> There are
                currently {participants.length} participants competing for a
                prize pool of {web3.utils.fromWei(balance)} ether.
              </h5>
            </div>
          )}
          <EnterContest refetch={this.fetchInfo} />
        </header>
      </div>
    );
  }
}

export default App;
