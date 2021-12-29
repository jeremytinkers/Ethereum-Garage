// deploy code will go here

const { interface, bytecode } = require("./compile");
const Web3 = require("Web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const metamaskMnemonic = require("./config");

const provider =  new HDWalletProvider( metamaskMnemonic , "https://rinkeby.infura.io/v3/2791c633103f4d4e96dc95527e21303a");

const web3 = new Web3(provider);

let inbox;

const deploy = async ()=> {

    let accounts = await web3.eth.getAccounts();

     inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments: ["Constructor Initial Msg"]})
    .send({from:accounts[0] , gas:"1000000"});

    console.log("Address of deployed transaction : ", inbox.options.address); 
    provider.engine.stop();    
}

deploy();






