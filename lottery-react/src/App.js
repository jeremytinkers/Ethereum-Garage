import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: "No Manager Set",
      noPlayers: [],
      pricePool: 0,
      userValue: 0,
      enterLotteryMsg: "",
    };
  }
  //Alternatively,
  // state = {
  //   manager: "No Manager Set",
  //   noPlayers: [],
  //   pricePool: 0,
  // };

  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      enterLotteryMsg: "Processing your request to enter Lottery (Trnasaction)",
    });

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    try {
      await lottery.methods.enterLottery().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.userValue, "ether"),
      });
      this.setState({
        enterLotteryMsg:
          "You are now a successfully verified participant in the Lottery (Transaction kalas habibi)",
      });

      //update states of pricePool and noPlayers
    } catch (err) {
      console.log(err);
      this.setState({
        enterLotteryMsg:
          "Transaction to enter Lottery failed. View Console log",
      });
    }
  };

  handleChange(e) {
    this.setState({ userValue: e.target.value });
  }

  submitPickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
  };

  async componentDidMount() {
    //get the manager
    const curManager = await lottery.methods.manager().call();
    // console.log("x:" + curManager);
    const curNoPlayers = await lottery.methods.getPlayers().call();
    const curPricePool = await web3.eth.getBalance(lottery.options.address);

    this.setState({
      manager: curManager,
      noPlayers: curNoPlayers,
      pricePool: curPricePool,
    });
    // console.log("y: " + this.state.noPlayers);
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
        <h1>Price Pool : {this.state.pricePool} wei</h1>

        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.handleChange.bind(this)}
            placeholder="Enter amt of ether"
          />
          <button type="submit">Submit</button>
        </form>

        <h1>Amount you desire to send: {this.state.userValue} ether</h1>

        <hr />
        <br />
        <br />
        <h2>{this.state.enterLotteryMsg} </h2>

        <h2>Pick Winner!</h2>
        <button onClick={this.submitPickWinner}>Pick!</button>
      </div>
    );
  }
}
export default App;
