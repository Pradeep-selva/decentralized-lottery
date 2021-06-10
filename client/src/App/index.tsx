import React from "react";
import InfoContext from "./context";
import { Lottery, web3 } from "../Utils";
import { EnterContest, PickWinner } from "../Components";
import "./index.css";

interface IState {
  manager: string;
  participants: Array<string>;
  balance: string | undefined;
  curUser: string | undefined;
}

class App extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      manager: "",
      participants: [],
      balance: "",
      curUser: ""
    };
  }

  async componentDidMount() {
    const manager = await Lottery.methods?.getManager()?.call();
    const accounts = await web3?.eth.getAccounts();

    this.setState({
      manager,
      curUser: accounts?.[0]
    });
    this.fetchInfo();
  }

  fetchInfo = async () => {
    const participants = await Lottery.methods?.getParticipants()?.call();
    const balance = await web3?.eth.getBalance(Lottery.options.address);

    this.setState({ participants, balance });
  };

  render() {
    const { manager, participants, balance = "", curUser = "" } = this.state;
    return (
      <InfoContext.Provider
        value={{ refetch: this.fetchInfo, manager, curUser }}
      >
        <div className='App'>
          <header className='App-header'>
            {!!web3 ? (
              <React.Fragment>
                <h1>Lottery</h1>
                <PickWinner />
                {!!manager && (
                  <div className={"info"}>
                    <h5>
                      This contract is managed by {manager}. <br /> There are
                      currently {participants.length} participants competing for
                      a prize pool of {web3?.utils.fromWei(balance)} ether.
                    </h5>
                  </div>
                )}
                <EnterContest />
              </React.Fragment>
            ) : (
              <h1>
                Please{" "}
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en'
                >
                  install metamask
                </a>{" "}
                to use this website:
              </h1>
            )}
          </header>
        </div>
      </InfoContext.Provider>
    );
  }
}

export default App;
