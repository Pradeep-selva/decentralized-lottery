import React from "react";
import "./index.css";
import lottery from "../Utils";

class App extends React.Component {
  async componentDidMount() {
    const manager = await lottery.methods?.getManager()?.call();
    console.log("manager", manager);
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Lottery</h1>
        </header>
      </div>
    );
  }
}

export default App;
