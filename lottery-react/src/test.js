import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  // state = {
  //   manager: "No Manager Set",
  //   noPlayers: [],
  //   pricePool: 0,
  // };

  constructor(props){
    super(props);
    this.state = {
      manager: "No Manager Set",
      noPlayers: [],
      pricePool: 0,
    }
  }
  
  async componentDidMount() {
    //get the manager
    const curManager = await lottery.methods.manager().call();
    console.log("x:" + curManager);
    const curNoPlayers = await lottery.methods.getPlayers().call();
    const curPricePool = await web3.eth.lottery.getBalance(lottery.options.address).call();

    this.setState({
      manager: curManager,
      noPlayers: curNoPlayers,
      pricePool: curPricePool,
    });
    console.log("y: " + this.state.noPlayers);
  }

  render() {
    return (
      <div className="App">
        <p>
          This Lottery is controlled and under the superior power of
          <strong>{this.state.manager}</strong>, based out of the Rinkeby
          Network
        </p>

        <h1>No of players : {this.state.noPlayers.length}</h1>
        <h1>Price Pool : {this.state.pricePool}</h1>
      </div>
    );
  }
}
export default App;
